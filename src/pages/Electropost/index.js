import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'

export default function Electropost() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
                <Text style={styles.title}>Frantz House</Text>
                <Text style={styles.subText}>Rua Brígida Fagundes, nº. 81, Bairro Morsch, RS, 95800-000</Text>
                <Text style={styles.subText}>________________________________________________</Text>
                <Text style={styles.text}>
                    <Image style={styles.buttonImagemIconStyle} source={require('../../assets/plug.png')} />
                    Plugues:</Text>
                <Text style={styles.text}>
                    <Image style={styles.buttonImagemIconStyle} source={require('../../assets/potencia.png')} />
                    Potência:</Text>
                <Text style={styles.text}>
                    <Image style={styles.buttonImagemIconStyle} source={require('../../assets/relogio.png')} />
                    Horários:</Text>
                <Text style={styles.text}>
                    <Image style={styles.buttonImagemIconStyle} source={require('../../assets/distancia.png')} />
                    Distância:</Text>
                <Text style={styles.text}>
                    <Image style={styles.buttonImagemIconStyle} source={require('../../assets/telefone.png')} />
                    Contato:</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')} activeOpacity={0.5}>
                    <Text style={styles.buttonText}>Traçar Rota</Text>
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
    containerForm: {
        flex: 2,
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
        textAlign: 'left',
        fontSize: 16,
        marginTop: 25
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
        marginTop: 70
    },
    buttonText: {
        fontSize: 20,
        color: '#000000'
    },
    textIcon: {
        fontSize: 20,
        color: '#000000'
    },
    buttonIconSeparator: {
        backgroundColor: '#000000'
    },
    buttonImagemIconStyle: {
        height: 20,
        width: 20,
        marginTop: 25

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
    }
})