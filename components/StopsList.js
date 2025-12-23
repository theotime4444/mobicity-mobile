import { Divider, List } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getTransportLocationsNearby, getTransportLocation } from '../api/transportLocations';
import { setPoints } from '../store/slice/transportLocation';

const CATEGORY_ICONS = {
  1: 'bus',
  2: 'train',
  3: 'car',
};

export default function StopsList({ search, radius, stopsNb, categoryId, onSelectStop }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { latitude, longitude } = useSelector((state) => state.location);
    const dispatch = useDispatch();
    const stops = useSelector((state) => state.transportLocations.points);

    const getStops = async () => {
			setLoading(true);
			try {
				const data = await getTransportLocationsNearby(
					latitude,
					longitude,
					radius || 5,
					stopsNb,
					categoryId === -1 ? null : categoryId,
					search
				);
				dispatch(setPoints(data));
			} catch (err) {
				console.error(err);
				setError("Erreur lors du chargement des arrêts");
			} finally {
				setLoading(false);
			}
    };

    useEffect(() => {
			getStops();
    }, [latitude, longitude, radius, stopsNb, categoryId, search]);

    if (loading)
			return <ActivityIndicator animating={true}/> ;

    if (error)
			return <Text style={styles.error}>{error}</Text>;

    if (!stops || stops.length === 0)
			return <Text style={{textAlign: 'center', marginTop: 20}}>Aucun arrêt trouvé</Text>;

    return (
			stops.map((stop) => (
				<React.Fragment
					key={stop.id}
				>
					<List.Item
						key={stop.id}
						title={stop.address}
						description={`${(stop.distance * 1000).toFixed(0)} m`}
						left={props => (
							<List.Icon {...props} icon={CATEGORY_ICONS[stop.category.id]} />
						)}
						right={props => (
								<List.Icon {...props} icon="arrow-right-drop-circle-outline" />
						)}
						onPress={() => onSelectStop(stop.id)}
					/>
					<Divider/>
				</React.Fragment>
			))
    );
}

const styles = StyleSheet.create({
  error: { color: 'red', textAlign: 'center', marginTop: 10 }
});