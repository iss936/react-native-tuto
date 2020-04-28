import React from 'react';
// import Search from './Components/Search' ou
//import Search from './Components/Search.js'
import Navigation from './Navigation/Navigation';
import { Provider } from 'react-redux';
import Store from './Store/configureStore';
import { NavigationContainer } from '@react-navigation/native';
import { MyTabs } from './Navigation/Navigation';
export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </Provider>
  );
}