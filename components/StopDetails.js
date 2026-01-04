import { useEffect, useState } from 'react';
import { StyleSheet, View, ToastAndroid, Platform } from 'react-native';
import { ActivityIndicator, Button, Text, Snackbar, Icon } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getTransportLocation, addFavorite, removeFavorite } from '../api/transportLocations';
import { clearError } from '../store/slice/error';

const CATEGORY_ICONS = {
  1: 'bus',
  2: 'train',
  3: 'car',
};

const CATEGORY_LABELS = {
  1: 'Bus',
  2: 'Train',
  3: 'Cambio',
};

export default function StopDetails({ stopId, mode }) {
    const [loading, setLoading] = useState(true);
    const [stop, setStop] = useState(null);
    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState("");
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.error.error);
    
    const token = useSelector(state => state.login.token);
    
    // si erreur lors de l'ajout de favoris ou la suppression de favoris on fait utilise un message
    useEffect(() => {
        if (errorMessage) {
            notify(errorMessage)
            dispatch(clearError());
        }

    }, [errorMessage]);

    useEffect(() => {
        getTransportLocation(stopId).then(data => {
            setStop(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [stopId]);

    // on crée le message "flottant", on lui donne un texte et une durée (2 secondes). On utilise aussi un message si on n'est pas sur Android
    const notify = (text) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(text, 2000);
        } else {
            setMsg(text);
            setVisible(true);
        }
    };


    // on utilise un mode qui nous dit si on est sur la page favoris ou stops, et quand on ajoute/supprime un favori, on utilise Notify pour confirmer l'ajout/suppression
    const handleAction = async () => {
        let result;
        if (mode === 'favorite') {
            result = await removeFavorite(token, stopId);
            if (result) notify("Retiré !");
        } else {
            result = await addFavorite(token, stopId);
            if (result) notify("Ajouté !");
        }
    };

    // Fonction pour formater les coordonnées GPS
    const formatCoordinates = (lat, lon) => {
        if (!lat || !lon) return null;
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);
        if (isNaN(latNum) || isNaN(lonNum)) return null;
        const latDir = latNum >= 0 ? 'N' : 'S';
        const lonDir = lonNum >= 0 ? 'E' : 'O';
        return `${Math.abs(latNum).toFixed(4)}°${latDir}, ${Math.abs(lonNum).toFixed(4)}°${lonDir}`;
    };

    // si les détails sont en chargement, on affiche un symbole de chargement
    if (loading) return <ActivityIndicator style={styles.center} />;

    const categoryId = stop?.category?.id;
    const categoryIcon = categoryId ? CATEGORY_ICONS[categoryId] : null;
    // Utiliser category.name si disponible, sinon fallback sur le mapping
    const categoryName = stop?.category?.name || (categoryId ? CATEGORY_LABELS[categoryId] : null);
    const coordinates = formatCoordinates(stop?.latitude, stop?.longitude);
    const vehicleBrand = stop?.vehicle?.brand;
    const vehicleModel = stop?.vehicle?.model;
    const hasVehicleInfo = vehicleBrand || vehicleModel;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{stop?.address}</Text>
            
            {categoryName && (
                <View style={styles.infoRow}>
                    <Icon icon={categoryIcon} size={20} />
                    <Text style={styles.infoText}>{categoryName}</Text>
                </View>
            )}

            {coordinates && (
                <View style={styles.infoRow}>
                    <Icon icon="map-marker" size={20} />
                    <Text style={styles.infoText}>{coordinates}</Text>
                </View>
            )}

            {hasVehicleInfo && (
                <View style={styles.infoRow}>
                    <Icon icon="car" size={20} />
                    <Text style={styles.infoText}>
                        {vehicleBrand && vehicleModel 
                            ? `${vehicleBrand} ${vehicleModel}`
                            : vehicleBrand || vehicleModel}
                    </Text>
                </View>
            )}
            
            { token &&
            <Button 
                mode="contained" 
                onPress={handleAction}
                style={styles.btn}
                buttonColor={mode === 'favorite' ? "#d32f2f" : "#6200ee"}
            >
                {mode === 'favorite' ? "Supprimer" : "Ajouter aux favoris"}
            </Button>}

            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={2000}
            >
            {msg}
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    center: {
        marginTop: 50,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    infoText: {
        fontSize: 15,
        color: '#666',
        flex: 1,
    },
    btn: {
        borderRadius: 5,
    }
});