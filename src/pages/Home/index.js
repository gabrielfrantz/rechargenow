import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
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
                <Image style={styles.buttonImagem} source={require('../../assets/banner.png')} />
                <Text style={styles.textSlogan}>Localize as estações</Text>
                <Text style={styles.textSlogan}>de recarga</Text>
                <Text style={styles.textSloganFinal}>mais próximas de você</Text>
                <TouchableOpacity style={styles.buttonAutenticar} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Autenticar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRegistrar} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    containerLogo: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm: {
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#515151',
        textAlign: 'center',
        fontSize: 16
    },
    textSlogan: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    textSloganFinal: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 50
    },
    buttonAutenticar: {
        backgroundColor: '#E0DCDC',
        borderRadius: 5,
        paddingVertical: 10,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    buttonRegistrar: {
        backgroundColor: '#E0DCDC',
        borderRadius: 5,
        paddingVertical: 10,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 50
    },
    buttonText: {
        fontSize: 20,
        color: '#000000'
    },
    buttonImagem: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60
    },
})