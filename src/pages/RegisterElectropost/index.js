import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { db } from '../../config/firebase'
import Electropost from '../../pages/Electropost'

export default function RegisterElectropost({ change }) {

    const [register, setRegister] = useState(false);

    const changeData = () => {
        setRegister(false);
    }

    const [local, setLocal] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUF] = useState('')
    const [tipo_plugues, setTipo_plugues] = useState('')
    const [potencia, setPotencia] = useState('')
    const [contato, setContato] = useState('')

    var tipoVeiculo

    function newVehicle() {
        console.log(local)
        console.log(endereco)
        console.log(numero)
        console.log(bairro)
        console.log(cidade)
        console.log(uf)
        console.log(tipo_plugues)
        console.log(potencia)
        console.log(contato)
        console.log("Estação de recarga cadastrada com sucesso! ")
        const docRef = addDoc(collection(db, "electropost"), {
            local: local,
            endereco: endereco,
            endereco: numero,
            endereco: bairro,
            endereco: cidade,
            endereco: uf,
            tipo_plugues: tipo_plugues,
            potencia: potencia,
            contato: contato
        })
    }

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
                <ScrollView>
                    <Text style={styles.subText}>Nome do local (*)</Text>
                    <TextInput
                        style={
                            styles.input
                        }
                        value={local}
                        onChangeText={value => setLocal(value)}
                    />
                    <Text style={styles.subText}>Endereço (*)</Text>
                    <TextInput
                        style={
                            styles.input
                        }
                        value={endereco}
                        onChangeText={value => setEndereco(value)}
                    />
                    <Text style={styles.subText}>Número (*)</Text>
                    <TextInput
                        style={
                            styles.input
                        }
                        value={numero}
                        onChangeText={value => setNumero(value)}
                    />
                    <Text style={styles.subText}>Bairro (*)</Text>
                    <TextInput
                        style={
                            styles.input
                        }
                        value={bairro}
                        onChangeText={value => setBairro(value)}
                    />
                    <Text style={styles.subText}>Cidade (*)</Text>
                    <TextInput
                        style={
                            styles.input
                        }
                        value={cidade}
                        onChangeText={value => setCidade(value)}
                    />
                    <Text style={styles.subText}>UF (*)</Text>
                    <TextInput
                        style={
                            styles.input
                        }
                        value={uf}
                        onChangeText={value => setUF(value)}
                    />
                    <Text style={styles.subText}>Tipos de Plugues</Text>
                    <TouchableOpacity style={styles.buttonSecond} >
                        <Text style={styles.buttonText}>Adicionar plugues</Text>
                        <View style={styles.buttonIconSeparator} />
                        <Image style={styles.buttonImagemIconStyle} source={require('../../assets/add.png')} />
                    </TouchableOpacity>
                    <Text style={styles.subText}>Potência (kW)</Text>
                    <TextInput
                        style={
                            styles.input
                        }
                        value={potencia}
                        onChangeText={value => setPotencia(value)}
                    />
                    <Text style={styles.subText}>Contato</Text>
                    <TextInput
                        style={
                            styles.input
                        }
                        value={contato}
                        onChangeText={value => setContato(value)}
                    />
                    <Text style={styles.text}>(*) Preenchimento obrigatório</Text>
                    <TouchableOpacity style={styles.button} onPress={() => newVehicle()}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonGoogle} onPress={change}>
                        <Text style={styles.buttonText}>Voltar</Text>
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
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingTop: '3%',
        paddingEnd: '5%'
    },
    text: {
        color: '#515151',
        textAlign: 'center',
        fontSize: 12
    },
    subText: {
        color: '#515151',
        textAlign: 'left',
        fontSize: 12
    },
    button: {
        backgroundColor: '#E0DCDC',
        borderRadius: 5,
        paddingVertical: 10,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    buttonSecond: {
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
    buttonGoogle: {
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
        fontSize: 14,
        color: '#000000'
    },
    input: {
        height: 30,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        marginTop: 1
    },
    inputMenor: {
        height: 30,
        width: 50,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        marginTop: 1
    },
    inputMenor2: {
        height: 30,
        width: 30,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        marginTop: 1
    },
    buttonIconSeparator: {
        backgroundColor: '#000000'
    },
    buttonImagemIconStyle: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch'
    }
})