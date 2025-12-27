import { useState } from 'react';
import { Searchbar } from 'react-native-paper';

export default function Search({value, onChange}) {

    return (
        <Searchbar
            placeholder="Rechercher une ville ou un arrêt"
            onChangeText={onChange}
            value={value}
        />
    );
}