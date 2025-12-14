import { StyleSheet, View, Text } from 'react-native';
import Map from '../components/Map';
import Search from '../components/Search';
import { useMemo } from 'react';
import { useState } from 'react';
import BottomPanel from '../components/BottomPanel'

export default function Stops() {
    const snapPoints = useMemo(() => ['25%', '95%'], []);

    const [stopsNb, setStopsNb] = useState(5);

    return (
        <View style={styles.container}>
            <Map />

            <View
                style={{
                    position: 'absolute',
                    top: '5%',
                    width: '100%',
                }}
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
  search: {
    position: 'absolute',
    top: '5%', 
    width: '100%'
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
});