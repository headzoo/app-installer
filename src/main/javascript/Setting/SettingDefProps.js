import {SettingDefPropsValidator} from './SettingDefPropsValidator';
import {SettingDefPropsChoice} from './SettingDefPropsChoice';

export class SettingDefProps
{
  /**
   * @param {String} type
   * @param {String} name
   * @param {String} title
   * @param {String|Boolean} defaultValue
   * @param {Boolean} required
   * @param {{}|null} validator
   * @param {Boolean} serverOnly
   * @param {Boolean|null} multi
   * @param {Array.<{}>|null} choices
   */
  constructor({
    type,
    name,
    title,

    defaultValue,
    required,
    validator,
    serverOnly,
    multi,
    choices
  })
  {
    this.state = {
      type,
      defaultValue,
      required,
      validator,
      serverOnly,
      multi,
      choices
    };
  }

  /**
   * @return {String}
   */
  get type()
  {
    return this.state.type;
  }

  /**
   * @return {String}
   */
  get name()
  {
    return this.state.name;
  }

  /**
   * @return {String}
   */
  get title()
  {
    return this.state.title;
  }

  /**
   * @return {String|Boolean}
   */
  get defaultValue()
  {
    return this.state.defaultValue;
  }

  /**
   * @return {Boolean}
   */
  get required()
  {
    return this.state.required;
  }

  /**
   * @return {SettingDefPropsValidator|null}
   */
  get validator()
  {
    if (this.state.validator) {
      const props = JSON.parse(JSON.stringify(this.state.validator));
      return new SettingDefPropsValidator(props);
    }

    return null;
  }

  /**
   * type {boolean}
   */
  get serverOnly()
  {
    return !!this.state.serverOnly;
  }

  /**
   * @return {Boolean|null}
   */
  get multi()
  {
    if (this.state.multi === true || this.state.multi === false) {
      return this.state.multi;
    }

    return null;
  }

  /**
   * @return {Array.<SettingDefPropsChoice>}
   */
  get choices()
  {
    if (this.state.choices instanceof Array) {
      return this.state.choices.map(choice => new SettingDefPropsChoice({... choice}));
    }
  }
}