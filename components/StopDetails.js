import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ToastAndroid, Platform } from 'react-native';
import { ActivityIndicator, Button, Text, Snackbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { getTransportLocation, addFavorite, removeFavorite } from '../api/transportLocations';

export default function StopDetails({ stopId, mode }) {
    const [loading, setLoading] = useState(true);
    const [stop, setStop] = useState(null);
    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState("");
    
    const token = useSelector(state => state.login.token);

    useEffect(() => {
        getTransportLocation(stopId).then(data => {
            setStop(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [stopId]);

    const notify = (text) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(text, ToastAndroid.SHORT);
        } else {
            setMsg(text);
            setVisible(true);
        }
    };

    const handleAction = async () => {
        try {
            if (mode === 'favorite') {
                await removeFavorite(token, Number(stopId));
                notify("Retiré !");
            } else {
                await addFavorite(token, Number(stopId));
                notify("Ajouté !");
            }
        } catch (err) {
            notify(err.response?.status === 409 ? "Déjà en favori" : "Erreur");
        }
    };

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