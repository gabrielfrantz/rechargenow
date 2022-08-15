import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator();

export default function RegisterElectropost() {
    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
                <Text style={styles.subText}>Nome do local (*)</Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.subText}>Endereço (*)</Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.subText}>Número (*)</Text>
                <TextInput
                    style={styles.inputMenor}
                />
                <Text style={styles.subText}>Bairro (*)</Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.subText}>Cidade (*)</Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.subText}>UF (*)</Text>
                <TextInput
                    style={styles.inputMenor}
                />
                <Text style={styles.subText}>Tipos de Plugues</Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.subText}>Potência</Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.subText}>Contato</Text>
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
    containerForm: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    }
})