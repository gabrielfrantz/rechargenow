import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword, getAuth, signInWithGoogleAsync } from 'firebase/auth';
import { auth, db } from '../../config/firebase'
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore'

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('gabifrantz@gmail.com')
    const [password, setPassword] = useState('gabriel123')
    
    async function handleSignIn() {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(email)
                console.log(password)
                console.log("Login efetuado com sucesso! ")
                navigation.navigate('Menu')
            })
            .catch(error => console.log(error.message))
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="flipInX"
                    source={require('../../assets/logo.png')}
                    style={{ width: '90%' }}
                    resizeMode="contain"
                />
            </View>

            <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
                <Text style={styles.title}>Bem-vindo(a)!</Text>
                <Text style={styles.subText}>E-mail</Text>
                <TextInput
                    style={
                        styles.input
                    }
                    value={email}
                    onChangeText={value => setEmail(value)}
                />
                <Text style={styles.subText}>Senha</Text>
                <TextInput
                    style={
                        styles.input}
                    value={password}
                    onChangeText={value => setPassword(value)}
                    secureTextEntry={true}
                />
                <Text style={styles.text}>Esqueceu sua senha?</Text>
                <TouchableOpacity style={styles.buttonSecond}>
                    <Text style={styles.textBold}>Redefina aqui!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => handleSignIn()}>Autenticar</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Ainda não possui cadastro?</Text>
                <TouchableOpacity style={styles.buttonSecond} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.textBold}>Registre-se aqui!</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    containerLogo: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm: {
        flex: 6,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingTop: '10%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 56,
        textAlign: 'center'
    },
    text: {
        color: '#515151',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10
    },
    subText: {
        color: '#515151',
        textAlign: 'left',
        fontSize: 16,
        marginTop: 10
    },
    textBold: {
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    },
    button: {
        backgroundColor: '#E0DCDC',
        borderRadius: 5,
        paddingVertical: 10,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60
    },
    buttonSecond: {
        borderRadius: 5,
        paddingVertical: 10,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#000000'
    },
    input: {
        height: 50,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        marginTop: 10,
    },
    erro: {
        alignSelf: 'flex-start',
        color: '#FF375B',
        marginBottom: 8
    }
})