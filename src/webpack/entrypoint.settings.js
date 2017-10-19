require('../main/sass/index.scss');

import { createApp } from '@deskproapps/deskproapps-sdk-core';
import settings from '../settings/javascript';

import { runAppWithInstaller } from '../main/javascript'
createApp(app => runAppWithInstaller(app, settings));