import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import RegisterVehicles from '../../pages/RegisterVehicles'
import Maps from '../../pages/Maps'

const Tab = createMaterialTopTabNavigator();

export default function Vehicles() {
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
        <Text style={styles.text}>Nenhum veículo cadastrado!</Text>
        <TouchableOpacity style={styles.button} onPress={() => Tab.Navigator('RegisterVehicles')}>
          <Text style={styles.buttonText}>Adicionar novo veículo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecond} onPress={() => Tab.Navigator('Maps')}>
          <Text style={styles.buttonText}>Voltar</Text>
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
    marginTop: 10
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
    marginTop: 400
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