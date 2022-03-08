import React from 'react';
import {LogBox} from 'react-native';

import Navigation from './src/navigation';

import {Provider} from 'react-redux';
import {Store} from './src/Store';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

function App() {
  return (
    <Provider store={Store}>
      <Navigation />
    </Provider>
  );
}

export default App;
