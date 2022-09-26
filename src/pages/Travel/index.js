import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, PermissionsAndroid, Platform, ScrollView } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { Card, Title, Paragraph, Button, Avatar } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import RegisterElectropost from '../../pages/RegisterElectropost'
import Geolocation from 'react-native-geolocation-service'
import Electropost from '../../pages/Electropost'
import * as Location from 'expo-location'
import RegisterVehicles from '../../pages/RegisterVehicles'
import Maps from '../../pages/Maps'
import { auth, db } from '../../config/firebase'
import { doc, setDoc, getDoc, getDocs, collection, updateDoc, query, where, DocumentReference } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, updateEmail, updatePassword, signInWithEmailAndPassword } from "firebase/auth"
import DropDownPicker from 'react-native-dropdown-picker'

export default function Travel() {

  function limpar() {
    setOrigem({ origem: '' });
    setDestino({ destino: '' });
    setVeiculo({ veiculo: '' });
  }

  const [origem, setOrigem] = useState('')
  const [destino, setDestino] = useState('')
  const [veiculo, setVeiculo] = useState('')

  useEffect(() => {
    console.log("entrou effect travel-veiculos")
    carregar()
  }, [])

  async function carregar() {
    console.log("carregar veiculos")
    const docSnap = await getDoc(doc(db, "vehicles", user.id));
    if (user.id = docSnap.id) {
      setCarro(docSnap.data());
      console.log(docSnap.data().plugues[0])
      console.log("mandou tudo")
    } else {
      global.texto = "Nenhum veículo cadastrado!"
    }
  }

  DropDownPicker.setListMode("SCROLLVIEW");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(['Tipo 2']);
  const [items, setItems] = useState([
      { label: 'CHAdeMO', value: 'CHAdeMO' },
      { label: 'CCS 1', value: 'CCS 1' },
      { label: 'CCS 2', value: 'CCS 2' },
      { label: 'GB/T', value: 'GB/T' },
      { label: 'Tipo 1', value: 'Tipo 1' },
      { label: 'Tipo 2', value: 'Tipo 2' }
  ]);

  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>

        <Text style={styles.text}>Origem</Text>
        <TextInput
          style={styles.input}
          value={origem}
          onChangeText={value => setOrigem(value)}
        />
        <Text style={styles.text}>Destino</Text>
        <TextInput
          style={styles.input}
          value={destino}
          onChangeText={value =>  setDestino(value)}
        />
        <Text style={styles.text}>Veículo</Text>
        <View>
                        <DropDownPicker
                            style={styles.dropdown}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder="Selecione os plugues compatíveis"
                            placeholderStyle={styles.placeholderStyles}
                            multiple={true}
                            mode="BADGE"
                            badgeDotColors={["#e76f51"]}
                        />
                    </View>
        <MapView
          style={styles.map}
          provider={MapView.PROVIDER_GOOGLE}
          region={{
            latitude: -29.6015984,
            longitude: -52.1839037,
            latitudeDelta: 0.010,
            longitudeDelta: 0.010,
          }}
        >
          <Marker coordinate={{
            latitude: -29.6015984,
            longitude: -52.1839037,
          }}
            image={require('../../assets/marker3.png')}
          />
        </MapView>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Traçar Rota</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecond} onPress={() => limpar()}>
          <Text style={styles.buttonText}>Cancelar</Text>
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
  map: {
    height: '55%',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  containerForm: {
    flex: 5,
    backgroundColor: '#FFFFFF',
    paddingStart: '5%',
    paddingTop: '2%',
    paddingEnd: '5%',
    height: '50%'
  },
  text: {
    color: '#515151',
    textAlign: 'left',
    fontSize: 14
  },
  button: {
    backgroundColor: '#E0DCDC',
    borderRadius: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  buttonSecond: {
    backgroundColor: '#E0DCDC',
    borderRadius: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  buttonText: {
    fontSize: 18,
    color: '#000000'
  },
  input: {
    height: 30,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
    marginTop: 2,
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    height: 50,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 12,
    borderRadius: 5,
    marginTop: 1,
},
placeholderStyles: {
    color: "#515151",
    textAlign: 'center',
    fontSize: 14
},
})
