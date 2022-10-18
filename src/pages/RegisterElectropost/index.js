import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, SafeAreaView, Modal, FlatList } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { db } from '../../config/firebase'
import Electropost from '../../pages/Electropost'
import DropDownPicker from 'react-native-dropdown-picker'
import { useNavigation } from '@react-navigation/native'
import { fetchUserInfoAsync } from 'expo-auth-session'

export default function RegisterElectropost({ change, setRegister }) {
    const navigation = useNavigation();
    //const [register, setRegister] = useState(false);

    /*const changeData = () => {
        setRegister(false);
    }*/

    DropDownPicker.setListMode("SCROLLVIEW");

    const [local, setLocal] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUF] = useState('')
    const [potencia, setPotencia] = useState('')
    const [contato, setContato] = useState('')
    const [tipo_plugues, setTipo_plugues] = useState('')

    function limpar() {
        setLocal('')
        setEndereco('')
        setNumero('')
        setBairro('')
        setCidade('')
        setUF('')
        setPotencia('')
        setContato('')
      }

      function fechar(){
        console.log("fechar")
        setRegister(false);
      }

    function newElectropost() {
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
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            tipo_plugues: value,
            potencia: potencia,
            contato: contato
        })
        //limpar()
        setRegister(false)
    }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(['Tipo 2']);
    const [items, setItems] = useState([
        { label: 'CHAdeMO', value: 'CHAdeMO' },
        { label: 'CCS 1', value: 'CCS 1' },
        { label: 'CCS 2', value: 'CCS 2' },
        { label: 'GB/T', value: 'GB/T' },
        { label: 'J 1772 (Tipo 1)', value: 'J 1772 (Tipo 1)' },
        { label: 'Mennekes (Tipo 2)', value: 'Mennekes (Tipo 2)' },
        { label: 'Tipo 1', value: 'Tipo 1' },
        { label: 'Tipo 2', value: 'Tipo 2' }
    ]);

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
                    <TouchableOpacity style={styles.button} onPress={() => newElectropost()}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonGoogle} onPress={() => fechar()}>
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
    buttonIconSeparator: {
        backgroundColor: '#000000'
    },
    buttonImagemIconStyle: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch'
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