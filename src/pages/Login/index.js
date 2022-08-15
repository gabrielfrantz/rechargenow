import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
    email: yup.string().email("E-mail inválido!").required("Informe um e-mail!"),
    senha: yup.string().min(8, "A senha deve ter pelo menos 8 dígitos").required("Informe uma senha!"),
})

export default function Login() {
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    function handleSignIn(data) {
        console.log(data.email);
        console.log(data.senha);
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="flipInX"
                    source={require('../../assets/logo.png')}
                    style={{ width: '90%' }}
                    resizeMode="contain"
                />
            </View>

            <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
                <Text style={styles.title}>Bem-vindo(a)!</Text>
                <Text style={styles.subText}>E-mail</Text>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[
                                styles.input, {
                                    borderWidth: errors.email && 1,
                                    borderColor: errors.email && '#FF375B'
                                }]}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />
                {errors.email && <Text style={styles.erro}>{errors.email?.message}</Text>}
                <Text style={styles.subText}>Senha</Text>
                <Controller
                    control={control}
                    name="senha"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[
                                styles.input, {
                                    borderWidth: errors.senha && 1,
                                    borderColor: errors.senha && '#FF375B'
                                }]}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            secureTextEntry={true}
                        />
                    )}
                />
                {errors.senha && <Text style={styles.erro}>{errors.senha?.message}</Text>}
                <Text style={styles.text}>Esqueceu sua senha? <Text style={styles.textBold}>Redefina aqui!</Text></Text>

                <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSignIn)}>
                    <Text style={styles.buttonText}>Autenticar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonGoogle}>
                    <Text style={styles.buttonText}>Autenticar com Google    </Text>
                    <View style={styles.buttonIconSeparator} />
                    <Image style={styles.buttonImagemIconStyle} source={require('../../assets/google.png')} />
                </TouchableOpacity>
                <Text style={styles.text}>Ainda não possui cadastro? <Text style={styles.textBold}>Registre-se aqui!</Text></Text>
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
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
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
        fontSize: 16,
        marginTop: 10
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
        marginTop: 40
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
        marginTop: 10,
        marginBottom: 20
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
        marginTop: 10,
    },
    erro: {
        alignSelf: 'flex-start',
        color: '#FF375B',
        marginBottom: 8
    }
})