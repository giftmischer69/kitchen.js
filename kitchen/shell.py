import os
from cmd import Cmd
from pathlib import Path
from tkinter import filedialog
from typing import List

from omegaconf import DictConfig
from kitchen._version import __version__
import yaml
from kitchen.daw import Daw, VstPlugin, ChordMidiProducer, Project

import logging


class View:
    @classmethod
    def print_daw(cls, daw):
        print(daw.__dict__)
        print(yaml.dump(daw.project, Dumper=yaml.Dumper))


class Shell(Cmd):
    def __init__(self, daw: Daw, cfg: DictConfig):
        super().__init__()
        self.prompt = "ktsh>"
        self.daw = daw
        self.debug = cfg["debug"]
        if self.debug:
            logging.basicConfig(level=logging.DEBUG)

    def preloop(self):
        print(f"welcome to the kitchen shell, version: {__version__}")
        self.do_help("")

    def do_help_all(self, line):
        """Prints the help entry for each available command"""
        commands = [
            x.replace("do_", "") for x in self.get_names() if x.startswith("do_")
        ]
        logging.info(f"functions: {commands}")
        for cmd in commands:
            print(f"Command: {cmd}")
            self.do_help(cmd)
            print()

    def do_q(self, line):
        """Quits the shell"""
        return True

    def do_print(self, line):
        """Prints the daw"""
        View.print_daw(self.daw)

    def dialogue_plugin(self):
        is_effect = self.ask_bool("is this an effects vst?")
        base_folder = "./plugins/generators/"
        if is_effect:
            base_folder = "./plugins/effects/"

        name = self.ask_string("enter plugin name")
        dll = self.ask_file_indexed("enter dll for plugin", base_folder, ".dll")
        dll = Path(dll).absolute()
        fxp = self.ask_file_indexed(
            "enter fxp (Preset) for plugin", base_folder, ".fxp"
        )
        fxp = Path(fxp).absolute()
        is_32bit = self.ask_bool("is this a 32bit plugin?")

        return VstPlugin(name, dll, is_32bit, is_effect, fxp)

    def do_register_plugin(self, line):
        """Register a new Plugin"""
        plugin = self.dialogue_plugin()
        self.daw.register_plugin(plugin)

    def do_configure_plugin(self, line):
        """Register a new Plugin"""
        plugin = self.dialogue_plugin()
        self.daw.configure_plugin(plugin)

    def ask_file_indexed(self, dialog: str, initial_dir, expected_suffix: str):
        if not initial_dir:
            initial_dir = os.getcwd()

        # https://stackoverflow.com/questions/954504/how-to-get-files-in-a-directory-including-all-subdirectories
        print(dialog)
        plugins = []
        for dir_path, dir_names, filenames in os.walk(initial_dir):
            for filename in [f for f in filenames if f.endswith(expected_suffix)]:
                path = Path(os.path.join(dir_path, filename)).absolute()
                plugins.append(path)

        for i, x in enumerate(plugins):
            name = x.name.replace(x.suffix, "")
            print(f"{i}:\t {name}")

        choice = self.ask_int("choose one file")
        return plugins[choice]

    def ask_indexed(self, ls: List):
        for i, x in enumerate(ls):
            print(f"{i}:\t {x}")

        choice = self.ask_int("choose one entry")
        return ls[choice]

    def ask_file(self, dialog: str, initial_dir):
        print(dialog)
        if not initial_dir:
            initial_dir = os.getcwd()
        # TODO list files with suffix starting from cwd
        return filedialog.askopenfilename(title=dialog, initialdir=initial_dir)

    def ask_folder(self, dialog: str, initial_dir=None):
        print(dialog)
        if not initial_dir:
            initial_dir = os.getcwd()
        return filedialog.askdirectory(title=dialog, initialdir=initial_dir)

    def ask_string(self, dialog: str):
        return input(f"{dialog}\n: ")

    def ask_int(self, dialog: str):
        return int(input(f"{dialog}\n: "))

    def ask_bool(self, dialog: str):
        return "y" in input(f"{dialog} (Y/n)\n: ").lower()

    def do_create(self, line):
        """create [pattern/project]"""
        print(f"line: {line}")
        if line is None or line == "" or line.strip() == "":
            line = self.ask_indexed(["pattern", "project"])

        if line == "pattern":
            name = self.ask_string("enter pattern name")
            bar_length = self.ask_int("enter length of pattern in bars")
            if self.ask_bool("create new midi file?"):
                midi_file = ChordMidiProducer().produce_midi()
            else:
                midi_file = self.ask_file_indexed("choose midi file", None, ".mid")

            if len(self.daw.plugins) == 0 or self.ask_bool("register new plugin?"):
                plugin = self.dialogue_plugin()
            else:
                plugin = self.ask_indexed(self.daw.plugins)

            self.daw.create_pattern(name, bar_length, plugin, midi_file)
        elif line == "project":
            p: Project = self.dialogue_project()
            self.daw.project = p

    def do_render(self, line):
        """render current project
        Usage: rd [out_file]
        """
        if not line or not line.strip():
            print("ERROR! Usage: rd [out_file]")
        else:
            self.daw.render(line)

    def do_save(self, line):
        """save current project"""
        self.daw.save_project()

    def do_load(self, line):
        """load project
        Usage: ld or ld [project_name]
        """
        if not line or not line.strip():
            path = self.ask_file_indexed("choose project", "./data/projects/", ".yaml")
            project_name = path.name.replace(".yaml", "")
            print(f"project_name: {project_name}")
            self.daw.load_project(project_name)
        else:
            self.daw.load_project(line)

    def do_sq(self, line):
        """save, then quit"""
        self.do_sv(line)
        self.do_q(line)

    def do_np(self, line):
        """create new project
        Usage: np or np [name_no_spaces] [bpm]"""
        if not line or not line.strip():
            project = self.dialogue_project()
        else:
            args = line.split(" ")
            if args.length == 2:
                project_name = args[0]
                project_bpm = args[1]
            else:
                project_name = args[0]
                project_bpm = self.ask_int("enter project bpm")

            project = Project(project_name, project_bpm)

        self.daw.project = project

    def do_instance(self, line):
        """instantiate pattern @ bar
        Usage: instance |or| instance [pattern] [bar]"""
        if line == "" or line.strip() == "":
            self.dialoge_instance_pattern()
            return

        args = line.split(" ")
        if len(args) == 1:
            pattern = [x for x in self.daw.project.patterns if x.name == args[0]][0]
            at = self.ask_int(f"instance pattern: {pattern.name} @ which bar?")
        else:
            pattern = [x for x in self.daw.project.patterns if x.name == args[0]][0]
            at = int(args[1])

        pattern.instanced_at.append(at)

    def dialogue_project(self) -> Project:
        name = self.ask_string("enter project name")
        bpm = self.ask_int("enter project bpm")
        return Project(name, bpm)

    def dialoge_instance_pattern(self):
        pattern = self.ask_indexed_pattern(self.daw.project.patterns)
        at = self.ask_int(f"instance pattern: {pattern.name} @ which bar?")
        pattern.instanced_at.append(at)

    def ask_indexed_pattern(self, ls):
        for i, x in enumerate(ls):
            print(f"{i}:\t {x.name}")

        choice = self.ask_int("choose one entry")
        return ls[choice]
