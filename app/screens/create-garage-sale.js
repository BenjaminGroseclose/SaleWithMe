import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Icon, Button, CheckBox } from 'react-native-elements';
import { FEATURES } from '../helpers/constants';
import { getCurrentUser, writeData } from '../helpers/firebase-helper';
import { getLocationDetails } from '../helpers/google-maps-helper';

const CreateGarageSale = ({ navigation }) => {
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [address, setAddress] = useState();

	// Checkbox items
	const [baby, setBaby] = useState(false);
	const [boyMen, setBoyMen] = useState(false);
	const [girlWomen, setGirlWomen] = useState(false);
	const [homeDecoration, setHomeDecoration] = useState(false);
	const [kitchen, setKitchen] = useState(false);
	const [electronics, setElectronics] = useState(false);

	// Error
	const [titleError, setTitleError] = useState(errorStyles.normal);
	const [descriptionError, setDescriptionError] = useState(errorStyles.normal);
	const [addressError, setAddressError] = useState(errorStyles.normal);

	useEffect(() => {
		// Setup Navigation
		navigation.setOptions({
			headerTitle: 'Upload Garage Sale',
			headerTitleAlign: 'center',
			headerRight: () => (
				<Icon name="person" onPress={() => navigation.push('User')} />
			),
			headerRightContainerStyle: {
				paddingRight: 12
			}
		});
	}, []);

	const submit = () => {
		if (isValidSubmit()) {
			getLocationDetails(submitCallback, address)
		}
	};

	const isValidSubmit = () => {
		let isValid = true;

		if (title === undefined || title === '') {
			setTitleError(errorStyles.error);
			isValid = false;
		} else {
			setTitleError(errorStyles.normal);
		}

		if (description === undefined || description === '') {
			setDescriptionError(errorStyles.error);
			isValid = false;
		} else {
			setDescriptionError(errorStyles.normal);
		}

		if (address === undefined || address === '') {
			setAddressError(errorStyles.error);
			isValid = false;
		} else {
			setAddressError(errorStyles.normal);
		}

		return isValid;
	}

	const submitCallback = (isSuccessful, data) => {
		if (isSuccessful) {

			const currentUser = getCurrentUser();
			const currentUsername = currentUser ? currentUser.email : 'anonymous' ;

			const sale = {
				title: title,
				description: description,
				latitude: data.results[0].geometry.location.lat,
				longitude: data.results[0].geometry.location.lng,
				address: address,
				baby: baby,
				boyMen: boyMen,
				girlWomen: girlWomen,
				homeDecoration: homeDecoration,
				kitchen: kitchen,
				electronics: electronics,
				user: currentUsername
			};

			const currentDate = Date.now();
			writeData(FEATURES.GARAGE_SALES, `${currentDate}-${currentUsername}`, sale);
			Alert.alert(
				'Success!',
				`Other users should be able to see you garage now at: ${address}, thanks!.`,
				[{ 
					text: "Cancel", 
					style: "cancel",
					onPress: () => navigation.navigate('Home')
				}]
			);
		} else {
			Alert.alert(
				'Alert!',
				`Sorry, address: '${address}' is not valid, please try again.`,
				[{ text: "Cancel", style: "cancel" }]
			);
		}
	};

	return (
		<View style={styles.container}>
			<Input
				placeholder='Title'
				value={title}
				onChangeText={setTitle}
				errorStyle={titleError}
				errorMessage='Title is required' />
			<Input
				placeholder='Description'
				value={description}
				onChangeText={setDescription}
				errorStyle={descriptionError}
				errorMessage='Description is required' />
			<Input
				placeholder='Address'
				value={address}
				onChangeText={setAddress}
				errorStyle={addressError}
				errorMessage='Address is required' />
			<View style={styles.checkboxContainer}>
				<CheckBox
					title='Baby'
					checked={baby}
					onPress={() => setBaby(!baby)} />
				<CheckBox
					title='Boy / Men'
					checked={boyMen}
					onPress={() => setBoyMen(!boyMen)} />
			</View>
			<View style={styles.checkboxContainer}>
				<CheckBox
					title='Girl / Women'
					checked={girlWomen}
					onPress={() => setGirlWomen(!girlWomen)} />
				<CheckBox
					title='Home Decor'
					checked={homeDecoration}
					onPress={() => setHomeDecoration(!homeDecoration)} />
			</View>
			<View style={styles.checkboxContainer}>
				<CheckBox
					title='Kitchen'
					checked={kitchen}
					onPress={() => setKitchen(!kitchen)} />
				<CheckBox
					title='Electronics'
					checked={electronics} 
					onPress={() => setElectronics(!electronics)} />
			</View>
			<Button
				title="Submit"
				onPress={submit} />
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 16
	},
	checkboxContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly'
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

export default CreateGarageSale;