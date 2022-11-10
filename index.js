/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import './src/i18n/translation';
//import sortServer from './src/tasks/sort';

//AppRegistry.registerHeadlessTask('SortTask', sortServer);

AppRegistry.registerComponent(appName, () => App);
