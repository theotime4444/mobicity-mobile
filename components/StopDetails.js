import { useEffect, useState } from 'react';
import { StyleSheet, View, ToastAndroid, Platform } from 'react-native';
import { ActivityIndicator, Button, Text, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getTransportLocation, addFavorite, removeFavorite } from '../api/transportLocations';
import { clearError } from '../store/slice/error';

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

    // si les détails sont en chargement, on affiche un symbole de chargement
    if (loading) return <ActivityIndicator style={styles.center} />;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{stop?.address}</Text>
            
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
    btn: {
        borderRadius: 5,
    }
});