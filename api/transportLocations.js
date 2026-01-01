import axios from 'axios'
import { APIURL } from './config';
import { setError } from '../store/slice/error';
import { store } from '../store/store';

// il se trouver dans api/config.js normalement
// il faut juste mettre son adress ip à la place de IP pour pouvoir accéder à l'api
// const APIURL = 'http://IP:3001';

// on donne notre lattitude et longitude à l'api avec un rayon autour de nous et une limit de transport à récuperer on peut aussi donner la catégorie du transport (bus / train / ...) et un recheche
// ça nous renvoie un nombre définis par limit de transport proche (qui sont dans radius)
export const getTransportLocationsNearby = async (latitude, longitude, radius, limit, categoryId, search) => {
    try {
        const response = await axios.get(`${APIURL}/transport-locations/nearby`, {params: {latitude, longitude, radius, limit, categoryId, search}});
        return response.data;
    } catch (err) {
        let errorMessage = "Erreur lors de la récupération des points transport";

		if (err.response) {
			const status = err.response.status;

			switch(status){
				case 400:
					errorMessage = "Paramètres invalides";
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


// on récupère un transport spécifique en fonction de son identifiant
export const getTransportLocation = async (transportLocationId) => {
    try {
        const response = await axios.get(`${APIURL}/transport-locations/${transportLocationId}`);
        return response.data;
    } catch (err) {
        let errorMessage = "Erreur lors de la récupération des points transport";

		if (err.response) {
			const status = err.response.status;

			switch(status){
				case 400:
					errorMessage = "Point de transport invalide";
					break;
				case 404:
					errorMessage = "Point de transport inexistant";
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

// ici on donne notre toekn jwt et l'api va nous rendre le tableau de transpo en favori
export const getFavoriteLocation = async (token) => {
    if (!token) return [];
    try {
        const response = await axios.get(`${APIURL}/favorites/me`, { headers: { Authorization: `Bearer ${token}`}});
        return response.data.map(stop => ({ ...stop.transportLocation}));
    } catch (err) {
        let errorMessage = "Erreur lors de la récupérations des favoris";

		if (err.response) {
			const status = err.response.status;

			switch(status){
				case 401:
					errorMessage = "Opération non authorisée";
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


// on utiliser le token jwt et un identifiant de transport pour ajouter un transport en favoris au client donné 
export const addFavorite = async (token, transportLocationId) => {
    if (!token) return;
    try {
        const response = await axios.post(`${APIURL}/favorites/me` , {transportLocationId: transportLocationId}, { headers: { Authorization: `Bearer ${token}`}})
        return response.data
    } catch (err) {
		let errorMessage = "Erreur lors de l'ajout";

		if (err.response) {
			const status = err.response.status;

			switch(status){
				case 400:
					errorMessage = "Point de transport invalide";
					break;
				case 401:
					errorMessage = "Opération non authorisée";
					break;
                case 409:
                    errorMessage = "Déjà en favoris";
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


// on utiliser le token jwt et un identifiant de transport pour supprimer un transport des favoris pour le client correspondant au jwt
export const removeFavorite = async (token, transportLocationId) => {
    if (!token) return;
    try {
        const response = await axios.delete(`${APIURL}/favorites/me/${transportLocationId}` , { headers: { Authorization: `Bearer ${token}`}});
        return response.data
	} catch (err) {
		let errorMessage = "Erreur lors de la suppression";

		if (err.response) {
			const status = err.response.status;

			switch(status){
				case 400:
					errorMessage = "Point de transport invalide";
					break;
				case 401:
					errorMessage = "Opération non authorisée";
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


// Ici on test si le favoris est dans la tables des favoris de l'utilisateur correspondant au jwt
export const favoriteExists = async (token, transportLocationId) => {
    if (!token) return false;
    try {
        const response = await axios.get(`${APIURL}/favorites/me/${transportLocationId}`, { headers: { Authorization: `Bearer ${token}` }});
        return Boolean(response.data); 
    } catch (err) {
        return false;
    }
}


