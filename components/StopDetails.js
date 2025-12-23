import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { getTransportLocation } from '../api/transportLocations';

export default function StopDetails({ stopId }) {
  const [loading, setLoading] = useState(true);
  const [stop, setStop] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStop = async () => {
      try {
        const data = await getTransportLocation(stopId);
        setStop(data);
      } catch (err) {
        setError("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchStop();
  }, [stopId]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  return (
    <>
      <Text variant="titleLarge">{stop.address}</Text>
      <Text>Latitude: {stop.latitude}</Text>
      <Text>Longitude: {stop.longitude}</Text>
    </>
  );
}
