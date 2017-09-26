export class SettingDefPropsChoice
{
  /**
   * @param {String} title
   * @param {String} value
   */
  construct({ title, value })
  {
    this.state = { title, value };
  }

  /**
   * @type {String}
   */
  get title() { return this.state.title; }

  /**
   * @type {String}
   */
  get value() { return this.state.value; }
}