import ReactDOM from 'react-dom';
import App from './App';
import {DefaultInstaller} from './Components/DefaultInstaller';

export function runAppWithDefaultInstaller(dpapp, appName) {
  ReactDOM.render(
    <App dpapp={dpapp} manifest={manifest} installer={DefaultInstaller}/>,
    document.getElementById('deskpro-app')
  );
}

export function runAppWithInstaller(dpapp, appName, installer) {
  ReactDOM.render(
    <App dpapp={dpapp} manifest={manifest} installer={installer}/>,
    document.getElementById('deskpro-app')
  );
}

export function runApp(dpapp) {
  return runAppWithDefaultInstaller(dpapp, null);
}
