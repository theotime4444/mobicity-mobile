import { useState } from 'react';
import { Searchbar } from 'react-native-paper';

export default function Search() {
    const [searchQuerry, setSearchQuerry] = useState('');

    return (
        <Searchbar
            placeholder="Rechercher une ville ou un arrêt"
            onChangeText={setSearchQuerry}
            value={searchQuerry}
        />
    );
}