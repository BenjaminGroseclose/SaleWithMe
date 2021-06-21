import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Alert } from 'react-native'
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
				Alert.alert(
					'Alert!',
					`You must grant location permission to use the map feature.`,
					[{ text: "Cancel", onPress=() => navigation.goBack(), style: "cancel" }]
				);
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setCurrentLocation(location);
		})();
	}, []);

	useEffect(() => {
		if (currentLocation) {
			// Load from firebase
			setupDataListener((data) => filterSale(data), FEATURES.GARAGE_SALES);
		}
	}, [currentLocation]);

	const filterSale = (data) => {
		const currentDate = new Date(Date.now()).toDateString();
		const filteredData = data.filter(x => x.startDate <= currentDate && x.endDate >= currentDate);
		setSalesNearMe(filteredData);
	}

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
				<ActivityIndicator size="large" color="#0000ff" />
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