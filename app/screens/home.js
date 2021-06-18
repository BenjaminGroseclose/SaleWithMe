import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Image } from 'react-native'
import { Button, Icon } from 'react-native-elements';
import { initFirebase } from '../helpers/firebase-helper';
import imageMap from '../../assets/assets';

const Home = ({ navigation }) => {

	useEffect(() => {
		// Setup Navigation
		navigation.setOptions({
			headerTitle: 'Sale with Me',
			headerTitleAlign: 'center',
			headerRight: () => (
				<Icon name="person" onPress={() => navigation.push('User')} />
			),
			headerRightContainerStyle: {
				paddingRight: 12
			}
		});

		// Setup firebase
		try {
			initFirebase();
		} catch (err) {
			console.error(err);
		}
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Image
				resizeMode='contain'
				source={imageMap.get('splash')}
			  style={styles.image} />
			<View style={styles.actions}>
				<Button 
					title="Find a garage sale"
					onPress={() => navigation.push('Maps')} />
				<Button
					title="Upload a garage sale"
					onPress={() => navigation.push('Create')} />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 16
	},
	image: {
		flex: 0.6,
		width: '100%'
	},
	actions: {
		flex: 0.15,
		justifyContent: 'space-between'	
	}
});

export default Home;