export class CustomField
{
  /**
   * @param {String} type
   * @param {String} alias
   * @param {String} attachedTo
   * @param {String} title
   * @param [rest]
   */
  constructor({type, alias, attachedTo, title, ...rest})
  {
    this.props = {type, alias, attachedTo, title, ...rest};
  }

  /**
   * @type {String}
   */
  get type() { return this.props.type; }

  /**
   * @type {String}
   */
  get title() { return this.props.title; }

  /**
   * @type {String}
   */
  get attachedTo() { return this.props.attachedTo; }

  /**
   * @type {String}
   */
  get alias() { return this.props.alias; }

  /**
   * @return {{}}
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