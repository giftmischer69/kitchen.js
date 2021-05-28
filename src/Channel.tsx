import Effect from './Effect';

export default class Channel {
  volume: number;

  effects: Effect[];

  constructor(volume: number, effects: Effect[]) {
    this.volume = volume;
    this.effects = effects;
  }
}
