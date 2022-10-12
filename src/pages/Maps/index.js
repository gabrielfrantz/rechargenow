import React, { useState, useEffect } from 'react'
import Carousel from 'react-native-snap-carousel'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, Modal, Platform, Animated } from 'react-native'
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
    const auth = getAuth();
    const user = auth.currentUser;
    const navigation = useNavigation();
    const [currentLatitude, setCurrentLatitude] = useState(-29.6015984);
    const [currentLongitude, setCurrentLongitude] = useState(-52.1839037);
    const [modalVisible, setModalVisible] = useState(false);
    const [watchID, setWatchID] = useState(0);
    const [location, setLocation] = useState(null);
    const [register, setRegister] = useState(false);
    const change = () => {
        setRegister(false);
    }
    const getLocation = () => {
        (async () => {
            const watchID = await Location.watchPositionAsync({})
            setWatchID(watchID);
        })()
    }

    const getFilter = () => {
        (async () => {
            const electropostsRef = collection(db, "electropost");
            const q = query(electropostsRef, where("local", "==", true));
            console.log(q)
        })()
    }

    function eletropostos() {
        console.log("lista os eletropostos");
        setModalVisible(true);
    }

    /*const permissao = () => {
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
                )
            }
            requestLocationPermission();
        }
    }*/

    function PlaceCard({ }) {
        return <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.buttonText}>Você está vendo algum Card aqui?</Text>
                <View style={styles.buttonIconSeparator} />
                <Image style={styles.buttonImagemIconStyle} source={require('../../assets/menuEstacoesProximas.png')} />
            </View>
        </View>
    }

    async function getPosition() {
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 });
        //console.log(location)
        const latitude = location.coords.latitude
        const longitude = location.coords.longitude
        setCurrentLatitude(latitude);
        setCurrentLongitude(longitude);
        console.log(latitude)
        console.log(longitude)
        getLocation()
        //getFilter()
    }

    useEffect(() => {
        getPosition()
    }, []);

    return (
        <View style={styles.container}>
            {register ? (
                <RegisterElectropost change={change} />
            ) : (
                <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
                    <MapView
                        style={styles.map}
                        provider={MapView.PROVIDER_GOOGLE}
                        region={{
                            latitude: currentLatitude,
                            longitude: currentLongitude,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.015,
                        }}
                    >
                        <Marker coordinate={{
                            latitude: currentLatitude,
                            longitude: currentLongitude
                        }}
                            image={require('../../assets/marker3.png')}
                        />
                    </MapView>

                    <Animated.ScrollView
                        horizontal={true}
                        scrollEventThrottle={1}
                        showsHorizontalScrollIndicator={false}
                        style={styles.ScrollView}
                    >
                        <View style={styles.card}>
                            <Image
                                source={require('../../assets/logo.png')}
                                style={styles.cardImage}
                                resizeMode='cover'
                            />
                            <View style={styles.textContent}>
                                <Text numberOfLines={1} style={styles.cardTitle}>Titulo do CARD</Text>
                                <Text numberOfLines={1} style={styles.cardDescription}>Descrição do CARD</Text>
                            </View>
                        </View>
                    </Animated.ScrollView>
                    <TouchableOpacity style={styles.button} onPress={() => eletropostos()}>
                        <Text style={styles.buttonText}>Localizar estações mais próximas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSecond} onPress={() => setRegister(true)}>
                        <Text style={styles.buttonText}>Cadastrar nova estação de recarga</Text>
                    </TouchableOpacity>
                </Animatable.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    map: {
        height: '79%',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 3 },
        height: 100,
        width: 100,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    containerForm: {
        flex: 5,
        backgroundColor: '#FFFFFF',
        paddingStart: '5%',
        paddingTop: '10%',
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
        height: '7%',
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
        height: '7%',
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