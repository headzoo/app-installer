import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export class DefaultInstaller extends React.Component
{
  static propTypes = {
    install: PropTypes.func.isRequired,
    settings: PropTypes.array.isRequired,
    settingsForm: PropTypes.func.isRequired
  };

  onSettings(settings)
  {
    const { install } = this.props;
    install(settings);
  }

  render()
  {
    const { settings, install, settingsForm: SettingsForm } = this.props;

    if (settings.length) {
      let formRef;
      return (
        <div>
          <SettingsForm settings={settings} ref={ref => formRef = ref} onSubmit={this.onSettings.bind(this)} />
          <button onClick={() => formRef.submit()}>Install App</button>
        </div>
      );
    }

    return (
      <div>
        <p>Click the Install button below to begin the installation.</p>
        <button onClick={install.bind(null, [])}>Install App</button>
      </div>
    );
  }
}