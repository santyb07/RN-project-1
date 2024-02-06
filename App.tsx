/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';

import AppNavigation from './src/navigation/appNavigation';
import { persistor, store } from './src/redux/store/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import CheckInternet from './src/screens/CheckInternet';

function App(): React.JSX.Element {
  const [isConnected, setIsConnected] = useState<Boolean>(true);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {
        isConnected===true ?
      <AppNavigation/>:null
        }
         <CheckInternet
       isConnected={isConnected}
       setIsConnected={setIsConnected}
     />
      <FlashMessage position="top" /> 
      </PersistGate>
    </Provider>
  );
}

export default App;
