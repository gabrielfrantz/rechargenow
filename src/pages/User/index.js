import { React } from 'react'
import { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../config/firebase'
import { doc, setDoc } from 'firebase/firestore'

export default function User() {

  const navigation = useNavigation();
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function alterar() {
    await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            if (userCredential && userCredential.user) {
                const user = userCredential.user
                console.log(nome)
                console.log(email)
                console.log(password)
                console.log("Usuário alteado com sucesso! " + user.uid)
                setDoc(doc(db, "user", user.uid), {
                    nome: nome,
                    email: email,
                    password: password,

                })
                    .catch(error => console.log(error.message))
            }
            navigation.navigate('Menu')
        })
}

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
        <Text style={styles.title}>Bem-vindo(a)!</Text>
        <Text style={styles.subText}>Nome</Text>
        <TextInput
          style={
            styles.input
          }
          value={nome}
          onChangeText={value => setNome(value)}
        />
        <Text style={styles.subText}>E-mail</Text>
        <TextInput
          style={
            styles.input
          }
          value={email}
          onChangeText={value => setEmail(value)}
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
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={() => alterar()}>
          <Text style={styles.buttonText}>Salvar</Text>
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
    flex: 6,
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
    marginTop: 10,
    marginBottom: 30,
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
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
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