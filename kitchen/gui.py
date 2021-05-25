from omegaconf import DictConfig
from kitchen.eel_CRA import *
from kitchen.daw import Daw


class Gui:
    def __init__(self, daw: Daw, cfg: DictConfig):
        self.daw = daw
        self.cfg = cfg

        width = cfg["gui"]["width"]
        height = cfg["gui"]["height"]
        self.width = width if width is not None else 1080
        self.height = height if height is not None else 720

    def run(self):
        main(self.cfg["debug"])
