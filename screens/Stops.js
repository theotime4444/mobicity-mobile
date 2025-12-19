import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper'

import TransportMap from '../components/TransportMap'; 
import Search from '../components/Search';
import { useMemo } from 'react';
import { useState } from 'react';
import BottomPanel from '../components/BottomPanel'

import { useSelector, useDispatch } from 'react-redux';
import { fetchLocationRetry } from '../store/slice/location';


export default function Stops() {
    const snapPoints = useMemo(() => ['25%', '95%'], []);
    const [stopsNb, setStopsNb] = useState(5);

    const { isLoading, error } = useSelector(state => state.location); 
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            {isLoading && <Text style={styles.loadingMessage}>Chargement position...</Text>}
            
            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Erreur: {error}</Text>
                    <Button 
                        mode="contained" 
                        onPress={() => dispatch(fetchLocationRetry())}>
                        Relancer la recherche de position
                    </Button>
                    {/* 💡 NOUVEAU MESSAGE D'AIDE CLAIR */}
                    {error.includes("refusée") && (
                        <Text style={styles.tipText}>
                            Veuillez accorder les permission de localisation dans le paramètres.
                        </Text>
                    )}
                </View>
            )}

            <TransportMap />

            <View
                style={styles.searchContainer} 
            >
                <Search />
            </View>

            <BottomPanel/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: '5%', 
    width: '100%'
  },
  loadingMessage: {
    position: 'absolute', 
    zIndex: 100, 
    top: 100, 
    left: 20
  },
  errorContainer: {
    position: 'absolute',
    zIndex: 100,
    top: 100,
    left: 20,
    right: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },tipText: {
    marginTop: 10,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  }
});