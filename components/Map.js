import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map({
  points = [],           // receive the list of points
  userPosition = null,
  onMarkerPress = null,
}) {

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
        provider="google"
        initialRegion={defaultCenter}
      >
        {points.map(point => (
          <Marker
            key={point.id}
            coordinate={{
              latitude: point.latitude,
              longitude: point.longitude,
            }}
            title={point.name}
            description={point.type}
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
