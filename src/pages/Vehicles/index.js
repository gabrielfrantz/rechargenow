import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import * as Animatable from 'react-native-animatable'
import RegisterVehicles from '../../pages/RegisterVehicles'
import { auth, db } from '../../config/firebase'
import { doc, setDoc, getDoc, getDocs, collection, updateDoc, query, where, DocumentReference } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, updateEmail, updatePassword, signInWithEmailAndPassword } from "firebase/auth"
export default function Vehicles() {


  useEffect(() => {
    global.texto = "Nenhum veículo cadastrado!"
    console.log("entrou effect veiculos")
    carregar()
  }, [])

  const [register, setRegister] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const change = () => {
    setRegister(false);
  }

  const [carro, setCarro] = useState('')

  async function carregar() {
    console.log("carregar veiculos")
    const docSnap = await getDoc(doc(db, "vehicles", user.id));
    if (user.id = docSnap.id) {
      global.texto = "Veículos cadastrados!"
      setCarro(docSnap.data());
      console.log("mandou tudo")
    } else {
      global.texto = "Nenhum veículo cadastrado!"
    }
  }

  return (
    <View style={styles.container}>
      {register ? (
        <RegisterVehicles change={change} />
      ) : (
        <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>

          <ScrollView>
            <Text style={styles.text2}>{global.texto}</Text>
            <View style={styles.containerForm2} >
              <Image style={styles.buttonImagemIconStyle} source={require('../../assets/car.png')} />
              <TextInput
                style={
                  styles.input}
                value={carro.veiculo}
                editable={false}
                selectTextOnFocus={false}
              //onChangeText={value => setCarro({ ...carro, veiculo: value })}
              />
              <TextInput
                style={
                  styles.input3}
                value={carro.bateria + " kW"}
                editable={false}
                selectTextOnFocus={false}
              //onChangeText={value => setCarro({ ...carro, bateria: value })}
              />
              <Text style={styles.text3}>____________________________</Text>
              <TextInput
                style={
                  styles.input}
                value={carro.marca}
                editable={false}
                selectTextOnFocus={false}
              //onChangeText={value => setCarro({ ...carro, marca: value })}
              />
              <TextInput
                style={
                  styles.input}
                value={carro.modelo}
                editable={false}
                selectTextOnFocus={false}
              //onChangeText={value => setCarro({ ...carro, modelo: value })}
              />
              <TextInput
                style={
                  styles.input}
                value={carro.placa}
                editable={false}
                selectTextOnFocus={false}
              //onChangeText={value => setCarro({ ...carro, placa: value })}
              />
              <TextInput
                style={
                  styles.input2}
                value={carro.plugues}
                editable={false}
                selectTextOnFocus={false}
              //onChangeText={value => setCarro({ ...carro, plugues: value })}
              />
              <TouchableOpacity style={styles.buttonSecond}>
                <Text style={styles.buttonText2}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button3}>
                <Text style={styles.buttonText2}>Excluir</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => setRegister(true)}>
              <Text style={styles.buttonText}>Adicionar novo veículo</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animatable.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  containerForm: {
    flex: 5,
    backgroundColor: '#FFFFFF',
    paddingStart: '5%',
    paddingTop: '10%',
    paddingEnd: '5%',
    height: '60%'
  },
  containerForm2: {
    flex: 3,
    backgroundColor: '#E0DCDC',
    paddingStart: '20%',
    paddingEnd: '20%',
    borderRadius: 50,
    borderWidth: 2,
    marginTop: 20
  },
  text: {
    color: '#515151',
    textAlign: 'center',
    fontSize: 16,
  },
  text2: {
    color: '#515151',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10
  },
  text3: {
    color: '#515151',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#E0DCDC',
    borderRadius: 5,
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  buttonText2: {
    fontSize: 14,
    color: '#000000'
  },
  buttonSecond: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 5,
    marginTop: 5
  },
  button3: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 10,
    marginTop: 5
  },
  buttonText: {
    fontSize: 20,
    color: '#000000'
  },
  buttonIconSeparator: {
    backgroundColor: '#000000'
  },
  buttonImagemIconStyle: {
    margin: 5,
    height: 40,
    width: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch'
  },
  input: {
    color: '#515151',
    textAlign: 'center',
    fontSize: 16,
  },
  input2: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
  input3: {
    color: 'green',
    textAlign: 'center',
    fontSize: 16,
  }
})