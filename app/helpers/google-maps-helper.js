import axios from 'axios';

const GoogleMapsAPI = axios.create({
	baseURL: 'https://maps.googleapis.com/maps/api/geocode/json'
});

GoogleMapsAPI.interceptors.request.use(
	async (config) => {
		config.headers.Accept = 'application/json';
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

export const getLocationDetails = async (callback, address) => {
	const response = await GoogleMapsAPI.get(
		`?address=${address}&key=AIzaSyC3YGAXNmZzQkYOfuB_MtPMFDv7-wHAXIA`
	)

  console.log(response.data);

	return callback(response.data);
};

export default GoogleMapsAPI;