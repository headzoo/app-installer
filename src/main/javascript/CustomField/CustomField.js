export class CustomField
{
  /**
   * @param {String} type
   * @param {boolean} enabled
   * @param {String} alias
   * @param {String} attachedTo
   * @param [rest]
   */
  constructor({type, enabled, alias, attachedTo, ...rest})
  {
    this.props = {type, enabled, alias, attachedTo, ...rest};
  }

  /**
   * @type {String}
   */
  get type() { return this.props.type; }

  /**
   * @type {String}
   */
  get attachedTo() { return this.props.attachedTo; }

  /**
   * @type {Boolean}
   */
  get enabled() { return this.props.enabled; }

  /**
   * @type {String}
   */
  get alias() { return this.props.alias; }

  /**
   * @return {}
   */
  toJSON() { return JSON.parse(JSON.stringify(this.props)); }

  /**
   * @type {string}
   */
  getHandlerClass() {
    return `Application\\DeskPRO\\CustomFields\\Handler\\${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`
  }

  getQualifiedAlias(appId) { return `app:${appId}:${this.alias}`; }
}