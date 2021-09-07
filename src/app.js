import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import {Appbar, withTheme } from 'react-native-paper';

import Loading from './screens/loading';
import Login from './screens/login';
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
        <Stack.Screen name="Loading" component={Loading}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Main" component={Main}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default withTheme(App);