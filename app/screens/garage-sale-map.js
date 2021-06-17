import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native'
import MapView from 'react-native-maps';

const GarageSaleMap = ({navigate, route}) => {

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const 
		});
	}, []);

	return (
		<View style={styles.container}>
			<MapView style={styles.map} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	map: {
		flex: 0.75,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default GarageSaleMap;