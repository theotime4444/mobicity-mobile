import { StyleSheet, Text, View } from 'react-native';
import Login from '../components/Login'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import { logout } from '../store/slice/login';

export default function Profile() {
    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.login);
    
    if (!token) return <Login/>;
    
    return (
        <View style={styles.container}>
            <Text>Bienvenue sur votre page profil</Text>
            <Text>Prénom : {user.firstName}</Text>
            <Text>Nom : {user.lastName}</Text>
            <Text>Email : {user.email}</Text>
            <Button onPress={() => dispatch(logout())}>Déconnexion</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});