export class SettingTypes
{
  static get TYPE_TEXT() { return 'text'; }

  static get TYPE_TEXTAREA() { return 'textarea'; }

  static get TYPE_CHOICE() { return'choice'; }

  static get TYPE_BOOLEAN() { return'boolean'; }

  static typeOf(obj)
  {
    const { type } = obj;
    const knownTypes = [
      SettingTypes.TYPE_TEXT,
      SettingTypes.TYPE_TEXTAREA,
      SettingTypes.TYPE_CHOICE,
      SettingTypes.TYPE_BOOLEAN
    ];

    return -1 === knownTypes.indexOf(type) ? null : type;
  }
}