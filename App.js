import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, LogBox } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Analytics from 'expo-firebase-analytics';

// Screens
import Home from './app/screens/home';
import GarageSaleMap from './app/screens/garage-sale-map';
import CreateGarageSale from './app/screens/create-garage-sale';
import User from './app/screens/user'
import SignUp from './app/screens/sign-up';
import Login from './app/screens/login';
import ViewGarageSale from './app/screens/view-garage-sale';

// Gets the current screen from navigation state
const getActiveRouteName = state => {
  const route = state.routes[state.index];
  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }
  return route.name;
};

export default function App() {

  // Ignoring warning based on this: https://github.com/expo/expo/issues/13249
  LogBox.ignoreLogs(
    [
      `Constants.installationId has been deprecated in favor of generating and storing your own ID. Implement it using expo-application's androidId on Android and a storage API such as expo-secure-store on iOS and localStorage on the web. This API will be removed in SDK 44.`,
      `Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness...`
    ]
  );

  const routeNameRef = useRef();
  const navigationRef = useRef();

  useEffect(() => {
    const state = navigationRef.current?.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);

  const Stack = createStackNavigator();
  
  // TODO: Figure out theme
  const theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF'
    }
  };

  return (
    <TouchableWithoutFeedback>
      <NavigationContainer 
        theme={theme}
        ref={navigationRef}
        onStateChange={(state) => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = getActiveRouteName(state);
          if (previousRouteName !== currentRouteName) {
            Analytics.setCurrentScreen(currentRouteName, currentRouteName);
          }
        }}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Maps" component={GarageSaleMap} />
          <Stack.Screen name="Create" component={CreateGarageSale} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ViewGarageSale" component={ViewGarageSale} />
        </Stack.Navigator>
      </NavigationContainer>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
