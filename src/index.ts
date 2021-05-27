import {Command, flags} from '@oclif/command'

const config = require('config')
const blessed = require('blessed')

interface VstPlugin {
  name: string;
  dll_path: string;
  fxp_path: string;
  is_32bit: boolean;
}

class Generator implements VstPlugin {
  name: string

  dll_path: string

  fxp_path: string

  is_32bit: boolean

  constructor(name: string, dll_path: string, fxp_path: string, is_32bit: boolean) {
    this.name = name
    this.dll_path = dll_path
    this.fxp_path = fxp_path
    this.is_32bit = is_32bit
  }
}

class Effect implements VstPlugin {
  name: string

  dll_path: string

  fxp_path: string

  is_32bit: boolean

  constructor(name: string, dll_path: string, fxp_path: string, is_32bit: boolean) {
    this.name = name
    this.dll_path = dll_path
    this.fxp_path = fxp_path
    this.is_32bit = is_32bit
  }
}

class Channel {
  volume: number

  effects: Effect[]

  constructor(volume: number, effects: Effect[]) {
    this.volume = volume
    this.effects = effects
  }
}

class Pattern {
  name: string

  bar_length: number

  plugin: Generator

  midi_path: string

  channel: Channel

  instanced_at: number[]

  constructor(name: string, bar_length: number, plugin: Generator, midi_path: string) {
    this.name = name
    this.bar_length = bar_length
    this.plugin = plugin
    this.midi_path = midi_path
    this.channel = new Channel(0.7, [])
    this.instanced_at = [0]
  }
}

class Project {
  name: string

  bpm: number

  pattern: Pattern[]

  constructor(name: string, bpm: number) {
    this.name = name
    this.bpm = bpm
    this.pattern = [
      new Pattern('default', 4,
        new Generator('placeholder', '../plugins/generators/PLACEHOLDER.dll', '../plugins/generators/PLACEHOLDER.fxp', true),
        '../data/midi/PLACEHOLDER.mid',
      ),
    ]
  }
}

// TODO: Memento class with decorateurs

// debug: boolean

class Tui {
  daw: Daw

  screen: any

  menu: any

  showFileMenuDialog(): void {
    const fileMenuDialog = blessed.listtable({
      parent: this.menu,
      width: '30%',
      data: [
        ['Animals',  'Foods',  'Times'],
        ['Elephant', 'Apple',  '1:00am'],
        ['Bird',     'Orange', '2:15pm'],
        ['T-Rex',    'Taco',   '8:45am'],
        ['Mouse',    'Cheese', '9:05am'],
      ],
      border: 'line',
    })
    fileMenuDialog.focus()
    this.screen.append(fileMenuDialog)
  }

  constructor(daw: Daw) {
    this.daw = daw
    this.screen = blessed.screen({smartCSR: true})
    this.menu = blessed.listbar({
      top: 0,
      left: 0,
      right: 0,
      height: 1,
      width: 'shrink',
      mouse: true,
      keys: true,
      autoCommandKeys: true,
      // scrollable: true,

      style: {
        item: {
          hover: {
            bg: 'blue',
          },
        },
        selected: {
          bg: 'red',
        },
      },

      commands: {
        FILE: {
          keys: ['f1'],
          callback: () => {
            this.showFileMenuDialog()
          },
        },
        EDIT: {
          keys: ['f2'],
          callback: function () {
            console.log('prev')
          },
        },
      },
    })
    this.menu.focus()
    this.screen.append(this.menu)
  }

  run(): void {
    this.screen.key(['escape', 'q', 'C-c'], () => {
      return process.exit(0)
    })

    this.screen.key(['enter', 'space'], () => {
      console.log('ENTER/SPACE')
    })

    // Render the screen.
    this.screen.render()
  }
}

class Daw {
  // https://www.npmjs.com/package/tone
  // https://www.npmjs.com/package/sox-stream
  // https://levelup.gitconnected.com/making-a-file-path-mapper-with-typescript-7b10ad4ff0c8
  plugins: VstPlugin[]

  project: Project

  cfg: any

  constructor() {
    this.cfg = config.get('Daw')
    this.plugins = []
    this.project = new Project('default', 90)
  }
}

class KitchenJs extends Command {
  static description = 'kitchen themed digital audio workstation'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name to print'}),
    // TODO: Kitchen Shell Script
    tui: flags.boolean({char: 't'}),
  }

  // static args = [{name: 'file'}]

  async run() {
    const {flags} = this.parse(KitchenJs)

    const daw = new Daw()

    if (daw.cfg.get('debug')) {
      this.log('DAW:' + JSON.stringify(daw))
    }

    // NOTE: TEMP!
    flags.tui = true

    if (flags.tui) {
      const tui = new Tui(daw)
      tui.run()
    }
  }
}

export = KitchenJs
