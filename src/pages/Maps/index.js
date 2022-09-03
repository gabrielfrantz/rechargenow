import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image,} from 'react-native'
import { Card, Title, Paragraph, Button, Avatar } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';
import RegisterElectropost from '../../pages/RegisterElectropost'
import Electropost from '../../pages/Electropost'

export default function Maps() {
    const navigation = useNavigation();
    const [register, setRegister] = useState(false);

    const change = () => {
        setRegister(false);
    }

    const listarEletropostos = () => {
        <Card>
        <Card.Title title="Frantz House" subtitle="Frantz House 2" />
        <Card.Content>
          <Title>Frantz House 3</Title>
          <Paragraph>Rua Brígida Fagundes, nº. 81, Bairro Morsch, RS, 95800-000</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    };


    return (
        <View style={styles.container}>
            {register ? (
                <RegisterElectropost change={change} />
            ) : (
                <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
                    <TouchableOpacity style={styles.button} onClick={() => listarEletropostos()}>
                        <Text style={styles.buttonText}>Localizar estações mais próximas</Text>
                        <View style={styles.buttonIconSeparator} />
                        <Image style={styles.buttonImagemIconStyle} source={require('../../assets/menuEstacoesProximas.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSecond} onPress={() => setRegister(true)}>
                        <Text style={styles.buttonText}>Cadastrar nova estação de recarga</Text>
                        <View style={styles.buttonIconSeparator} />
                        <Image style={styles.buttonImagemIconStyle} source={require('../../assets/add.png')} />
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
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 430,
        marginBottom: 10
    },
    buttonSecond: {
        backgroundColor: '#E0DCDC',
        borderRadius: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
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