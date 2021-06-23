import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Alert, Text, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import imageMap from './../../assets/assets'
import { setupDataListener } from '../helpers/firebase-helper';
import { FEATURES } from '../helpers/constants';
import { getSaleIcons } from '../helpers/icon-helper';

const GarageSaleMap = ({ navigation }) => {
	const [currentLocation, setCurrentLocation] = useState(undefined);
	const [salesNearMe, setSalesNearMe] = useState(undefined);
	const [selectedSale, setSelectedSale] = useState(undefined);

	const [mapStyle, setMapStyle] = useState('full');

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
					[{ text: "Cancel", onPress: () => navigation.goBack(), style: "cancel" }]
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
		// TODO: Gross...
		const currentDate = new Date(new Date(Date.now()).toDateString());
		const filteredData = data.filter(x => new Date(x.startDate) <= currentDate && new Date(x.endDate) >= currentDate);
		setSalesNearMe(filteredData);
	}

	const RenderMap = () => {
		return (
			<MapView 
				style={mapStyle === 'full' ? styles.mapFull : styles.mapHalf}
				onLongPress={() => selectMap()}
				initialRegion={{
					latitude: selectedSale ? selectedSale.latitude : currentLocation.coords.latitude,
					longitude: selectedSale? selectedSale.longitude : currentLocation.coords.longitude,
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
							onPress={() => setSale(sale)}
							image={imageMap.get('sale')}
						 />
					))}
			</MapView>
		);
	};

	const selectMap = () => {
		setSelectedSale(undefined);
		setMapStyle('full');
	}

	const setSale = (sale) => {
		setSelectedSale(sale);
		setMapStyle('half');
	}

	const RenderMarkerDetails = () => {
		const icons = getSaleIcons(selectedSale);

		return (
			<ScrollView style={{flex: 0.3}}>
				<View style={styles.selectedContainer}>
					<View style={styles.selectedHeader}>
						<View>
							<Text>Title: {selectedSale.title}</Text>
							<Text style={{maxWidth: '70%'}}>Address: {selectedSale.address}</Text>
						</View>
						<View>
							<Text>Start: {selectedSale.startDate}</Text>
							<Text>End: {selectedSale.endDate}</Text>
							{
								// TODO: Consider having the user's provide a username instead of email.
							}
							<Text>By: {selectedSale.user ? selectedSale.user : 'Unknown'}</Text>
						</View>
					</View>
					{
							icons.map((item, index) => {
								return (
									<View key={index} style={styles.iconRow}>
										<Icon size={30} name={item.icon} type={item.type} />
										<Text>{item.text}</Text>
									</View>
								)
							})
						}
				</View>
			</ScrollView>
		);
	};

	return (
		<View style={styles.container}>
			{ currentLocation && salesNearMe ? 
				<View style={{flex: 1}}>
					<RenderMap />
					{
						mapStyle === 'half' && selectedSale ? 
							<RenderMarkerDetails />
						:
							<View></View>
					}
				</View>
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
	mapFull: {
		flex: 1
  },
	mapHalf: {
		flex: 0.7
	},
	selectedContainer: {
		margin: 8
	},
	iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
		paddingBottom: 4,
    borderBottomWidth: 1
  },
	selectedHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1
	}
});

export default GarageSaleMap;