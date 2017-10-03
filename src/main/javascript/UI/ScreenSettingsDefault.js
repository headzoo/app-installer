import React from 'react';
import PropTypes from 'prop-types';

export class ScreenSettingsDefault extends React.Component
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
        <div className={'settings'}>
          <SettingsForm settings={settings} ref={ref => formRef = ref} onSubmit={this.onSettings.bind(this)} />
          <button className={'btn-install'} onClick={() => formRef.submit()}>Install App</button>
        </div>
      );
    }

    return (
      <div className={'no-settings'}>
        <p>Click the Install button below to begin the installation.</p>
        <button className={'btn-install'} onClick={install.bind(null, [])}>Install App</button>
      </div>
    );
  }
}