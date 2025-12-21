import axios from 'axios'
import { lienAPI } from './config';


export const getTransportLocationsNearby = async (latitude, longitude, radius, limit, categoryId, search) => {
    const response = await axios.get(`${lienAPI}/transport-locations/nearby`, {params: {latitude, longitude, radius, limit, categoryId, search}});
    return response.data;
}

export const getTransportLocation = async (limit, offset, categoryId, search) => {
    const response = await axios.get(`${lienAPI}/transport-locations`, {params: {limit, offset, categoryId, search}})
    return response.data;
}
