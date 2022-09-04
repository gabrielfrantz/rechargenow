import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { auth, db } from '../../config/firebase'


export default function RegisterVehicles({ change }) {

    const [register, setRegister] = useState(false);

    const changeData = () => {
        setRegister(false);
    }

    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [plugues, setPlugues] = useState('')
    const [placa, setPlaca] = useState('')
    const [bateria, setBateria] = useState('')

    var tipoVeiculo

    function newVehicle() {
        console.log(marca)
        console.log(modelo)
        console.log(plugues)
        console.log(placa)
        console.log(bateria)
        console.log(tipoVeiculo)
        console.log("Veículo cadastrado com sucesso! ")
        const docRef = addDoc(collection(db, "vehicles"), {
            marca: marca,
            modelo: modelo,
            plugues: plugues,
            placa: placa,
            bateria: bateria,
            veiculo: tipoVeiculo

        })
    }

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
                <ScrollView>
                    <Text style={styles.title}>Selecione o tipo do seu veículo!</Text>
                    <TouchableOpacity style={styles.buttonCarro} onPress={() => tipoVeiculo = 'Híbrido'}>
                        <Image style={styles.buttonImagemIconStyle} source={require('../../assets/carroHibrido.png')} />
                        <View style={{ position: 'absolute', top: 120, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.textCar}>Híbrido</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCarroSecond} onPress={() => tipoVeiculo = 'Elétrico'}>
                        <Image style={styles.buttonImagemIconStyle} source={require('../../assets/carroEletrico.png')} />
                        <View style={{ position: 'absolute', top: 115, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.textCar}>Elétrico</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.subText}>Marca do veículo (*)</Text>
                    <TextInput
                        style={
                            styles.input
                        }
                        value={marca}
                        onChangeText={value => setMarca(value)}
                    />
                    <Text style={styles.subText}>Modelo do veículo (*)</Text>
                    <TextInput
                        style={
                            styles.input
                        }
                        value={modelo}
                        onChangeText={value => setModelo(value)}
                    />
                    <Text style={styles.subText}>Tipos de Plugues</Text>
                    <TouchableOpacity style={styles.buttonPlugues} >
                        <Text style={styles.buttonTextPlugues}>Adicionar plugues</Text>
                        <View style={styles.buttonIconSeparator} />
                        <Image style={styles.buttonImagemIconStyle2} source={require('../../assets/add.png')} />
                    </TouchableOpacity>
                    <Text style={styles.subText}>Placa</Text>
                    <TextInput
                        style={
                            styles.input
                        }
                        value={placa}
                        onChangeText={value => setPlaca(value)}
                    />
                    <Text style={styles.subText}>Capacidade da bateria (kWh)</Text>
                    <TextInput
                        style={
                            styles.input
                        }
                        value={bateria}
                        onChangeText={value => setBateria(value)}
                    />
                    <Text style={styles.text}>(*) Preenchimento obrigatório</Text>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => newVehicle()}>Salvar </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSecond} onPress={change}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </ScrollView>
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
    buttonPlugues: {
        backgroundColor: '#E0DCDC',
        borderRadius: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        width: '50%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2
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
    buttonTextPlugues: {
        fontSize: 14,
        color: '#000000'
    },
    buttonImagemIconStyle: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonImagemIconStyle2: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch'
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