import ReactDOM from 'react-dom';
import {App} from './App';
import {ScreenSettingsDefault} from './Components';

export function runAppWithDefaultInstaller(dpapp) {
  ReactDOM.render(
    <App dpapp={dpapp} installer={ScreenSettingsDefault}/>,
    document.getElementById('deskpro-app')
  );
}

export function runAppWithInstaller(dpapp, installer) {
  ReactDOM.render(
    <App dpapp={dpapp}  installer={installer}/>,
    document.getElementById('deskpro-app')
  );
}

export function runApp(dpapp) {
  runAppWithDefaultInstaller(dpapp);
}
