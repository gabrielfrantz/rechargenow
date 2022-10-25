import { React } from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, Modal, Platform, Animated, ScrollView, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ListPlaces from '../../components/ListPlaces'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function Maps() {

    const auth = getAuth();
    const user = auth.currentUser;
    //const navigation = useNavigation();
    const [currentLatitude, setCurrentLatitude] = useState(-29.6015968);
    const [currentLongitude, setCurrentLongitude] = useState(-52.1840375);
    //const [searchLocation, setSearchLocation] = useState('')
    //const [modalVisible, setModalVisible] = useState(false);
    const [watchID, setWatchID] = useState(0);
    //const [location, setLocation] = useState(null);
    const [register, setRegister] = useState(false);
    const [listAllPlaces, setListAllPlaces] = useState(false);
    const [regionCoords, setRegion] = useState({ lat: -29.6015968, lng: -52.1840375 });
    const [marker, setMarker] = useState({ lat: -29.6015968, lng: -52.1840375 });

    const onPress = (data, details) => {
        setRegion(details.geometry.location);
        setMarker(details.geometry.location);
    };

    const change = () => {
        setRegister(false);
    }

    const getLocation = () => {
        (async () => {
            const watchID = await Location.watchPositionAsync({})
            setWatchID(watchID);
        })()
    }

    const eletropostos = () => {
        setListAllPlaces(true);
    }
    async function getPosition() {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status == "granted") {
            let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, maximumAge: 1000 });
            //console.log(location)
            const latitude = location.coords.latitude ? location.coords.latitude : -29.6015968
            const longitude = location.coords.longitude ? location.coords.longitude : -52.1840375
            setRegion({
                latitude: latitude,
                longitude: longitude
            })
            setMarker({
                latitude: latitude,
                longitude: longitude
            })
            setCurrentLatitude(latitude);
            setCurrentLongitude(longitude);
            getLocation()
        }
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
                        loadingEnabled={true}
                        toolbarEnabled={true}
                        zoomControlEnabled={true}
                        region={{
                            latitude: marker.lat ? marker.lat : -29.6015968,
                            longitude: marker.lng ? marker.lng : -52.1840375,
                            latitudeDelta: 0.04864195044303443,
                            longitudeDelta: 0.040142817690068,
                        }}
                    >
                        <Marker coordinate={{
                            latitude: regionCoords.lat ? regionCoords.lat : -29.6015968,
                            longitude: regionCoords.lng ? regionCoords.lng: -52.1840375
                        }}
                        />
                    </MapView>
                    <View style={styles.searchBox}>
                        <GooglePlacesAutocomplete
                            placeholder='Pesquisar endereço'
                            query={{
                                key: 'AIzaSyDXxvmkvJlLP33BSi4upooK7tAVypPeiqQ',
                                language: 'pt-br',
                                components: 'country:bra',
                            }}
                            GooglePlacesDetailsQuery={{
                                fields: 'geometry'
                            }}
                            enablePoweredByContainer={false}
                            fetchDetails={true}
                            styles={{ listView: { height: 100 } }}
                            onPress={onPress}
                        />
                        <Image style={styles.buttonImagemIconStyle2} source={require('../../assets/pesquisa.png')} />
                    </View>
                    {listAllPlaces !== true ? (
                        <View style={styles.scrollView}>
                            <TouchableOpacity
                                onPress={() => eletropostos()}
                                style={[styles.signIn, {
                                    borderColor: '#000',
                                    borderWidth: 1
                                }]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#000'
                                }]}>Mostrar estações mais próximas</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setRegister(true)}
                                style={[styles.signIn, {
                                    borderColor: '#000',
                                    marginTop: 1,
                                    borderWidth: 1
                                }]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#000'
                                }]}>Cadastrar nova estação</Text>
                            </TouchableOpacity>
                        </View>
                    ) : <ListPlaces setListAllPlaces={setListAllPlaces}></ListPlaces>}
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
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 45,
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10
    },
    containerForm: {
        flex: 5,
        backgroundColor: '#FFFFFF',
        paddingStart: '1%',
        paddingTop: '7%',
        paddingEnd: '1%',
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
        marginTop: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
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
        margin: 10,
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
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 17,
        right: 0,
        height: '10%',
        width: '80%',
        backgroundColor: '#E0DCDC',
        marginBottom: 22

    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    signIn: {
        width: '100%',
        padding: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})