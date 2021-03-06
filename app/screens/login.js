import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import firebase from "firebase/app";
import "firebase/auth";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [usernameError, setUsernameError] = useState(errorStyles.normal);
  const [passwordError, setPasswordError] = useState(errorStyles.normal);

  useEffect(() => {
    		// Setup Navigation
		navigation.setOptions({
			headerTitle: 'Login',
			headerTitleAlign: 'center'
		});
  }, []);

  const submit = () => {
    if (isValidSubmit()) {
      firebase.auth().signInWithEmailAndPassword(username, password)
      .then((userCredential) => {
        Alert.alert(
          'Success!',
          'Successfully logged, please return to the home screen',
          [{ text: "Ok", onPress: () => navigation.navigate('Home'), style: "cancel" }]
        );
      }).catch((error) => {
        console.log(error);
        Alert.alert(
          'Alert!',
          'Invalid username / password, please try again.',
          [{ text: "Cancel", style: "cancel" }]
        );
      });
    }
  };

  const isValidSubmit = () => {
		let isValid = true;

		if (username === undefined || username === '') {
			setUsernameError(errorStyles.error);
			isValid = false;
		} else {
			setUsernameError(errorStyles.normal);
		}

		if (password === undefined || password === '' || password.length < 7) {
			setPasswordError(errorStyles.error);
			isValid = false;
		} else {
			setPasswordError(errorStyles.normal);
		}

    return isValid;
  };

  return (
    <View style={styles.container}>
      <Input 
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        errorStyle={usernameError}
        errorMessage='Username is required' />
      <Input 
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        errorStyle={passwordError}
        errorMessage='Password is required and must be 6 chars'
        secureTextEntry={true} />
      <Button
				title="Login"
				onPress={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16
  }
});

const errorStyles = StyleSheet.create({
	error: {
		color: 'red'
	},
	normal: {
		color: 'white'
	}
});

export default Login;
