import { StyleSheet, View } from 'react-native';
import TransportMap from '../components/TransportMap';
import BottomPanel from '../components/BottomPanel';
import { useIsFocused } from '@react-navigation/native';
import { useState } from 'react';


export default function Favorites({goToProfile}) {
    const isFocused = useIsFocused();
	const [search, setSearch] = useState('');

    return (
        <View style={styles.container}>
            {isFocused && <TransportMap mode="favorite"/>}     

            <BottomPanel mode="favorite" search={search} goToProfile={goToProfile} />
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