import React, {useState} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import RegisterVehiclesData from '../../pages/RegisterVehiclesData'

export default function RegisterVehicles({ change }) {

    const [register, setRegister] = useState(false);

    const changeData = () => {
        setRegister(false);
    }

    return (
        <View style={styles.container}>
            {register ? (
            <RegisterVehiclesData change={change} changeData={changeData}/>
            ) : (
            <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
                <Text style={styles.title}>Selecione o tipo do seu veículo!</Text>

                <TouchableOpacity style={styles.buttonCarro}>
                    <Image style={styles.buttonImagemIconStyle} source={require('../../assets/carroHibrido.png')} />
                    <View style={{ position: 'absolute', top: 120, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.textCar}>Híbrido</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCarro}>
                    <Image style={styles.buttonImagemIconStyle} source={require('../../assets/carroEletrico.png')} />
                    <View style={{ position: 'absolute', top: 115, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.textCar}>Elétrico</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => setRegister(true) }>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSecond} onPress={change}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center'
    },
    text: {
        color: '#515151',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10
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
        marginTop: 40
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
    }
})