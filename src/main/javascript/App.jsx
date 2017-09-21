import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import {SettingsForm} from './Components';

const readApplicationID = ({ data: { data: { application_id: appID } } }) => appID;

export class App extends React.Component
{
  static propTypes = {
    dpapp: PropTypes.object.isRequired,
    installer: PropTypes.func.isRequired,
    appName: PropTypes.string
  };

  constructor(props)  {
    super(props);
    this.initState();
  }

  componentDidMount()
  {
    const { appName, dpapp } = this.props;

    let appID = null;

    dpapp.restApi.get(`apps/${appName}`)
      .then((response) => {
        appID = readApplicationID(response);
        return dpapp.restApi.get(`DP_API/apps/${app}/manifest`);
      })
      .then(({ data: manifest }) => {
        const error = null;
        const screen = error ? 'error' : 'normal';

        this.setState({ error, manifest, screen, appID });
      })
      .catch((response) => { // eslint-disable-line no-unused-expressions, no-unused-vars
        const state = { error: 'error' };
        this.setState(state);
      })
    ;
  }

  shouldComponentUpdate() { return false; }

  initState()  {
    this.state = {
      appID:          1,
      manifest:       null,
      error:         null,
      screen:        'loading'
    };
  }

  installApp(settings)
  {
    return Promise.resolve(settings);
  }

  render()
  {
    const { screen } = this.state;

    if (screen === 'error') {
      return (
        <div>
          <p>The app installer encountered an error</p>
        </div>
      );
    }

    if (screen === 'normal') {
      const { installer:Installer, manifest } = this.props;

      return (
        <Installer
          install={this.installApp.bind(this)}
          settings={manifest.settings}
          settingsForm={SettingsForm}
        />
      );
    }

  }
}
