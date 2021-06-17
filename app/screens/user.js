import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { FEATURES } from '../helpers/constants';
import { getDataByKey, setupDataListener } from '../helpers/firebase-helper';

const User = ({navigation, route}) => {
	const [user, setUser] = useState();

	// TODO: Need to reconsider how to manage auth.
	useEffect(() => {
		getDataByKey(saveUser, FEATURES.USER, )

	}, []);

	const saveUser = (user) => {

	};

	return (
		<SafeAreaView>

		</SafeAreaView>
	);
};

const styles = StyleSheet.create({

});

export default User;