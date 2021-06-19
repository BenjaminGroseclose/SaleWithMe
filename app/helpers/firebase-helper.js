import firebase from 'firebase/app';
import 'firebase/database'

const firebaseConfig = {
	apiKey: "AIzaSyCpdrRJZvFLP8L4WQzWIYL4Ok6vhBiMJes",
	authDomain: "salewithme-c1551.firebaseapp.com",
	projectId: "salewithme-c1551",
	storageBucket: "salewithme-c1551.appspot.com",
	messagingSenderId: "887229762147",
	appId: "1:887229762147:web:1bce155849a436c7a44656",
	measurementId: "G-Q87YL30FTX"
};

export const initFirebase = () => {
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	}
};

export const writeData = (feature, key, data) => {
	firebase.database().ref(`salewithme/${feature}/${key}`).set(data);
};

export const setupDataListener = (callback, feature) => {
	firebase
		.database()
		.ref(`salewithme/${feature}`)
		.on('value', (snapshot) => {
			if (snapshot?.val()) {
				const firebaseObject = snapshot.val();
				const newArray = [];

				Object.keys(firebaseObject).map((key, index) => {
					newArray.push({...firebaseObject[key], id: key});
				});
				callback(newArray);
			} else {
				callback([]);
			}
		});
};

export const getDataByKey = (callback, feature, key) => {
	firebase
	.database()
	.ref(`salewithme/${feature}/${key}`)
	.on('value', (snapshot) => {
		if (snapshot?.val()) {
			const firebaseObject = snapshot.val();
			const newArray = [];

			Object.keys(firebaseObject).map((key, index) => {
				newArray.push({...firebaseObject[key], id: key});
			});
			callback(newArray);
		} else {
			callback([]);
		}
	});
};

export const getCurrentUser = () => {
	return firebase.auth().currentUser;
}