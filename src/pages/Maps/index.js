import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, } from 'react-native'
import MapView from 'react-native-maps'
import { Card, Title, Paragraph, Button, Avatar } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';
import RegisterElectropost from '../../pages/RegisterElectropost'
import Electropost from '../../pages/Electropost'

export default function Maps() {
    const navigation = useNavigation();
    const [register, setRegister] = useState(false);

    const change = () => {
        setRegister(false);
    }

    return (
        <View style={styles.container}>
            {register ? (
                <RegisterElectropost change={change} />
                //<Electropost change={change} />
            ) : (
                <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
                    <MapView
                        style={styles.map}
                        provider={MapView.PROVIDER_GOOGLE}
                    >
                    </MapView>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Localizar estações mais próximas</Text>
                        <View style={styles.buttonIconSeparator} />
                        <Image style={styles.buttonImagemIconStyle} source={require('../../assets/menuEstacoesProximas.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSecond} onPress={() => setRegister(true)}>
                        <Text style={styles.buttonText}>Cadastrar nova estação de recarga</Text>
                        <View style={styles.buttonIconSeparator} />
                        <Image style={styles.buttonImagemIconStyle} source={require('../../assets/add.png')} />
                    </TouchableOpacity>
                </Animatable.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    map: {
        height: '79%',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerForm: {
        flex: 5,
        backgroundColor: '#FFFFFF',
        paddingStart: '5%',
        paddingTop: '2%',
        paddingEnd: '5%',
        height: '60%'
    },
    text: {
        color: '#515151',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#E0DCDC',
        borderRadius: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    buttonSecond: {
        backgroundColor: '#E0DCDC',
        borderRadius: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
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
    }
})