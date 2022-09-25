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

export default function Travel() {

  function limpar() {
    setOrigem({ origem: '' });
    setDestino({ destino: '' });
    setVeiculo({ veiculo: '' });
  }

  const [origem, setOrigem] = useState('')
  const [destino, setDestino] = useState('')
  const [veiculo, setVeiculo] = useState('')

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
        <Text style={styles.text}>Destino final</Text>
        <TextInput
          style={styles.input}
          value={destino}
          onChangeText={value =>  setDestino(value)}
        />
        <Text style={styles.text}>Veículo</Text>
        <TextInput
          style={styles.input}
          value={veiculo}
          onChangeText={value =>  setVeiculo(value)}
        />
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
    height: '60%',
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
  }
})
