import { StyleSheet, Text, View, Alert } from 'react-native';
import Login from '../components/Login'
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput, Card } from 'react-native-paper'; 
import { logout, setUser } from '../store/slice/login';
import { updateCurrentUserRequest } from '../api/auth';
import { useState, useEffect } from 'react';
import { clearError } from '../store/slice/error';

export default function Profile() {
    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.login);
    const [isUpdating, setIsUpdating] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const errorMessage = useSelector(state => state.error.error);

    useEffect(() => {
        if (user && !isUpdating) {
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setEmail(user.email || '');
        }
    }, [isUpdating, user]);

    const confirmUpdate = async () => {
        setLoading(true);
        
        const updatedUser = {firstName, lastName, email, password}
        const response = await updateCurrentUserRequest(token, updatedUser);
        
        if (!response) {
            setLoading(false);
            return;
        }
            
        dispatch(setUser({firstName, lastName, email}));
        setIsUpdating(!isUpdating);
        setPassword('');
        setLoading(false);
    };

    if (!token) return <Login/>;

    if (isUpdating) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Modifier mon profil</Text>
                
                <TextInput label="Prénom" value={firstName} onChangeText={setFirstName} style={styles.input} mode="outlined" />
                <TextInput label="Nom" value={lastName} onChangeText={setLastName} style={styles.input} mode="outlined" />
                <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} mode="outlined" keyboardType="email-address" autoCapitalize="none" />
                <TextInput 
                    label="Confirmation mot de passe" 
                    value={password} 
                    onChangeText={setPassword} 
                    secureTextEntry={secureTextEntry} 
                    style={styles.input} 
                    mode="outlined"
                    right={<TextInput.Icon icon="eye" onPress={() => { setSecureTextEntry(!secureTextEntry) ;}} />}
                />
                
                {errorMessage && typeof errorMessage === 'string' && (
                <Text style={styles.error}>{errorMessage}</Text>
                )}

                <Button mode="contained" onPress={confirmUpdate} style={styles.button} loading={loading}>
                    Confirmer
                </Button>
                <Button mode="text" onPress={() => {setIsUpdating(!isUpdating), dispatch(clearError())}} style={styles.button}>
                    Annuler
                </Button>
            </View>
        )
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mon Profil</Text>
            
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Prénom</Text>
                        <Text>{user.firstName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Nom</Text>
                        <Text>{user.lastName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Email</Text>
                        <Text>{user.email}</Text>
                    </View>
                </Card.Content>
            </Card>

            <Button mode="contained" icon="pencil" onPress={() => setIsUpdating(!isUpdating)} style={[styles.button, { marginTop: 30 }]}>
                Modifier le profil
            </Button>
            
            <Button mode="text" icon="logout" onPress={() => dispatch(logout())} style={styles.button} textColor="red">
                Déconnexion
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        padding: 20,
        backgroundColor: '#fff'
    },
    title: { 
        fontSize: 32,
        textAlign: 'center', 
        marginBottom: 30,
        fontWeight: 'bold'
    },
    input: { 
        marginBottom: 10 
    },
    button: { 
        marginTop: 10 
    },
    card: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0'
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    label: {
        fontWeight: 'bold',
        color: '#666'
    },
    error: { color: 'red', textAlign: 'center', marginBottom: 10 }
});