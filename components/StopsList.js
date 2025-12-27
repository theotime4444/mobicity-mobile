import { Divider, List } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, Surface, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getTransportLocationsNearby, getFavoriteLocation } from '../api/transportLocations';
import { setPoints, setFavoritePoints } from '../store/slice/transportLocations';
import { setSelectedStop } from '../store/slice/selectedStop';

const CATEGORY_ICONS = {
  1: 'bus',
  2: 'train',
  3: 'car',
};

export default function StopsList({ search, radius, stopsNb, categoryId, mode, goToProfile}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { latitude, longitude } = useSelector(state => state.location);
	const token = useSelector(state => state.login.token);
    const stops = useSelector((state) => mode === 'favorite' ? state.transportLocations.favoritePoints : state.transportLocations.points);

	if (!token && mode === "favorite") {
        return (
            <Surface style={styles.emptyContainer}>
                <Text style={styles.emptyTitle} >Connectez-vous pour voir vos favoris.</Text>
                <Button mode="contained" onPress={goToProfile}>
                    Se connecter
                </Button>
            </Surface>
        );
    }

    const getStops = async () => {
		setLoading(true);
		try {
			if (mode === 'favorite'){
				const favoriteData = await getFavoriteLocation(token)
				dispatch(setFavoritePoints(favoriteData || []));
			} else {
				const data = await getTransportLocationsNearby(
					latitude,
					longitude,
					radius || 5,
					stopsNb,
					categoryId === -1 ? null : categoryId,
					search
				);
				dispatch(setPoints(data || []));
			}
		} catch (err) {
			console.error(err);
			setError("Erreur lors du chargement des arrêts");
		} finally {
			setLoading(false);
		}
    };

    useEffect(() => {
		if (mode === 'favorite' && !token) return;

		getStops();
    }, [latitude, longitude, radius, stopsNb, categoryId, search, mode, token]);

    if (loading) return <ActivityIndicator animating={true}/> ;

    if (error) return <Text style={styles.error}>{error}</Text>;

    if (!stops || stops.length === 0) 
		return (
			<Text style={{textAlign: 'center', marginTop: 20}}>
				{mode === 'favorite' ? "Aucun favori enregistré" : "Aucun arrêt trouvé"}
			</Text>
		);

    return (
		stops.map((stop) => (
			<React.Fragment key={stop.id}>
				<List.Item
					key={stop.id}
					title={stop.address}
					description={ stop.distance ? `${(stop.distance * 1000).toFixed(0)} m` : ""}
					left={props => (<List.Icon {...props} icon={CATEGORY_ICONS[stop.category.id]} />)}
					right={props => (<List.Icon {...props} icon="arrow-right-drop-circle-outline" />)}
					onPress={() => dispatch(setSelectedStop(stop.id))}
				/>
				<Divider/>
			</React.Fragment>
		))
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    loginBtn: {
        paddingHorizontal: 20,
        borderRadius: 25,
    }
});