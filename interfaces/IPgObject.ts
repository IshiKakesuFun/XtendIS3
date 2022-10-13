export default class IPgObject {
  static catalog: string;
  static schema: string;
  static objectName: string;
  static objectFullName: string;
  static objectFullNamePrefix?: string;
  static dropStatement: string;
  static createStatement: string;
}
