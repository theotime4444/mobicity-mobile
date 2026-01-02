import { Searchbar } from 'react-native-paper';

export default function Search({value, onChange}) {
    // création d'une barre de recherche, la valeur de la recherche est passé plus haut
    return (
        <Searchbar
            placeholder="Rechercher une ville ou un arrêt"
            onChangeText={onChange}
            value={value}
        />
    );
}