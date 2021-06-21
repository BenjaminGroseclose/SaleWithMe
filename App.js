import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Analytics from 'expo-firebase-analytics';
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

  const routeNameRef = useRef();
  const navigationRef = useRef();

  useEffect(() => {
    const state = navigationRef.current.getRootState();

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
    <TouchableWithoutFeedback       
      ref={navigationRef}
      onStateChange={(state) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);
        if (previousRouteName !== currentRouteName) {
          Analytics.setCurrentScreen(currentRouteName, currentRouteName);
        }
      }}
    >
      <NavigationContainer theme={theme}>
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
