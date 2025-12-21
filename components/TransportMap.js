import { memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';

const TransportMap = memo(() => {
  const { latitude, longitude } = useSelector((state) => state.location);
  const userPosition = latitude && longitude ? { latitude, longitude } : null;
  const points = useSelector((state => state.transportLocations.points));

const defaultCenter = {
    latitude: userPosition?.latitude || 50.4649,
    longitude: userPosition?.longitude || 4.8650,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

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
        
        {points.map(point => (
          <Marker
            key={point.id}
            coordinate={{
              latitude: Number(point.latitude),
              longitude: Number(point.longitude),
            }}
            title={point.name}
            description={point.type}
            pinColor="red"
            onPress={() => onMarkerPress && onMarkerPress(point)}
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