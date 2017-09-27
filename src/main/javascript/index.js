import ReactDOM from 'react-dom';
import {AppInstallerApp} from './AppInstallerApp';
import {ScreenSettingsDefault} from './UI';

export function runAppWithDefaultInstaller(dpapp) {
  ReactDOM.render(
    <AppInstallerApp dpapp={dpapp} installer={ScreenSettingsDefault}/>,
    document.getElementById('deskpro-app')
  );
}

export function runAppWithInstaller(dpapp, installer) {
  ReactDOM.render(
    <AppInstallerApp dpapp={dpapp} installer={installer}/>,
    document.getElementById('deskpro-app')
  );
}

export function runApp(dpapp) {
  runAppWithDefaultInstaller(dpapp);
}
