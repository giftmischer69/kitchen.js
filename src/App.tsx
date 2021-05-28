import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import icon from '../assets/icon.svg';
import './App.global.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { styled } from '@material-ui/styles';

const config = require('config');

interface VstPlugin {
  name: string;
  dll_path: string;
  fxp_path: string;
  is_32bit: boolean;
}

class Generator implements VstPlugin {
  name: string;

  dll_path: string;

  fxp_path: string;

  is_32bit: boolean;

  constructor(
    name: string,
    dll_path: string,
    fxp_path: string,
    is_32bit: boolean
  ) {
    this.name = name;
    this.dll_path = dll_path;
    this.fxp_path = fxp_path;
    this.is_32bit = is_32bit;
  }
}

class Effect implements VstPlugin {
  name: string;

  dll_path: string;

  fxp_path: string;

  is_32bit: boolean;

  constructor(
    name: string,
    dll_path: string,
    fxp_path: string,
    is_32bit: boolean
  ) {
    this.name = name;
    this.dll_path = dll_path;
    this.fxp_path = fxp_path;
    this.is_32bit = is_32bit;
  }
}

class Channel {
  volume: number;

  effects: Effect[];

  constructor(volume: number, effects: Effect[]) {
    this.volume = volume;
    this.effects = effects;
  }
}

class Pattern {
  name: string;

  bar_length: number;

  plugin: Generator;

  midi_path: string;

  channel: Channel;

  instanced_at: number[];

  constructor(
    name: string,
    bar_length: number,
    plugin: Generator,
    midi_path: string
  ) {
    this.name = name;
    this.bar_length = bar_length;
    this.plugin = plugin;
    this.midi_path = midi_path;
    this.channel = new Channel(0.7, []);
    this.instanced_at = [0];
  }
}

class Project {
  name: string;

  bpm: number;

  patterns: Pattern[];

  constructor(name: string, bpm: number) {
    this.name = name;
    this.bpm = bpm;
    this.patterns = [
      new Pattern(
        'default',
        4,
        new Generator(
          'placeholder',
          '../plugins/generators/PLACEHOLDER.dll',
          '../plugins/generators/PLACEHOLDER.fxp',
          true
        ),
        '../data/midi/PLACEHOLDER.mid'
      ),
      new Pattern(
        'default2',
        4,
        new Generator(
          'placeholder2',
          '../plugins/generators/PLACEHOLDER.dll',
          '../plugins/generators/PLACEHOLDER.fxp',
          true
        ),
        '../data/midi/PLACEHOLDER.mid'
      ),
    ];
  }
}

// TODO: Memento class with decorateurs

// debug: boolean

class Daw {
  // https://www.npmjs.com/package/tone
  // https://www.npmjs.com/package/sox-stream
  // https://levelup.gitconnected.com/making-a-file-path-mapper-with-typescript-7b10ad4ff0c8
  plugins: VstPlugin[];

  project: Project;

  cfg: any;

  constructor() {
    this.cfg = config.get('Daw');
    this.plugins = [];
    this.project = new Project('default', 90);
  }
}

const PatternViewWindow = (project: Project) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selected, setSelected] = useState(0);

  const handleCloseAndChangeIndex = (choice: number) => {
    handleClose();
    setSelected(choice);
  };

  return (
    <div className="PatternView">
      <div className="PatternSelector">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {project.patterns[selected].name}
        </Button>
        <Menu
          color="primary"
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {project.patterns.map((pattern, index) => {
            return (
              <MenuItem
                key={pattern.name}
                onClick={() => handleCloseAndChangeIndex(index)}
              >
                {pattern.name}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
      <div className="PatternView">
        TODO name: string; bar_length: number; plugin: Generator; midi_path:
        string; channel: Channel; instanced_at: number[];
      </div>
    </div>
  );
};

const StyledPatternView = styled(PatternViewWindow)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

const Kitchen = () => {
  const daw = new Daw();

  return (
    <div className="Kitchen">
      <StyledPatternView
        name={daw.project.name}
        bpm={daw.project.bpm}
        patterns={daw.project.patterns}
      />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Kitchen} />
      </Switch>
    </Router>
  );
}
