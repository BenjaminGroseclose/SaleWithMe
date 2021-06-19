import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import imageMap from './../../assets/assets'
import { setupDataListener } from '../helpers/firebase-helper';
import { FEATURES } from '../helpers/constants';

const GarageSaleMap = ({ navigation }) => {
	const [currentLocation, setCurrentLocation] = useState(undefined);
	const [salesNearMe, setSalesNearMe] = useState(undefined);

	useEffect(() => {
		// Setup Navigation
		navigation.setOptions({
			headerTitle: 'Garage Sales near Me',
			headerTitleAlign: 'center',
			headerRight: () => (
				<Icon name="person" onPress={() => navigation.push('User')} />
			),
			headerRightContainerStyle: {
				paddingRight: 12
			}
		});

		// Setup Location
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				// TODO: Handle this better
				console.error('Permission not granted');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setCurrentLocation(location);
		})();
	}, []);

	useEffect(() => {
		if (currentLocation) {
			// Load from firebase
			//setupDataListener((data) => setSalesNearMe(data), FEATURES.GARAGE_SALES)
			setSalesNearMe([
				{
					title: 'Hello World',
					description: 'Hello World Description',
					latitude: 42.938558,
					longitude: -86.1455
				}
			])
		}
	}, [currentLocation]);

	const RenderMap = () => {
		return (
			<MapView 
				style={styles.map} 
				initialRegion={{
					latitude: currentLocation.coords.latitude,
					longitude: currentLocation.coords.longitude,
					longitudeDelta: 0.15,
					latitudeDelta: 0.15
				}} >
					{salesNearMe.map((sale, index) => (
						<Marker 
							key={index}
							coordinate={{
								latitude: sale.latitude,
								longitude: sale.longitude
							}}
							title={sale.title}
							description={sale.description}
							image={imageMap.get('sale')}
						 />
					))}
			</MapView>
		);
	}

	return (
		<View style={styles.container}>
			{ currentLocation && salesNearMe ? 
				<RenderMap /> 
				: 
				<ActivityIndicator size="large" />
			}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});

export default GarageSaleMap;