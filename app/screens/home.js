import React from './react';
import { StyleSheet, SafeAreaView, Text, Button } from 'react-native'

const Home = ({navigate, route}) => {
	return (
		<SafeAreaView>
			<Button 
				title="Find a garage sale"
				onPress={() => navigate.push('Maps')}/>
			<Button
				title="Upload a garage sale"
				onPress={() => navigate.push('Create')}/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({

});

export default Home;