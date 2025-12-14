import { StyleSheet, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useMemo } from 'react';
import { Chip, Text } from 'react-native-paper';
import { useState } from 'react';
import StopsList from './StopsList';

export default function BottomPanel() {
    const snapPoints = useMemo(() => ['25%', '95%'], []);

    const [stopsNb, setStopsNb] = useState(5);

    return (
        <BottomSheet 
            snapPoints={snapPoints} 
            index={0}
        >
            <BottomSheetView>
                <Text variant="headlineMedium" style={{paddingLeft: 20}}>Arrêts</Text>
                {/*mettre une scrollview horizontale avec une flatlist peut etre*/}
                <View style={styles.chipsView}>
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
                </View>
                
                <View>
                    <StopsList/>
                </View>
            </BottomSheetView>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    chipsView: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexWrap: 'wrap',
        columnGap: 3,
    }
});