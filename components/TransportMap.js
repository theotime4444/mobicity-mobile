import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';

export default function TransportMap({ 
  points = [],
  onMarkerPress = null,
}) {

  const { latitude, longitude } = useSelector((state) => state.location);
  const userPosition = latitude && longitude ? { latitude, longitude } : null;

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
        region={defaultCenter}
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
              latitude: point.latitude,
              longitude: point.longitude,
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
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    flex: 1,
  },
});