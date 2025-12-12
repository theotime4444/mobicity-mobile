import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Favorites() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>A Page 2</Text>
            <Button title="Go to A" onPress={() => navigation.navigate('A')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b22c2cff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});