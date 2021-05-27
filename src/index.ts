import {Command, flags} from '@oclif/command'

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

class Config {
  debug: boolean

  constructor(debug: boolean) {
    this.debug = debug
  }
} // TODO
// debug: boolean

class Daw {
  plugins: VstPlugin[]

  project: Project

  cfg: Config

  constructor(cfg: Config) {
    this.cfg = cfg
    this.plugins = []
    this.project = new Project('default', 90)
  }
}

class KitchenJs extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(KitchenJs)

    const daw = new Daw(new Config(true))

    this.log('DAW:' + JSON.stringify(daw))

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from .\\src\\index.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}

export = KitchenJs
