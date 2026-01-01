import axios from 'axios'
import { APIURL } from './config';
import { setError } from '../store/slice/error';
import { store } from '../store/store';

// il se trouver dans api/config.js normalement
// il faut juste mettre son adress ip à la place de IP pour pouvoir accéder à l'api
// const APIURL = 'http://IP:3001';

// envoi les info de login à l'api et elle rend le toke jwt
export const loginRequest = async (email, password) => {
	try {
		const response = await axios.post(`${APIURL}/auth/login`, {email, password});
		return response.data;
	} catch (err) {
		let errorMessage = "Erreur lors de la connexion";

		if (err.response) {
			const status = err.response.status;

			switch(status){
				case 400:
					errorMessage = "Les données saisies sont incorrectes";
					break;
				case 401:
					errorMessage = "Email ou mot de passe incorrect.";
					break;
				case 500:
					errorMessage = "Le serveur rencontre un problème, réessayer plus tard";
					break;
				default:
					errorMessage = "Une erreur est survenue";
			}
		} else if (err.request) {
			errorMessage = "Impossible de joindre le serveur. vérifiez votre connexion";
		}

		store.dispatch(setError(errorMessage));
		return null;
	}
}



// on essaye de créer un compte
export const registerRequest = async (firstName, lastName, email, password) => {
	try {
		const response = await axios.post(`${APIURL}/auth/register`, {firstName, lastName, email, password})
		return response.data;
	} catch (err) {
		let errorMessage = "Erreur lors de la création du compte";

		if (err.response) {
			const status = err.response.status;

			switch(status){
				case 400:
					errorMessage = "Les données saisies sont incorrectes";
					break;
				case 409:
					errorMessage = "L'adresse mail existe déjà, veuillez en utiliser une autre";
					break;
				case 500:
					errorMessage = "Le serveur rencontre un problème, réessayer plus tard";
					break;
				default:
					errorMessage = "Une erreur est survenue";
			}
		} else if (err.request) {
			errorMessage = "Impossible de joindre le serveur. vérifiez votre connexion";
		}

		store.dispatch(setError(errorMessage));
		return null;
	}
}


// ici on envoie le token jwt à l'api pour récuperer les info de l'utilisateur
export const currentUserRequest = async (token) => {
    try {
		const response = await axios.get(`${APIURL}/users/me`, { headers: { Authorization: `Bearer ${token}`}});
		return response.data;
	} catch (err) {
		let errorMessage = "Erreur lors de la récupératoin des informations du compte";

		if (err.response) {
			const status = err.response.status;

			switch(status){
				case 401:
					errorMessage = "Action non authorisée, connecter vous";
					break;
				case 500:
					errorMessage = "Le serveur rencontre un problème, réessayer plus tard";
					break;
				default:
					errorMessage = "Une erreur est survenue";
			}
		} else if (err.request) {
			errorMessage = "Impossible de joindre le serveur. vérifiez votre connexion";
		}

		store.dispatch(setError(errorMessage));
		return null;
	}
}

export const updateCurrentUserRequest = async (token, userData) => {
	try {
		const response = await axios.patch(`${APIURL}/users/me`, userData, { 
        headers: { Authorization: `Bearer ${token}` }});
   		return response.data;
	} catch (err) {
		let errorMessage = "Erreur lors de la mise à jour du compte";

		if (err.response) {
			const status = err.response.status;

			switch(status){
				case 401:
					errorMessage = "Mot de passe incorrect";
					break;
				case 500:
					errorMessage = "Le serveur rencontre un problème, réessayer plus tard";
					break;
				default:
					errorMessage = "Une erreur est survenue";
			}
		} else if (err.request) {
			errorMessage = "Impossible de joindre le serveur. vérifiez votre connexion";
		}

		store.dispatch(setError(errorMessage));
		return null;
	}
}