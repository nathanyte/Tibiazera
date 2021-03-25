import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import WorldList from '../screens/WorldsData';
import PlayersOnline from '../screens/PlayersOnline';

const Stack = createStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="WorldList" component={WorldList} />
        <Stack.Screen name="PlayersOnline" component={PlayersOnline} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
