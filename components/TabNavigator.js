import Stops from "../screens/Stops";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";

import { BottomNavigation } from 'react-native-paper';
import { useState, useEffect } from "react"; 

import * as Location from 'expo-location';
import { useDispatch, useSelector} from 'react-redux';
import { setLocation, fetchLocation, fetchLocationFailure, fetchLocationRetry } from '../store/slice/location'; 

export default function TabNavigator() {
    const [index, setIndex] = useState(0);
    const routes = [
        { key: 'stops', title: 'Arrêts', focusedIcon: 'map-marker', unfocusedIcon: 'map-marker-outline' },
        { key: 'favorites', title: 'Favorits', focusedIcon: 'star', unfocusedIcon: 'star-outline' },
        { key: 'profile', title: 'Profil', focusedIcon: 'account-circle', unfocusedIcon: 'account-circle-outline' },
    ];

    const dispatch = useDispatch(); 
    const retryAttempt = useSelector(state => state.location.retryAttempt);

    useEffect(() => {
        const fetchUserLocation = async () => {
            dispatch(fetchLocation()); 
            
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                dispatch(fetchLocationFailure("Permission d'accès à la localisation refusée."));
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
                dispatch(fetchLocationFailure("Erreur lors de la récupération de la position."));
                console.error("Location fetch error:", e);
            }
        };

        fetchUserLocation();
    }, [dispatch, retryAttempt]);


    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            keyboardHidesNavigationBar={false}
            shifting={true}
        />
    );
}

const renderScene = BottomNavigation.SceneMap({
    stops: () => <Stops/>,
    favorites: () => <Favorites/>,
    profile: () => <Profile/>
});