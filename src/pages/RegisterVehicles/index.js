import React, { useState } from 'react'
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { auth, db } from '../../config/firebase'
import { doc, setDoc, getDoc, getDocs, collection, updateDoc, query, where, DocumentReference } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, updateEmail, updatePassword, signInWithEmailAndPassword } from "firebase/auth"
import DropDownPicker from 'react-native-dropdown-picker'

export default function RegisterVehicles({ change }) {

    const [register, setRegister] = useState(false);

    const changeData = () => {
        setRegister(false);
    }

    DropDownPicker.setListMode("SCROLLVIEW");

    const auth = getAuth();
    const user = auth.currentUser;

    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [plugues, setPlugues] = useState('')
    const [placa, setPlaca] = useState('')
    const [bateria, setBateria] = useState('')

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

    var tipoVeiculo

    function newVehicle() {
        console.log(marca)
        console.log(modelo)
        console.log(plugues)
        console.log(placa)
        console.log(bateria)
        console.log(tipoVeiculo)
        console.log("Veículo cadastrado com sucesso! ")
        setDoc(doc(db, "vehicles", user.uid), {
            marca: marca,
            modelo: modelo,
            //plugues: plugues,
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
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingTop: '10%',
        paddingEnd: '5%',
        height: '60%'
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000000',
        padding: 100,
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