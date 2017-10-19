import React from 'react';
import PropTypes from 'prop-types';

import {UniformsSettingsForm} from './Uniforms';
import {ScreenInstall, PageApp} from './UI';
import {AppInstallerService} from './AppInstallerService';
import {AppInfoService} from './AppInfoService';

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
    const { entityId: appId } = this.props.dpapp.context;
    const {restApi: api, instanceId} = this.props.dpapp;

    const appInfoService = new AppInfoService();
    appInfoService.loadManifest({api, instanceId})
      .then(manifest => {
        return appInfoService.determineAssetEndpoint({api, appId, appVersion: manifest.appVersion})
          .then(assetEndpoint => ({manifest, assetEndpoint}))
        ;
      })
      .then(state => appInfoService.determineInstallType({api, instanceId}).then(installType => ({...state, installType})))
      .then(state => ({ error:null,  screen: 'settings', ...state}))
      .catch(response => { return { error: 'error' }; })
      .then(state => this.setState(state))
    ;
  }

  initState()  {
    this.state = {
      manifest:  null,
      error:     null,
      screen:    'loading',
      installProgress: 0,
      assetEndpoint: '',
      installType: 'first-time',
    };
  }

  /**
   * @param {{}} settings
   * @return {Promise.<*>}
   */
  installApp(settings)
  {
    const { onInstallStatus } = this.props.dpapp.context.toJS();
    const { restApi } = this.props.dpapp;
    const { manifest, installType } = this.state;
    const { appId, instanceId } = this.props.dpapp;

    const onProgress = (installProgress) => this.setState({ screen: 'install', installProgress });
    onProgress(0);

    const service = new AppInstallerService({ api: restApi });
    let installPromise;

    if (installType === 'first-time') {
      installPromise =  service.firstTimeInstall({ manifest, appId, instanceId, settings, onProgress});
    } else {
      installPromise = service.update({ manifest, appId, instanceId, settings, onProgress });
    }

    installPromise.then(() => {
      this.props.dpapp.emit(onInstallStatus, { status: 'success', manifest });
    });
  }

  render()
  {
    const { screen } = this.state;

    if (screen === 'error') {
      return (<div><p>The app installer encountered an error</p></div>);
    }

    if (screen === 'settings') {
      const { installer:ScreenSettings } = this.props;
      const { manifest, assetEndpoint } = this.state;
      const settings = JSON.parse(JSON.stringify(manifest.settings));

      return (
        <PageApp icon={`${assetEndpoint}/icon.png`} description={manifest.description} title={manifest.title} version={manifest.appVersion}>
          <ScreenSettings dpapp={this.props.dpapp} install={this.installApp.bind(this)} settings={settings} settingsForm={UniformsSettingsForm}/>
        </PageApp>
      );
    }

    if (screen === 'install') {
      const {installProgress, manifest, assetEndpoint} = this.state;

      return (
        <PageApp icon={`${assetEndpoint}/icon.png`} description={manifest.description} title={manifest.title} version={manifest.appVersion}>
          <ScreenInstall progress={installProgress}/>
        </PageApp>
      );
    }

    if (screen === 'loading') {
      return (<p>Loading...</p>)
    }

    return null;
  }
}
