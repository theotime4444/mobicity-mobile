import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Favorites() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>Page favorits !</Text>
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