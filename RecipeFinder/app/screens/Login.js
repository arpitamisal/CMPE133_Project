import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Text, TouchableOpacity, Linking, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        }
        catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your emails!');
        }
        catch (error) {
            console.log(error);
            alert('Registration failed: ' + error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="Padding">
                <TextInput value={email}style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput secureTextEntry={true} value={password}style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
                { loading ? <ActivityIndicator size="large" color="#0000ff" />
                : <>
                    <Button title="Login" onPress={signIn} />
                    <Button title="SignUp" onPress={signUp} />
                </>
                }
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
   
});

export default Login;