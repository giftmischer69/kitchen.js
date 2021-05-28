export default interface VstPlugin {
  name: string;
  dll_path: string;
  fxp_path: string;
  is_32bit: boolean;
}
