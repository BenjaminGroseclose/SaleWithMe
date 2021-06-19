import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements'; 
import firebase from "firebase/app";
import "firebase/auth";
import Profile from './../components/profile';

const User = ({ navigation }) => {
	const [user, setUser] = useState();

	useEffect(() => {
		// Setup Navigation
		setUser(firebase.auth().currentUser);
		const title = user ? user.email : 'Account' ;

		navigation.setOptions({
			headerTitle: title,
			headerTitleAlign: 'center',
			headerRight: () => (
				<Icon name="logout" onPress={() => firebase.auth().signOut()} />
			),
			headerRightContainerStyle: {
				paddingRight: 12
			}
		});

	}, [firebase.auth().currentUser]);

	const signOut = () => {
		firebase.auth().signOut();
		navigation.goBack();
	}

	const Auth = () => {
		return (
			<View style={{flex: 1}}>
				<View style={styles.actions}>
					<Text style={styles.header}>Login or Sign up for an account.</Text>
					<Button
						title="Login"
						onPress={() => navigation.push('Login')} />
					<Button
						title="Sign Up"
						onPress={() => navigation.push('SignUp')} />
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			{firebase.auth().currentUser ? <Profile user={firebase.auth().currentUser} /> : <Auth /> }
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 16
	},
	header: {
		fontSize: 20,
		textAlign: 'center'
	},
	actions: {
		flex: 0.25,
		justifyContent: 'space-between'	
	}
});

export default User;