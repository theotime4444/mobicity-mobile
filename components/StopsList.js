import { List } from 'react-native-paper';
import StyleSheet from 'react-native';
import axios from 'axios'


export default function StopsList({stopsNb, categoryId, search, location}) {
    //changer la requete une fois que l'api aura été modifiée pour rechercher en fonction de la localisation
    const getStops = async () => {
        await axios.get(`http://localhost:3001/v1/transport-locations?limit${stopsNb}&categoryId=${categoryId}&search=${search}`)
        .then((response) => {
            //finir requete 
        })
    }

    const stops = [
        {
            id: 'Botteco1',
            name: 'Ottignies écoles de la croix',
            lat: 50.667744,
            lon: 4.580745,
            category: "bus"
        },
        {
            id: 'S8811411',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
    ];
    return (
        //mettre les arrets dans une scrollview pour pouvoir scroll et voir flatlist
        stops.map((stop) => 
            <List.Item
                key={stop.id}
                style={{borderTopWidth: StyleSheet.hairlineWidth}}
                title={stop.name}
                left={props => <List.Icon {...props} icon={stop.category} />}
                right={props => <List.Icon {...props} icon="arrow-right-drop-circle-outline"/>}
            />
        )
    );
}