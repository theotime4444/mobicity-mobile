import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserRequest, loginRequest, registerRequest } from '../api/auth';
import { setLoginSucces, setLoginError, setUser } from '../store/slice/login';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
	

    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [secureTextEntry, setSecureTextEntry] = useState(true);

    const dispatch = useDispatch();
    const error = useSelector(state => state.login.error);

    const auth = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;;
        const passwordRegex = /^(?=.{6,})[^'"\\;*\-]*$/;
        const listeNoire = ` ' " \\ ; * - `;

        if (!emailRegex.test(email)){
            dispatch(setLoginError("Veuillez utilisez une adresse email valide."));
            return;
        }

        if (!passwordRegex.test(password)) {
            dispatch(setLoginError("Le mot de passe doit contenir au moins 6 caractères. \n Il ne peux pas contenir : " + listeNoire));
            return;
        }

        setLoading(true);
		setSuccessMessage('');
        try {
            if (isLogin) {
                const data = await loginRequest(email, password);
                dispatch(setLoginSucces(data.token));
                const user = await currentUserRequest(data.token)
                dispatch(setUser(user))
            } else {
                await registerRequest(firstName, lastName, email, password );
                setSuccessMessage("Compte créé avec succès ! Connectez-vous.");
				dispatch(setLoginError(null));
				setIsLogin(true);
            }
        } catch (err) {
            setPassword('');

            let message = "Une erreur est survenue.";
            
            if (err.response?.status === 401) {
                message = "Email ou mot de passe incorrect.";
            } else if (err.response?.data?.error) {
                message = err.response.data.error;
            }
            dispatch(setLoginError(message));
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge" style={styles.title}>
                {isLogin ? 'Connexion' : 'Créer un compte'}
            </Text>

            {!isLogin && (
                <>
                    <TextInput label="Prénom" value={firstName} onChangeText={setFirstName} mode="outlined" style={styles.input} />
                    <TextInput label="Nom" value={lastName} onChangeText={setLastName} mode="outlined" style={styles.input} />
                </>
            )}

            <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" style={styles.input} keyboardType="email-address" autoCapitalize="none" />
            <TextInput label="Mot de passe" value={password} onChangeText={setPassword} mode="outlined" secureTextEntry={secureTextEntry} style={styles.input} right={<TextInput.Icon icon="eye" onPress={() => { setSecureTextEntry(!secureTextEntry) ;}} />}/>
			
			{successMessage !== '' && (
				<View style={styles.successContainer}>
					<Text style={styles.successText}>{successMessage}</Text>
				</View>
			)}

            {error && typeof error === 'string' && (
                <Text style={styles.error}>{error}</Text>
            )}

            <Button mode="contained" onPress={auth} loading={loading} style={styles.button}>
                {isLogin ? 'Se connecter' : "S'inscrire"}
            </Button>

            <Button mode="text" onPress={() => setIsLogin(!isLogin)} style={styles.button}>
                {isLogin ? "Pas de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { textAlign: 'center', marginBottom: 30 },
    input: { marginBottom: 10 },
    button: { marginTop: 10 },
    error: { color: 'red', textAlign: 'center', marginBottom: 10 }
});