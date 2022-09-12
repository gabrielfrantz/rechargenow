import { React } from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../../config/firebase'
import { doc, setDoc, getDoc, getDocs, collection, updateDoc, query, where, DocumentReference } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default function User() {

  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const [usuario, setUsuario] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [password, setPassword] = useState('')

  async function editar() {
    //updateDoc(docSnap.id, setEmailEdit, setNomeEdit, setPasswordEdit)
    //docSnap.data().nome = setNomeEdit
    //docSnap.data().email = setEmailEdit
    //const docSnap = await getDoc(doc(db, "user", user.uid));
    //const docSnap = await getDoc(doc(db, "user", user.uid));
    if (password == passwordConfirm) {
      console.log("igual")
      if (password == '' || password == null) {
        console.log(usuario.nome)
        console.log(usuario.email)
      }
      else {
        console.log(usuario.nome)
        console.log(usuario.email)
        console.log(password)
      }
    }
  }
  //console.log("Uid", docSnap.id);
  //console.log("Nome:", docSnap.data().nome);
  //console.log("Email:", docSnap.data().email);


  async function carregar() {
    const docSnap = await getDoc(doc(db, "user", user.uid));
    if (user.id = docSnap.id) {
      //console.log("Uid", docSnap.id);
      setUsuario(docSnap.data());
      //console.log("Nome:", docSnap.data().nome);
      //setNome(docSnap.data().nome);
      //console.log("Email:", docSnap.data().email);
      console.log(docSnap.data())
    }
  }

  useEffect(() => {
    console.log("Entrou Effect")
    carregar()
  }, [])

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
        <Text style={styles.title}>Bem-vindo(a)!</Text>
        <Text style={styles.subText}>Nome</Text>
        <TextInput
          style={
            styles.input
          }
          value={usuario.nome}
          onChangeText={value => setUsuario({ ...usuario, nome: value })}
        />
        <Text style={styles.subText}>E-mail</Text>
        <TextInput
          style={
            styles.input
          }
          value={usuario.email}
          onChangeText={value => setUsuario({ ...usuario, email: value })}
        />
        <Text style={styles.subText}>Senha</Text>
        <TextInput
          style={
            styles.input}
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
        />
        <Text style={styles.subText}>Confirme a senha</Text>
        <TextInput
          style={
            styles.input}
          value={passwordConfirm}
          onChangeText={value => setPasswordConfirm(value)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={() => editar()}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecond}>
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
  containerLogo: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerForm: {
    flex: 5,
    backgroundColor: '#FFFFFF',
    paddingStart: '5%',
    paddingTop: '10%',
    paddingEnd: '5%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  text: {
    color: '#515151',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10
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
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonSecond: {
    backgroundColor: '#E0DCDC',
    borderRadius: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    fontSize: 20,
    color: '#000000'
  },
  input: {
    height: 50,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
    marginTop: 15,
  }
})