import axios from 'axios';
import SECRETS from './../../secrets';

const GoogleMapsAPI = axios.create({
	baseURL: 'https://maps.googleapis.com/maps/api/geocode'
});

GoogleMapsAPI.interceptors.request.use(
	async (config) => {
		config.headers.Accept = 'application/json';
		return config;
	},
	(err) => {
    console.error(err);
		return Promise.reject(err);
	}
);

export const getLocationDetails = async (callback, address) => {
  // TODO: Figure out how to store the API Key
  // https://reactnative.dev/docs/security#storing-sensitive-info

  try {
    const response = await GoogleMapsAPI.get(
      `json?address=${address}&key=${SECRETS.GOOGLE_API}`
    );
    return callback(true, response.data);
  } catch (err) {
    console.warn(err);
    return callback(false, undefined);
  }
};

export default GoogleMapsAPI;