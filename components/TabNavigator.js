import Stops from "../screens/Stops";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";

import { BottomNavigation } from 'react-native-paper';
import { useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabNavigator() {
    const [index, setIndex] = useState(0);
    const routes = [
        { key: 'stops', title: 'Arrêts', focusedIcon: 'map-marker', unfocusedIcon: 'map-marker-outline' },
        { key: 'favorites', title: 'Favorits', focusedIcon: 'star', unfocusedIcon: 'star-outline' },
        { key: 'profile', title: 'Profil', focusedIcon: 'account-circle', unfocusedIcon: 'account-circle-outline' },
    ];

    const renderScene = BottomNavigation.SceneMap({
        stops: () => <Stops/>,
        favorites: () => <Favorites/>,
        profile: () => <Profile/>
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
}