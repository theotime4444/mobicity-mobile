import axios from 'axios'
import { APIURL } from './config';
import { setError } from '../store/slice/error';
import { store } from '../store/store';

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

export const favoriteExists = async (token, transportLocationId) => {
    if (!token) return false;
    try {
        const response = await axios.get(`${APIURL}/favorites/me/${transportLocationId}`, { headers: { Authorization: `Bearer ${token}` }});
        return Boolean(response.data); 
    } catch (err) {
        return false;
    }
}


