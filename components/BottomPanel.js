import { StyleSheet, View, FlatList } from 'react-native';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { useMemo } from 'react';
import { Chip, Text } from 'react-native-paper';
import { useState } from 'react';
import StopsList from './StopsList';

export default function BottomPanel() {
    const snapPoints = useMemo(() => ['25%', '95%'], []);

    const [stopsNb, setStopsNb] = useState(5);

    const [selectedCategoryId, setSelectedCategoryId] = useState(-1);

    const toggleCategory = (newId) => {
        setSelectedCategoryId(currentId => (currentId === newId ? -1 : newId));
    };

    return (
        <BottomSheet 
            snapPoints={snapPoints} 
            index={0}
            enableDynamicSizing={false}
        >
            
            <BottomSheetScrollView>
                <View style={styles.chipsView}>
                {/*mettre une scrollview horizontale avec une flatlist peut etre*/}
                    <Chip icon="arrow-down-drop-circle-outline" onPress={() => console.log('Pressed')}>
                        Distance
                    </Chip>
                    <Chip mode={selectedCategoryId === 1 ? 'flat' : 'outlined' } icon="bus" onPress={() => toggleCategory(1)}>
                        Bus
                    </Chip>
                    <Chip mode={selectedCategoryId === 2 ? 'flat' : 'outlined' } icon="train" onPress={() => toggleCategory(2)}>
                        Train
                    </Chip>
                    <Chip icon="arrow-down-drop-circle-outline" onPress={() => console.log('Pressed')} selected={true}>
                        {stopsNb} arrêts
                    </Chip>
                </View>
                
                <StopsList stopsNb={stopsNb} categoryId={selectedCategoryId}/>
                
            </BottomSheetScrollView>
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
        flexWrap: 'wrap',
        columnGap: 3,
    }
});