import React from 'react';
import UserScreen from './src/UserScreen';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <UserScreen />
      </NavigationContainer>
    </>
  );
};

export default App;
