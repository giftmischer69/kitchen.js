import VstPlugin from './VstPlugin';
import Project from './Project';

const config = require('config');

export default class Daw {
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
