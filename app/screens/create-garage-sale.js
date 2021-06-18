import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button, CheckBox } from 'react-native-elements';
import { writeData } from '../helpers/firebase-helper';
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
		console.log({
			title: title,
			description: description,
			latitude: 42.938558,
			longitude: -86.1455,
			baby: baby,
			boyMen: boyMen,
			girlWomen: girlWomen,
			homeDecoration: homeDecoration,
			kitchen: kitchen,
			electronics: electronics
		});

		// getLocationDetails(submitCallback, address)
	};

	const submitCallback = (data) => {
		// TODO: Get current user's username
		const currentDate = Date.now();
		writeData(FEATURES, `${currentDate}`, {
			title: title,
			description: description,
			latitude: 42.938558,
			longitude: -86.1455,
			created: currentDate
		});
	};

	return (
		<View style={styles.container}>
			<Input
				placeholder='Title'
				onChangeText={setTitle} />
			<Input
				placeholder='Description'
				onChangeText={setDescription} />
			<Input
				placeholder='Address'
				onChangeText={setAddress} />
			<View style={styles.checkboxContainer}>
				<CheckBox
					style={styles.checkbox}
					title='Baby'
					checked={baby}
					onPress={() => setBaby(!baby)} />
				<CheckBox
					style={styles.checkbox}
					title='Boy / Men'
					checked={boyMen}
					onPress={() => setBoyMen(!boyMen)} />
			</View>
			<View style={styles.checkboxContainer}>
				<CheckBox
					style={styles.checkbox}
					title='Girl / Women'
					checked={girlWomen}
					onPress={() => setGirlWomen(!girlWomen)} />
				<CheckBox
					style={styles.checkbox}
					title='Home Decor'
					checked={homeDecoration}
					onPress={() => setHomeDecoration(!homeDecoration)} />
			</View>
			<View style={styles.checkboxContainer}>
				<CheckBox
					style={styles.checkbox}
					title='Kitchen'
					checked={kitchen}
					onPress={() => setKitchen(!kitchen)} />
				<CheckBox
					style={styles.checkbox}
					title='Electronics'
					checked={electronics} 
					onPress={() => setElectronics(!electronics)} />
			</View>
			<Button
				style={{position: 'absolute', bottom: 0}}
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
	},
	checkbox: {
		width: 300
	}
});

export default CreateGarageSale;