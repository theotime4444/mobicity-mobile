import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransportMap from '../components/TransportMap';
import Search from '../components/Search';
import BottomPanel from '../components/BottomPanel';

export default function Favorites() {

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
            <TransportMap 
                points={favoritePoints}
            />

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
    searchView: {
        position: 'absolute',
        top: 5,
        width: '95%',
        alignSelf: 'center',
    }
});