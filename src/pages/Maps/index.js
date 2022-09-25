import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, PermissionsAndroid, Platform } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { Card, Title, Paragraph, Button, Avatar } from 'react-native-paper'
import { Ionicons } from 'react-native-ionicons'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import RegisterElectropost from '../../pages/RegisterElectropost'
import Geolocation from 'react-native-geolocation-service'
import Electropost from '../../pages/Electropost'
import * as Location from 'expo-location'
import { auth, db } from '../../config/firebase'
import { doc, setDoc, getDoc, getDocs, collection, updateDoc, query, where, DocumentReference } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, updateEmail, updatePassword, signInWithEmailAndPassword } from "firebase/auth"

export default function Maps() {
    const navigation = useNavigation();
    const [register, setRegister] = useState(false);

    const change = () => {
        setRegister(false);
    }

    const auth = getAuth();
    const user = auth.currentUser;

    const [currentLatitude, setCurrentLatitude] = useState('');
    const [currentLongitude, setCurrentLongitude] = useState('');
    const [watchID, setWatchID] = useState(0);

    const callLocation = () => {
        if (Platform.OS === 'ios') {
            getLocation();
        } else {
            const requestLocationPermission = async () => {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Permissão de acesso à localização",
                        message: "Este aplicativo precisa ter acesso a sua localização",
                        buttonPositive: "Permitir",
                        buttonNegative: "Cancelar"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getLocation();
                } else {
                    alert('Permissão de localização negada');
                }
            };
            requestLocationPermission();
        }
    }

    const getLocation = () => {
        console.log("entrou getlocation")
        Geolocation.getCurrentPosition(
            ({ position }) => {
                const currentLatitude = JSON.stringify(position.coords.latitude);
                const currentLongitude = JSON.stringify(position.coords.longitude);
                setCurrentLatitude(currentLatitude);
                setCurrentLongitude(currentLongitude);
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        const watchID = Geolocation.watchPosition((position) => {
            const currentLatitude = JSON.stringify(position.coords.latitude);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            setCurrentLatitude(currentLatitude);
            setCurrentLongitude(currentLongitude);
        });
        setWatchID(watchID);
    }

    const clearLocation = () => {
        Geolocation.clearWatch(watchID);
    }

    function eletropostos() {
        console.log("entrou eletropostos")

    }

    useEffect(() => {
        console.log("Entrou Effect")
        callLocation()
    }, [])

    return (
        <View style={styles.container}>
            {register ? (
                <RegisterElectropost change={change} />
                //<Electropost change={change} />
            ) : (
                <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
                    <View style={styles.cabecalho}>
                        <TextInput
                            style={
                                styles.input}
                            placeholder=" Pesquisar endereço"
                        />
                        <Image style={styles.buttonImagemIconStyle2} source={require('../../assets/pesquisa.png')} />
                    </View>
                    <MapView
                        style={styles.map}
                        provider={MapView.PROVIDER_GOOGLE}
                        region={{
                            latitude: -29.6015984,
                            longitude: -52.1839037,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.015,
                        }}
                    >
                        <Marker coordinate={{
                            latitude: -29.6015984,
                            longitude: -52.1839037,
                        }}
                            image={require('../../assets/marker3.png')}
                        />
                    </MapView>
                    <TouchableOpacity style={styles.button} onPress={() => eletropostos()}>
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
    text2: {
        color: '#515151',
        textAlign: 'center',
        fontSize: 16,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#E0DCDC',
        borderRadius: 5,
        paddingVertical: 2,
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
        paddingVertical: 2,
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
    },
    buttonImagemIconStyle2: {        
        margin: 1,
        height: 30,
        width: 30,
        resizeMode: 'stretch'
    },
    input: {
        height: 30,
        width: 320,
        marginBottom: 5,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
    },
    cabecalho: {
        flexDirection: "row"
    }
})