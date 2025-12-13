import React from 'react';
import { StyleSheet, View } from 'react-native';
import Map from '../components/Map';
import Search from '../components/Search';

export default function Favorites() {

    const favoritePoints = [
        {
            id: 1,
            name: "Gembloux",
            latitude: 48.8809,
            latitude:50.5602, 
            longitude:4.6918,
            type: "test"
        },
        {
            id: 2,
            name: "Test Bruxelles",
            latitude: 50.8477,
            longitude: 4.3572,
            type: "test"
        }
    ];

    return (
        <View style={styles.container}>
            <Map 
                points={favoritePoints}  
            />
            <View style={{
                position: 'absolute',
                top: '5%', 
                width: '100%'
            }}>
                <Search/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b22c2cff',
    },
});
