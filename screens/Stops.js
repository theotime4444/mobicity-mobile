import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Stops() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Page arrêts !</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c0459dff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});