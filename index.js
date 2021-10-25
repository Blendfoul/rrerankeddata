/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import './src/i18n/translation';

AppRegistry.registerComponent(appName, () => App);
