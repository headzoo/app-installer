import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import {UniformsSettingsForm} from './Uniforms';
import {ScreenInstall} from './UI';
import {AppInstallerService} from './AppInstallerService.js';

export class AppInstallerApp extends React.Component
{
  static propTypes = {
    dpapp: PropTypes.object.isRequired,
    installer: PropTypes.func.isRequired
  };

  constructor(props)  {
    super(props);
    this.initState();
  }

  componentDidMount()
  {
    this.loadManifest()
      .then(manifest => ({ error:null, manifest, screen: 'settings' }))
      .catch(response => ({ error: 'error' })) // eslint-disable-line no-unused-expressions, no-unused-vars
      .then(state => this.setState(state))
    ;
  }

  // shouldComponentUpdate() { return false; }

  initState()  {
    this.state = {
      manifest:  null,
      error:     null,
      screen:    'loading',
      installProgress: 0,
    };
  }

  /**
   * @return {Promise.<{}>}
   */
  loadManifest()
  {
    const { dpapp } = this.props;
    const { entityId: appId, type: contextType } = dpapp.context;

    if (contextType === 'app' && dpapp.context.hasProperty('manifest')) {
      const manifest = dpapp.context.getProperty('manifest');
      return  Promise.resolve(manifest);
    }

    if (contextType === 'app' && appId) {
      return dpapp.restApi.get(`apps/${appId}/manifest`).then(({ body }) => body);
    }

    return Promise.reject(null);
  }

  /**
   * @param {{}}settings
   * @return {Promise.<*>}
   */
  installApp(settings)
  {
    const { entityId: appId } = this.props.dpapp.context;
    const { restApi } = this.props.dpapp;

    const { manifest } = this.state;

    this.setState({ screen: 'install', installProgress: 0 });

    const service = new AppInstallerService();
    return service.saveSettings(restApi, appId, settings)
      .then(() => {
        this.setState({ screen: 'install', installProgress: 33 });
        return service.createCustomFields(restApi, appId, manifest)
      })
      .then(() => {
        this.setState({ screen: 'install', installProgress: 66 });
        return service.setInstalled(restApi, appId, { status: true})
      })
      .then(() => {
        this.setState({ screen: 'install', installProgress: 100 });
      })
    ;
  }

  render()
  {
    const { screen } = this.state;

    if (screen === 'error') {
      return (<div><p>The app installer encountered an error</p></div>);
    }

    if (screen === 'settings') {
      const { installer:Installer } = this.props;
      const { manifest } = this.state;
      const settings = JSON.parse(JSON.stringify(manifest.settings));

      return (<Installer install={this.installApp.bind(this)} settings={settings} settingsForm={UniformsSettingsForm}/>);
    }

    if (screen === 'install') {
      const {installProgress} = this.state;
      return <ScreenInstall progress={installProgress}/>
    }

    if (screen === 'loading') {
      return (<p>Loading...</p>)
    }

    return null;
  }
}
