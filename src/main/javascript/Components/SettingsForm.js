import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import {UniformsSettingsTransformer} from '../Uniforms'

export class SettingsForm extends React.Component
{
  static propTypes = {
    settings: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props)  {
    super(props);
    this.formRef = null;
  }

  shouldComponentUpdate(nextProps, nextState)
  {
    return false;
  }

  submit()
  {
    this.formRef.submit();
  }

  render()
  {
    const { settings, onSubmit } = this.props;
    const schema = UniformsSettingsTransformer.defsToSchema(settings);

    return (<AutoForm ref={ref => this.formRef = ref} schema={schema} onSubmit={onSubmit} />);
  }
}