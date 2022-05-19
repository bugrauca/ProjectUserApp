import React from 'react';
import UserStackScreen from './src/UserScreen';
import PostsStackScreen from './src/PostScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarLabelPosition: 'beside-icon',
              tabBarLabelStyle: {
                fontWeight: '700',
                fontSize: 15,
              },
              tabBarIconStyle: {display: 'none'},
            }}
            name="Users"
            component={UserStackScreen}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarLabelPosition: 'beside-icon',
              tabBarLabelStyle: {
                fontWeight: '700',
                fontSize: 15,
              },
              tabBarIconStyle: {display: 'none'},
            }}
            name="Posts"
            component={PostsStackScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
