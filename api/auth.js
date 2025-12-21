import axios from 'axios'
import { lienAPI } from './config';

export const loginRequest = async (email, password) => {
    const response = await axios.post(`${lienAPI}/auth/login`, {email, password});
    return response.data;
}

export const registerRequest = async (firstName, lastName, email, password) => {
    const response = await axios.post(`${lienAPI}/auth/register`, {firstName, lastName, email, password})
    return response.data;
}

export const currentUserRequest = async (token) => {
    const response = await axios.get(`${lienAPI}/users/me`, { headers: { Authorization: `Bearer ${token}`}});
    return response.data
}

export const updateCurrentUserRequest = async (token, userData) => {
    const response = await axios.patch(`${lienAPI}/users/me`, userData, { 
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}