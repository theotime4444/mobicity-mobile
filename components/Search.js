import * as React from 'react';
import { Searchbar } from 'react-native-paper';

export default function Search() {
    const [searchQuerry, setSearchQuerry] = React.useState('');

    return (
        <Searchbar
            placeholder="Rechercher une ville ou un arrêt"
            onChangeText={setSearchQuerry}
            value={searchQuerry}
        />
    );
}