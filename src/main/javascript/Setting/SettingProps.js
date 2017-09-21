export class SettingProps
{
  constructor({
    type,
    defaultValue,
    required,
    validators,
    serverOnly,
    multi,
    choices
  })
  {
    this.state = {
      type,
      defaultValue,
      required,
      validators,
      serverOnly,
      multi,
      choices
    };
  }

  get type()
  {
    return this.state.type;
  }

  get defaultValue()
  {
    return this.state.defaultValue;
  }

  get required()
  {
    return this.state.required;
  }

  get validators()
  {
    return this.state.validators;
  }

  get serverOnly()
  {
    return this.state.serverOnly;
  }

  get multi()
  {
    return this.state.multi;
  }

  get choices()
  {
    return this.state.choices;
  }
}