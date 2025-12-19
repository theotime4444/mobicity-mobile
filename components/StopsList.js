import { List } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';

const CATEGORY_ICONS = {
  1: 'bus',
  2: 'train',
  3: 'car',
};

export default function StopsList({stopsNb, categoryId, search, location}) {    
    const [stops, setStops] = useState([]);
    const [loading, setLoading] = useState(true);

    const getStops = async () => {
        //await axios.get(`http://192.168.0.6:3001/transport-locations/nearby?&limit=${stopsNb}&latitude=${location.latitude}&longitude=${location.longitude}`)
        await axios.get("http://192.168.0.6:3001/transport-locations/nearby?&limit=15&latitude=50.4689&longitude=4.8708")
        .then((response) => {
            setStops(response.data);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        getStops();
    }, []);

    if (loading) {
        return (
            <ActivityIndicator animating={true}/>
        )
    }
    else {
        return (
            stops.map((stop) =>
                <List.Item
                    key={stop.id}
                    style={{borderBottomWidth: StyleSheet.hairlineWidth}}
                    title={stop.address}
                    description={(stop.distance * 1000).toFixed(0) + " m"}
                    left={props => <List.Icon {...props} icon={CATEGORY_ICONS[stop.category.id]} />}
                    right={props => <List.Icon {...props} icon="arrow-right-drop-circle-outline"/>}
                />
            )
        );
    }
}