import atexit
import tempfile

import sox  # type: ignore
import yaml
from typing import List, Tuple

import logging
import os
import pathlib
from pathlib import Path
import random
import shutil
import string
import subprocess

from omegaconf import DictConfig

from melodia.core import Track  # type: ignore
from melodia.music import chord  # type: ignore
from melodia.io import midi  # type: ignore

"""
# daw.py - core functionality of dawpy
"""


# genos.se - shaping the future
#            empowering artists
#            contributing to society
#            - for fun -


class TempFileManager:
    def __init__(self):
        current_dir = os.getcwd()
        rand_str = "".join(random.choice(string.ascii_lowercase) for i in range(8))
        self.temp_folder = os.path.join(current_dir, ".temp_" + rand_str)
        if not os.path.exists(self.temp_folder):
            os.mkdir(self.temp_folder)
        atexit.register(self.clean_up)

    def get_temp_file(self, file_name):
        rand_str = "".join(random.choice(string.ascii_lowercase) for i in range(8))
        temp_file_path = os.path.join(
            self.temp_folder, file_name + "_" + rand_str + ".wav"
        )
        logging.debug(f"returning temp file name: {temp_file_path}")
        return temp_file_path

    def clean_up(self):
        logging.debug(f"removing: {self.temp_folder}")
        shutil.rmtree(self.temp_folder)


class VstPlugin:
    def __init__(
        self, name: str, dll: Path, is_32bit: bool, is_effect: bool, selected_fxp: Path
    ):
        self.name = name
        self.dll = dll
        self.is_32bit = is_32bit
        self.is_effect = is_effect
        self.selected_fxp = selected_fxp


class Channel:
    def __init__(self, volume: float = 0.7):
        self.volume: float = volume
        self.effects: List[VstPlugin] = []


class Pattern:
    def __init__(
        self,
        name: str = "default",
        bar_length: int = 4,
        plugin: VstPlugin = None,
        midi_file: Path = None,
    ):
        self.name = name
        self.generator_plugin = plugin
        self.midi_file = midi_file
        self.channel = Channel()
        self.bar_length: int = bar_length
        self.instanced_at: List[int] = []
        if name == "default":
            self.instanced_at.append(0)


class Project:
    def __init__(self, name: str = "default", bpm: float = 90):
        self.name: str = name
        self.bpm: float = bpm
        self.patterns: List[Pattern] = [Pattern()]


class Memento:
    # TODO
    # cache last 5 steps in memory and last 20 in a directory
    def __init__(self):
        self.states = []

    def undoable(self, func):
        def wrapper(*args, **kwargs):
            print(func)
            print(args)
            print(kwargs)
            func(*args, **kwargs)

        return wrapper


class Daw:
    daw_dir = pathlib.Path(__file__).parent.absolute()
    memento = Memento()

    def __init__(self, cfg: DictConfig):
        self.debug = cfg["debug"]
        self.plugins: List[VstPlugin] = []
        self.project: Project = Project()
        self.selected_pattern: Pattern = self.project.patterns[0]
        self.cfg = cfg

    def run_checked(self, command):
        logging.debug(f"running: {command} | debug: {self.debug}")
        if self.debug:
            proc = subprocess.run(
                command, stdout=subprocess.STDOUT, stderr=subprocess.STDOUT
            )
        else:
            proc = subprocess.run(
                command, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
            )
        return_code = proc.returncode
        logging.debug(f"return_code: {return_code}")
        if return_code != 0:
            raise Exception

    @memento.undoable
    def create_pattern(
        self, name: str, bar_length: int, plugin: VstPlugin, midi_file: Path
    ):
        # choose/configure instrument, choose/configure midi for pattern
        # render patterns, render together
        pattern = Pattern(name, bar_length, plugin, midi_file)
        self.project.patterns.append(pattern)

    @memento.undoable
    def delete_pattern(self, pattern: Pattern):
        self.project.patterns.remove(pattern)

    @memento.undoable
    def add_pattern_at(self, pattern: Pattern, bar_offset: int):
        pattern.instanced_at.append(bar_offset)

    def save_project(self):
        Path("./data/projects/").mkdir(parents=True, exist_ok=True)
        path = Path(f"./data/projects/{self.project.name}.yaml").absolute()
        with open(path, "w") as p:
            yaml.dump(self.project, p, Dumper=yaml.Dumper)
            logging.info(f"SAVED: {path}")

    @memento.undoable
    def load_project(self, project_name):
        path = Path(f"./data/projects/{project_name}.yaml").absolute()
        with open(path, "r") as p:
            self.project = yaml.load(p, Loader=yaml.Loader)

    def configure_plugin(self, plugin) -> None:
        if plugin.is_32bit:
            self.run_checked(
                f"\"{self.cfg['nano_host_32_exe_path']}\" \"{plugin.dll}\""
            )
        else:
            self.run_checked(
                f"\"{self.cfg['nano_host_64_exe_path']}\" \"{plugin.dll}\""
            )

    def render(self, out_file):
        # TODO

        rendered_arrays = []
        rendered_files = []
        for offset, pattern in self.project.playlist:
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp:
                out = Path(temp.name).absolute()
                if pattern.plugin.is_32bit:
                    command = f'"{self.mrs_watson_32}"'
                else:
                    command = f'"{self.mrs_watson_64}"'

                command += f' --midi-file "{pattern.midi_file.absolute()}" --output "{out}" --plugin "{pattern.plugin.dll.absolute()}","{pattern.plugin.fxp.absolute()}"'
                print("running command: " + command)
                self.run_checked(command)
                tfm = sox.Transformer()
                # 60,000 (ms) ÷ BPM = duration of a quarter note
                offset_ms = (60000 / self.project.bpm) * offset
                tfm.pad(start_duration=offset_ms)

                arr = tfm.build_array(out.__str__())
                print(f"result: {len(arr)}")
                rendered_arrays.append(arr)

        logging.warning(len(rendered_arrays))
        logging.warning(len(rendered_files))

        tfm = sox.Transformer()
        for a in rendered_arrays:
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp:
                path = Path(temp.name).absolute()
                logging.warning(path)
                tfm.build(None, path.__str__(), a, sample_rate_in=44100)
                rendered_files.append(path.__str__())

        cbn = sox.Combiner()
        cbn.build(rendered_files, out_file, "mix")

    def register_plugin(self, plugin: VstPlugin):
        self.plugins.append(plugin)


class ChordMidiProducer:
    def produce_midi(self):
        track = Track(signature=(4, 4))

        track.add(chord.maj("C3", (1, 1)))
        track.add(chord.maj("D3", (1, 1)))
        track.add(chord.min("A3", (1, 1)))
        track.add(chord.maj7("G3", (1, 1)))
        Path("./data/temp/").mkdir(parents=True, exist_ok=True)
        path = Path("./data/temp/chords.mid").absolute()
        with open(path, "wb") as f:
            midi.dump(track, f)
        return path


class MidiPattern:
    """## MidiPattern
    a MidiPattern can render a bar from a
    - midi file & plugin
    """

    def __init__(self, name: str, bpm: int, midi_file: Path, plugin: VstPlugin):
        self.name = name
        self.bpm = bpm
        self.midi_file = midi_file  # TODO dynamically create midi file with tempo
        self.plugin = plugin
