import { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedStop } from '../store/slice/selectedStop';

const TransportMap = memo(({mode}) => {
  const { latitude, longitude } = useSelector((state) => state.location);
  const userPosition = latitude && longitude ? { latitude, longitude } : null;

  const points = useSelector((state) => mode === 'favorite' ? state.transportLocations.favoritePoints : state.transportLocations.points);
  const selectedStopId = useSelector((state) => state.selectedStop.selectedStopId);
  const dispatch = useDispatch();

const defaultCenter = {
    latitude: userPosition?.latitude || 50.4649,
    longitude: userPosition?.longitude || 4.8650,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const displayPoints = useMemo(() => {
    if (!selectedStopId) {
      return points;
    }
    return points.filter(point => point.id === selectedStopId);
  }, [points, selectedStopId])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={defaultCenter}
        showsCompass={false}
        showsBuildings={false}
        showsPointsOfInterest={false}
        showsIndoors={false}
        customMapStyle={cleanMapStyle}
      >
        {userPosition && (
          <Marker 
            coordinate={userPosition}
            title="Votre position"
            pinColor="blue"
          />
        )}
        
        {displayPoints.map(point => (
          <Marker
            key={point.id}
            coordinate={{
              latitude: Number(point.latitude),
              longitude: Number(point.longitude),
            }}
            title={point.address}
            pinColor={"red"}
            onPress={() => dispatch(setSelectedStop(point.id))}
          />
        ))}
      </MapView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    flex: 1,
  },
});

const cleanMapStyle = [
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "transit",
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }]
  }
];

export default TransportMap;