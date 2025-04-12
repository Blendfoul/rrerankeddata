/**
 * @format
 */

import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
import './src/i18n/translation';
//import sortServer from './src/tasks/sort';

//AppRegistry.registerHeadlessTask('SortTask', sortServer);

AppRegistry.registerComponent(appName, () => App);
