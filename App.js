import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './app/screens/home';
import GarageSaleMap from './app/screens/garage-sale-map';
import CreateGarageSale from './app/screens/create-garage-sale';

const App = () => {

  const Stack = createStackNavigator();
  
  const theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      primary: '#EEE',
      background: '#72A0C1'
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Maps" component={GarageSaleMap} />
          <Stack.Screen name="Create" component={CreateGarageSale} />
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
  },
});