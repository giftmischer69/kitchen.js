import Generator from './Generator';
import Channel from './Channel';

export default class Pattern {
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
