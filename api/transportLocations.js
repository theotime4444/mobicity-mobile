import axios from 'axios'
import { APIURL } from './config';


export const getTransportLocationsNearby = async (latitude, longitude, radius, limit, categoryId, search) => {
    const response = await axios.get(`${APIURL}/transport-locations/nearby`, {params: {latitude, longitude, radius, limit, categoryId, search}});
    return response.data;
}

export const getTransportLocations = async (limit, offset, categoryId, search) => {
    const response = await axios.get(`${APIURL}/transport-locations`, {params: {limit, offset, categoryId, search}});
    return response.data;
}

export const getTransportLocation = async (transportLocationId) => {
    const response = await axios.get(`${APIURL}/transport-locations/${transportLocationId}`);
    return response.data;
}