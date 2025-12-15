import { List } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';
import axios from 'axios'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';


export default function StopsList({stopsNb, categoryId, search, location}) {
    //changer la requete une fois que l'api aura été modifiée pour rechercher en fonction de la localisation
    const getStops = async () => {
        await axios.get(`http://localhost:3001/v1/transport-locations?limit=${stopsNb}&categoryId=${categoryId}&search=${search}`)
        .then((response) => {
            setStops(response.data.results); 
        })
    }

    useEffect(() => {
        getStops();
    }, []);

    const [stops, setStops] = useState([
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
        {
            id: 'sdfg',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'rf',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'cd',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'red',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'tyg',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'uyt',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'vbn',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: '^^',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'ç',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'x',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'i',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'l',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'c',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'h',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'd',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'v',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'dd',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
        {
            id: 'a',
            name: 'Etterbeek',
            lat: 50.822191,
            lon: 4.389517,
            category: "train"
        },
    ]);

    return (
        
        stops.map((stop) => 
        <List.Item
            key={stop.id}
            style={{borderBottomWidth: StyleSheet.hairlineWidth}}
            title={stop.name}
            left={props => <List.Icon {...props} icon={stop.category} />}
            right={props => <List.Icon {...props} icon="arrow-right-drop-circle-outline"/>}
        />
        )
    );
}