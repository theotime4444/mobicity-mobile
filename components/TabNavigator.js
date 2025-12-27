import { useState, useEffect } from "react"; 
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, ActivityIndicator, Text } from 'react-native-paper';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';

import Stops from "../screens/Stops";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";

import { setLocation, fetchLocation, fetchLocationFailure } from '../store/slice/location'; 
import { clearSelectedStop } from '../store/slice/selectedStop';

export default function TabNavigator() {
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch(); 

    const routes = [
        { key: 'stops', title: 'Arrêts', focusedIcon: 'map-marker', unfocusedIcon: 'map-marker-outline' },
        { key: 'favorites', title: 'Favoris', focusedIcon: 'star', unfocusedIcon: 'star-outline' },
        { key: 'profile', title: 'Profil', focusedIcon: 'account-circle', unfocusedIcon: 'account-circle-outline' },
    ];

    const { latitude, longitude, error } = useSelector(state => state.location);
    const retryAttempt = useSelector(state => state.location.retryAttempt);

    const onIndexChange = (newIndex) => {
        dispatch(clearSelectedStop());
        setIndex(newIndex);
    };

    useEffect(() => {
        const fetchUserLocation = async () => {
            dispatch(fetchLocation()); 
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                dispatch(fetchLocationFailure("Permission d'accès refusée."));
                return;
            }

            try {
                let userLocation = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High 
                });
                dispatch(setLocation({
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                }));
            } catch (e) {
                dispatch(fetchLocationFailure("Erreur de position."));
            }
        };
        fetchUserLocation();
    }, [dispatch, retryAttempt]);

    const renderScene = ({ route }) => {
    switch (route.key) {
        case 'stops':
        return <Stops />;
        case 'favorites':
        return <Favorites goToProfile={() => setIndex(2)} />;
        case 'profile':
        return <Profile />;
        default:
        return null;
    }
    };

    if ((!latitude || !longitude) && !error) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#FFC4B6" />
                <Text>Récupération de votre position...</Text>
            </View>
        );
    }

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={onIndexChange}
            renderScene={renderScene}
            keyboardHidesNavigationBar={false}
            shifting={true}
        />
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
});