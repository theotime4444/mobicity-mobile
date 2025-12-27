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

export const getFavoriteLocation = async (token) => {
    if (!token) return [];
    const response = await axios.get(`${APIURL}/favorites/me`, { headers: { Authorization: `Bearer ${token}`}});
    
    return response.data.map(stop => ({ ...stop.transportLocation}));
}

export const addFavorite = async (token, transportLocationId) => {
    if (!token) return;
    const response = await axios.post(`${APIURL}/favorites/me` , {transportLocationId: transportLocationId}, { headers: { Authorization: `Bearer ${token}`}})
}

export const removeFavorite = async (token, transportLocationId) => {
    if (!token) return;
    const response = await axios.delete(`${APIURL}/favorites/me/${transportLocationId}` , { headers: { Authorization: `Bearer ${token}`}});
    return response.data
}

export const favoriteExists = async (token, transportLocationId) => {
    if (!token) return false;
    try {
        const response = await axios.get(`${APIURL}/favorites/me/${transportLocationId}`, { headers: { Authorization: `Bearer ${token}` }});
        return Boolean(response.data); 
    } catch (err) {
        return false;
    }
}