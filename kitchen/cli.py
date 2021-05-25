# NOTE: Maybe implement some commands like render project file too
import logging
import os
import sys

import hydra
from omegaconf import DictConfig, OmegaConf

from kitchen.daw import Daw
from kitchen.gui import Gui
from kitchen.shell import Shell


def usage():
    logging.warning(f"Usage: {sys.argv[0]} [input file(.mp3/.wav)/folder]")


@hydra.main(config_name="..\\config")
def run_kitchen(cfg: DictConfig) -> None:
    if cfg["debug"]:
        logging.basicConfig(level=logging.DEBUG)

    mode = cfg["mode"]

    d = Daw(cfg)

    if mode is None or str(mode).strip() is None:
        mode = "gui"

    if "gui" == mode:
        g = Gui(d, cfg)
        g.run()
    elif "shell" == mode:
        s = Shell(d, cfg)
        s.cmdloop()
    else:
        usage()


if __name__ == "__main__":
    run_kitchen()
