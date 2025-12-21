import { StyleSheet, View, FlatList } from 'react-native';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef } from 'react';
import { Chip, Text } from 'react-native-paper';
import { useState } from 'react';
import StopsList from './StopsList';
import { ScrollView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';

export default function BottomPanel() {
    const snapPoints = useMemo(() => ['25%', '95%'], []);

    const [stopsNb, setStopsNb] = useState(5);
    const [radius, setRadius] = useState(5);
    const [selectedCategoryId, setSelectedCategoryId] = useState(-1);

    const stopsNbBottomSheetModalRef = useRef(null);
    const radiusBottomSheetModalRef = useRef(null);

    const handlePresentStopNbModalPress = useCallback(() => {
        stopsNbBottomSheetModalRef.current?.present();
    })
    const handlePresentRadiusModalPress = useCallback(() => {
        radiusBottomSheetModalRef.current?.present();
    })

    const toggleCategory = (newId) => {
        setSelectedCategoryId(currentId => (currentId === newId ? -1 : newId));
    };

    return (
        <>
            <BottomSheet 
                snapPoints={snapPoints} 
                index={0}
                enableDynamicSizing={false}
            >
                <BottomSheetScrollView>
                    <ScrollView contentContainerStyle={styles.chipsView} horizontal showsHorizontalScrollIndicator={false}>
                        <Chip icon="arrow-down-drop-circle-outline" onPress={() => handlePresentStopNbModalPress()} selected={true}>
                            {stopsNb} arrêts
                        </Chip>
                        <Chip icon="arrow-down-drop-circle-outline" onPress={() => handlePresentRadiusModalPress()}>
                            Rayon : {radius} km
                        </Chip>
                        <Chip mode={selectedCategoryId === 1 ? 'flat' : 'outlined' } icon="bus" onPress={() => toggleCategory(1)}>
                            Bus
                        </Chip>
                        <Chip mode={selectedCategoryId === 2 ? 'flat' : 'outlined' } icon="train" onPress={() => toggleCategory(2)}>
                            Train
                        </Chip>
                        <Chip mode={selectedCategoryId === 3 ? 'flat' : 'outlined' } icon="car" onPress={() => toggleCategory(3)}>
                            Cambio
                        </Chip>
                    </ScrollView>
                    <StopsList radius={radius} stopsNb={stopsNb} categoryId={selectedCategoryId} />
                </BottomSheetScrollView>
            </BottomSheet>

            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={stopsNbBottomSheetModalRef}
                    enableContentPanningGesture={false}
                >
                    <BottomSheetView>
                        <Text>Nombre d'arrêts à afficher :</Text>
                        <Slider
                            minimumValue={5}
                            maximumValue={50}
                            value={stopsNb}
                            step={5}
                            onSlidingComplete={setStopsNb}
                        />
                    </BottomSheetView>
                </BottomSheetModal>
                <BottomSheetModal
                    ref={radiusBottomSheetModalRef}
                    enableContentPanningGesture={false}
                >
                    <BottomSheetView>
                        <Text>Rayon dans lequel chercher des arrêts :</Text>
                        <Slider
                            minimumValue={5}
                            maximumValue={50}
                            value={radius}
                            step={5}
                            onSlidingComplete={setRadius}
                        />
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </>
    );
}

const styles = StyleSheet.create({
    chipsView: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        columnGap: 3,
    }
});