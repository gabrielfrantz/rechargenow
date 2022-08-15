import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator();

export default function RegisterVehiclesData() {
    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
                <Text style={styles.subText}>Marca do veículo (*)</Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.subText}>Modelo do veículo (*)</Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.subText}>Tipos de plugues (*)</Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.subText}>Placa</Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.subText}>Capacidade da bateria (kWh)</Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.text}>(*) Preenchimento obrigatório</Text>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonGoogle}>
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
    containerLogo: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm: {
        flex: 6,
        backgroundColor: '#FFFFFF',
        paddingStart: '5%',
        paddingTop: '10%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 56,
        textAlign: 'center'
    },
    text: {
        color: '#515151',
        textAlign: 'center',
        fontSize: 16
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
        marginTop: 10
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