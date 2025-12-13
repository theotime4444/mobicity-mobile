import { StyleSheet, View, Text } from 'react-native';
import Map from '../components/Map';
import Search from '../components/Search';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useMemo } from 'react';
import { Chip } from 'react-native-paper';
import { useState } from 'react';

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

            <BottomSheet 
                snapPoints={snapPoints} 
                index={0}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Chip icon="arrow-down-drop-circle-outline" onPress={() => console.log('Pressed')}>
                        Distance
                    </Chip>
                    <Chip mode="outlined" icon="bus" onPress={() => console.log('Pressed')}>
                        Bus
                    </Chip>
                    <Chip mode="outlined" icon="train" onPress={() => console.log('Pressed')}>
                        Train
                    </Chip>
                    <Chip icon="arrow-down-drop-circle-outline" onPress={() => console.log('Pressed')}>
                        {stopsNb} arrêts
                    </Chip>
                </BottomSheetView>
            </BottomSheet>
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