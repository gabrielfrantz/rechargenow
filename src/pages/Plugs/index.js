import { View, Text, SafeAreaView, StyleSheet, Modal } from 'react-native'
import React from 'react'
import CheckBox from '../../components/CheckBox'

export default function Plugs() {


  console.log("entrou plugs")
  const checkPlug = () => {
    const optionsCheckBox = [
      { text: 'Tipo 1', id: 1 },
      { text: 'Tipo 2', id: 2 },
      { text: 'CCS 1', id: 3 },
      { text: 'CCS 2', id: 4 },
      { text: 'CHAdeMO', id: 5 },
      { text: 'GB/T', id: 6 },
      { text: 'Tesla', id: 7 }
    ]
    return (
      <View>
        <Modal
          animationTypo='slide'
          transparent={true}
          visible={complianceModal}>
          <ScrollView>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text>Selecione os plugues compatíveis com seu veículo</Text>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, .6)',
    alignItems: 'center'
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: '20',
    margin: '20',
    padding: '20',
  },
  containerForm: {
    flex: 5,
    backgroundColor: '#FFFFFF',
    paddingStart: '5%',
    paddingTop: '10%',
    paddingEnd: '5%',
    height: '60%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  subText: {
    color: '#515151',
    textAlign: 'left',
    fontSize: 16
  },
  text: {
    color: '#515151',
    textAlign: 'center',
    fontSize: 16
  },
  textCar: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 20,
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
    marginTop: 15
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
    marginTop: 10,
    marginBottom: 20
  },
  buttonCarro: {
    backgroundColor: '#E0DCDC',
    borderRadius: 25,
    paddingVertical: 30,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  buttonCarroSecond: {
    backgroundColor: '#E0DCDC',
    borderRadius: 25,
    paddingVertical: 30,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20

  },
  buttonText: {
    fontSize: 20,
    color: '#000000'
  },
  buttonImagemIconStyle: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 50,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
    marginTop: 2,
  }
})
