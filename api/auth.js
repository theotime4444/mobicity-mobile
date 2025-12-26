import axios from 'axios'
import { APIURL } from './config';

export const loginRequest = async (email, password) => {
    const response = await axios.post(`${APIURL}/auth/login`, {email, password});
    return response.data;
}

export const registerRequest = async (firstName, lastName, email, password) => {
    const response = await axios.post(`${APIURL}/auth/register`, {firstName, lastName, email, password})
    return response.data;
}

export const currentUserRequest = async (token) => {
    const response = await axios.get(`${APIURL}/users/me`, { headers: { Authorization: `Bearer ${token}`}});
    return response.data
}

export const updateCurrentUserRequest = async (token, userData) => {
    const response = await axios.patch(`${APIURL}/users/me`, userData, { 
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}