export class SettingDefPropsValidator
{
  /**
   * @param {String} type
   * @param {String} pattern
   */
  construct({ type, pattern })
  {
    this.state = { type, pattern };
  }

  /**
   * @type {String}
   */
  get type() { return this.state.type; }

  /**
   * @type {String}
   */
  get pattern() { return this.state.pattern; }
}