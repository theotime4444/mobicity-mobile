import { BottomNavigation, PaperProvider } from 'react-native-paper';
import { StyleSheet, View, SafeAreaView, SafeAreaViewBase } from 'react-native';
import TabNavigator from './components/TabNavigator';
import NavTest from './components/NavTest'

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function App() {
    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor={'#FFC4B6'} barStyle='dark'/> 
            <View style={styles.container}>
                <TabNavigator/>
            </View>

        </SafeAreaProvider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
