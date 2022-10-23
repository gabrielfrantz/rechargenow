import { React } from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, Modal, Platform, Linking, Animated, ScrollView, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { Ionicons } from 'react-native-ionicons'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import RegisterElectropost from '../../pages/RegisterElectropost'
import Geolocation from 'react-native-geolocation-service'
import Electropost from '../../pages/Electropost'
import * as Location from 'expo-location'
import RegisterVehicles from '../../pages/RegisterVehicles'
import Maps from '../../pages/Maps'
import { auth, db } from '../../config/firebase'
import { doc, setDoc, getDoc, getDocs, collection, updateDoc, query, where, DocumentReference } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, updateEmail, updatePassword, signInWithEmailAndPassword } from "firebase/auth"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ListPlaces from '../../components/ListPlaces'
import DropDownPicker from 'react-native-dropdown-picker'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function Travel() {

  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [currentLatitude, setCurrentLatitude] = useState(-29.6015968);
  const [currentLongitude, setCurrentLongitude] = useState(-52.1840375);
  const [searchLocation, setSearchLocation] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [watchID, setWatchID] = useState(0);
  const [location, setLocation] = useState(null);
  const [register, setRegister] = useState(false);
  const [listAllPlaces, setListAllPlaces] = useState(false);
  const [regionCoords, setRegion] = useState({ lat: -29.6015968, lng: -52.1840375 });
  const [marker, setMarker] = useState({ lat: -29.6015968, lng: -52.1840375 });

  function limpar() {
    console.log("limpa origem e destino e veiculo")
  }

  DropDownPicker.setListMode("SCROLLVIEW");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(['']);
  const [items, setItems] = useState([{ label: 'XC 60', value: 'XC 60' }]);
  const [origem, setOrigem] = useState('')
  const [destino, setDestino] = useState('')

  const onPress = (data, details) => {
    setRegion(details.geometry.location);
    setMarker(details.geometry.location);
    console.log(data.description)
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

  const viagem = () => {
    console.log("realiza viagem");
    let lat = -29.6838274;
    let lon = -52.3336681;
    let lat2 = -29.6466509;
    let lon2 = -52.194076;
    let lat3 = -29.6420082;
    let lon3 = -52.2007395;
    if (Platform === "android" || "web") {
      let url =
        `https://www.google.com/maps/dir/?api=1&origin=` +
        -29.6015968 +
        `,` +
        -52.1840375 +
        `&destination=` +
        lat +
        `,` +
        lon +
        `&waypoints=` +
        lat3 +
        `,` +
        lon3 +
        `|` +
        lat2 +
        `,` +
        lon2 +
        `&travelmode=driving`
        ;
      Linking.openURL(url)
      console.log(url)
    }
  };

  async function getPosition() {
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 });
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
    //console.log(regionCoords)
    //console.log(marker)
    getLocation()
  }
  useEffect(() => {
    getPosition()
  }, []);

  return (
    <View style={styles.container}>
      {register ? (
        <RegisterElectropost change={change} setRegister={setRegister} />
      ) : (
        <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
          <MapView
            style={styles.map}
            provider={MapView.PROVIDER_GOOGLE}
            loadingEnabled={true}
            toolbarEnabled={true}
            zoomControlEnabled={true}
            region={{
              latitude: regionCoords.lat,
              longitude: regionCoords.lng,
              latitudeDelta: 0.04864195044303443,
              longitudeDelta: 0.040142817690068,
            }}
          >
            <Marker coordinate={{
              latitude: marker.lat,
              longitude: marker.lng
            }}
            />
          </MapView>
          <View style={styles.searchBox}>
            <GooglePlacesAutocomplete
              placeholder='Pesquisar endereço de origem'
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
          </View>
          <View style={styles.searchBox2}>
            <GooglePlacesAutocomplete
              placeholder='Pesquisar endereço de destino'
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
          </View>
          <View style={styles.searchBox3}>
            <DropDownPicker
              style={styles.dropdown}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Selecione um veículo"
              placeholderStyle={styles.placeholderStyles}
              multiple={true}
              mode="BADGE"
              badgeDotColors={["#e76f51"]}
            />
          </View>
          <View style={styles.scrollView}>
            <TouchableOpacity
              onPress={() => viagem()}
              style={[styles.signIn, {
                borderColor: '#000',
                borderWidth: 1
              }]}
            >
              <Text style={[styles.textSign, {
                color: '#000'
              }]}>Traçar rota de viagem</Text>
            </TouchableOpacity>
          </View>
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
    //height: '10%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 5,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10
  },
  searchBox2: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 110,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 5,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10
  },
  searchBox3: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 175,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 5,
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
    top: 240,
    left: 100,
    height: '5%',
    width: '50%',
    backgroundColor: '#E0DCDC',
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
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    height: 50,
    borderRadius: 5,
  },
  placeholderStyles: {
    color: "#515151",
    textAlign: 'center',
    fontSize: 14
  },
})