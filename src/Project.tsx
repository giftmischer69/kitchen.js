import Pattern from './Pattern';
import Generator from './Generator';

export default class Project {
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
