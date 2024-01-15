/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

import AppNavigation from './src/navigation/appNavigation';
import { persistor, store } from './src/redux/store/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';

function App(): React.JSX.Element {


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <AppNavigation/>
      <FlashMessage position="top" /> 
      </PersistGate>
    </Provider>
  );
}

export default App;
