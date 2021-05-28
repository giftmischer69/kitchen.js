import VstPlugin from './VstPlugin';

export default class Effect implements VstPlugin {
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
