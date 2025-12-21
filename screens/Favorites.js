import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransportMap from '../components/TransportMap';
import Search from '../components/Search';
import BottomPanel from '../components/BottomPanel';
import { useIsFocused } from '@react-navigation/native';

export default function Favorites() {
    const isFocused = useIsFocused();

    const favoritePoints = [
        {
            id: 1,
            name: "Gembloux",
            latitude:50.5602, 
            longitude:4.6918,
            type: "test"
        },
        {
            id: 2,
            name: "Test Bruxelles",
            latitude: 50.8477,
            longitude: 4.3572,
            type: "test"
        }
    ];

    return (
        <View style={styles.container}>
            {isFocused && <TransportMap />}        

            <SafeAreaView style={styles.searchView}>
                <Search/>
            </SafeAreaView>

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
  searchView: {
      position: 'absolute',
      top: 5,
      width: '95%',
      alignSelf: 'center',
  }
});