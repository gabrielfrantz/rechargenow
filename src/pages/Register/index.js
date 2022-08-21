import { React } from 'react'
import { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { auth, db } from '../../config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import * as Expo from 'expo-google-sign-in'
import * as Google from 'expo-auth-session'


export default function Register() {
    const navigation = useNavigation();
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSignIn() {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                if (userCredential && userCredential.user) {
                    const user = userCredential.user
                    console.log(nome)
                    console.log(email)
                    console.log(password)
                    console.log("Usuário cadastrado com sucesso! " + user.uid)
                    setDoc(doc(db, "user", user.uid), {
                        nome: nome,
                        email: email,
                        password: password
                    })
                        .catch(error => console.log(error.message))
                }
            })
    }

    async function handleSignInGoogle() {
        const config = {
            androidClientId: '153121752067-mbj0ja30r9lna6o73tai9vdojsmrdo6k.apps.googleusercontent.com',
            scopes: ['profile', 'email']
        };

        Google
            .loadAsync(config)
            .then((result) => {
                const { type, user } = result

                if (type === 'sucess') {
                    const { email, name } = user
                }
            })
            .catch(error => {
                console.log(error)
            })
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
                <Text style={styles.subText}>Nome</Text>
                <TextInput
                    style={
                        styles.input
                    }
                    value={nome}
                    onChangeText={value => setNome(value)}
                />
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
                <TouchableOpacity style={styles.button} onPress={() => handleSignIn()}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonGoogle} onPress={() => handleSignInGoogle()}>
                    <Text style={styles.buttonText}>Registrar com Google  </Text>
                    <View style={styles.buttonIconSeparator} />
                    <Image style={styles.buttonImagemIconStyle} source={require('../../assets/google.png')} />
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
        marginTop: 28,
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
        fontSize: 16
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
        marginTop: 40
    },
    buttonGoogle: {
        backgroundColor: '#E0DCDC',
        borderRadius: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    buttonText: {
        fontSize: 20,
        color: '#000000'
    },
    buttonIconSeparator: {
        backgroundColor: '#000000'
    },
    buttonImagemIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch'
    },
    input: {
        height: 50,
        marginBottom: 12,
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