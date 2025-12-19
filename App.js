import 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { PaperProvider} from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import TabNavigator from './components/TabNavigator';

import { Provider } from 'react-redux';
import { store } from './store/store.js';

export default function App() {
  
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <PaperProvider>
            <NavigationContainer>
              <StatusBar backgroundColor="#FFC4B6" style='light'/>
              <TabNavigator />
            </NavigationContainer>
          </PaperProvider>
        </BottomSheetModalProvider>
    </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});
