import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import {Appbar, withTheme } from 'react-native-paper';

import Main from './screens/main';

const Stack = createStackNavigator();

const App = (props) => {

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={props.theme?.colors?.primary} />
      <Stack.Navigator
        screenOptions={{
          header: (props) => {}
        }}
      >
        <Stack.Screen name="Main" component={Main}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default withTheme(App);