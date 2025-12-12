import { BottomNavigation, PaperProvider } from 'react-native-paper';
import { StyleSheet, View, SafeAreaView, SafeAreaViewBase } from 'react-native';
import TabNavigator from './components/TabNavigator';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function App() {
    return (
        <PaperProvider>
            <SafeAreaProvider>
                <NavigationContainer>
                    <StatusBar backgroundColor={'#FFC4B6'} barStyle='dark'/> 
                    <TabNavigator/>
                </NavigationContainer>
            </SafeAreaProvider>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
