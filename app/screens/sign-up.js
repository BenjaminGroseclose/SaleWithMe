import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import firebase from "firebase/app";
import "firebase/auth";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [usernameError, setUsernameError] = useState(errorStyles.normal);
  const [passwordError, setPasswordError] = useState(errorStyles.normal);

  const submit = () => {
    if (isValidSubmit()) {
      firebase.auth().createUserWithEmailAndPassword(username, password)
      .then((userCredential) => {
        firebase.auth().signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
          navigation.navigate('User');
        }).catch((error) => {
          console.log(error);
          showAlert(`Sorry, had an issue logging in after creating the account, please try again`);
        });
      }).catch((error) => {
        console.log(error);
        showAlert(`Sorry, was not able to sign up user: '${username}'.`);
      });
    }
  };

  const showAlert = (message) => {
		Alert.alert(
			'Alert!',
			message,
			[{ text: "Cancel", style: "cancel" }]
		)
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
				title="Sign Up"
				onPress={submit} />
      <TouchableOpacity
        style={{
          marginTop: 8
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text>Already have an Account? Login</Text>
      </TouchableOpacity>
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

export default SignUp;
