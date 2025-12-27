import { useState, useMemo, useRef, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, {
	BottomSheetModal,
  	BottomSheetModalProvider,
  	BottomSheetScrollView,
  	BottomSheetView
} from '@gorhom/bottom-sheet';
import { Chip, Text, IconButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';

import StopsList from './StopsList';
import StopDetails from './StopDetails';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedStop } from '../store/slice/selectedStop';

export default function BottomPanel({mode, search, goToProfile}) {
  const snapPoints = useMemo(() => ['25%', '50%', '95%'], []);
  const dispatch = useDispatch();

  const [stopsNb, setStopsNb] = useState(5);
  const [radius, setRadius] = useState(5);
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
  const selectedStopId = useSelector((state => state.selectedStop.selectedStopId))

  const stopsNbBottomSheetModalRef = useRef(null);
  const radiusBottomSheetModalRef = useRef(null);

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

          {selectedStopId && (
            <IconButton
              icon="arrow-left"
              onPress={() => dispatch(clearSelectedStop())}
            />
          )}

          {!selectedStopId && (
            <ScrollView
							contentContainerStyle={styles.chipsView}
							horizontal
							nestedScrollEnabled
							showsHorizontalScrollIndicator={false}
            >
							<Chip 
								icon="arrow-down-drop-circle-outline"
								onPress={() => stopsNbBottomSheetModalRef.current?.present()}
							>
								{stopsNb} arrêts
							</Chip>
							<Chip
								icon="arrow-down-drop-circle-outline"
								onPress={() => radiusBottomSheetModalRef.current?.present()}
							>
								Rayon : {radius} km
							</Chip>
							<Chip
								mode={selectedCategoryId === 1 ? 'flat' : 'outlined'}
								icon="bus"
								onPress={() => toggleCategory(1)}
							>
								Bus
							</Chip>
							<Chip
								mode={selectedCategoryId === 2 ? 'flat' : 'outlined'}
								icon="train"
								onPress={() => toggleCategory(2)}
							>
								Train
							</Chip>
							<Chip
								mode={selectedCategoryId === 3 ? 'flat' : 'outlined'}
								icon="car"
								onPress={() => toggleCategory(3)}
							>
								Cambio
							</Chip>
						</ScrollView>
          )}

          {selectedStopId ? (
            <StopDetails stopId={selectedStopId} mode={mode} />
          ) : (
            <StopsList
              search={search}
              radius={radius}
              stopsNb={stopsNb}
              categoryId={selectedCategoryId}
              mode={mode}
              goToProfile={goToProfile}
            />
          )}

        </BottomSheetScrollView>
      </BottomSheet>

      <BottomSheetModalProvider>
        <BottomSheetModal
					ref={stopsNbBottomSheetModalRef}
					enableContentPanningGesture={false}
					style={styles.bottomSheeetModalShadow}
				>
          <BottomSheetView>
            <Text>Nombre d'arrêts à afficher dans la liste :</Text>
            <Slider
							minimumValue={5}
							maximumValue={50}
							step={5}
							value={stopsNb}
							onSlidingComplete={setStopsNb}
            />
          </BottomSheetView>
        </BottomSheetModal>

        <BottomSheetModal
					ref={radiusBottomSheetModalRef}
					enableContentPanningGesture={false}
					style={styles.bottomSheeetModalShadow}
				>
          <BottomSheetView>
            <Text>Rayon dans lequel chercher des arrêts :</Text>
            <Slider
              minimumValue={5}
              maximumValue={50}
              step={5}
              value={radius}
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
    },
    bottomSheeetModalShadow: {
        borderWidth: 0,
        borderTopLeftRadius:15,
        borderTopRightRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});
