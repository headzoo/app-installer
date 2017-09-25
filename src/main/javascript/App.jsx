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
    let getManifest;

    if (! appName && dpapp.context.hasProperty('manifest')) {
      const manifest = dpapp.context.getProperty('manifest');
      getManifest = Promise.resolve(manifest);
    } else if (appName) {
      getManifest = dpapp.restApi.get(`apps/${appName}`)
        .then((response) => {
          const appID = readApplicationID(response);
          return dpapp.restApi.get(`DP_API/apps/${app}/manifest`);
        })
        .then(({data: manifest}) => manifest)
    } else {
      getManifest = Promise.reject(null);
    }

    getManifest
      .then(manifest => {
        const error = null;
        const screen = error ? 'error' : 'normal';
        this.setState({ error, manifest, screen });
      })
      .catch((response) => { // eslint-disable-line no-unused-expressions, no-unused-vars
        const state = { error: 'error' };
        this.setState(state);
      })
    ;
  }

  // shouldComponentUpdate() { return false; }

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
      const { installer:Installer } = this.props;
      const { manifest } = this.state;

      return (
        <Installer
          install={this.installApp.bind(this)}
          settings={manifest.settings}
          settingsForm={SettingsForm}
        />
      );
    }

    if (screen === 'loading') {
      return (<p>Loading...</p>)
    }

    return null;
  }
}
