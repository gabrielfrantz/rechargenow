import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'

import User from '../../pages/User'
import Vehicles from '../../pages/Vehicles'
import RegisterVehicles from '../../pages/RegisterVehicles'
import Maps from '../../pages/Maps'
import Travel from '../../pages/Travel'
import Electropost from '../../pages/Electropost'
import RegisterElectropost from '../../pages/RegisterElectropost'
import Recharge from '../../pages/Recharge'

const Tab = createMaterialTopTabNavigator();

export default function Menu() {
    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="flipInX"
                    source={require('../../assets/logo.png')}
                    style={{ width: '70%' }}
                    resizeMode="contain"
                />
            </View>
            <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
                <Tab.Navigator
                    screenOptions={{
                        style: {
                            backgroundColor: '#FFFFFF',
                            borderTopColor: 'transparent',
                        },
                        activeTintColor: '#000000',
                        tabStyle: {
                            paddingBottom: 10,
                            paddingTop: 10,
                            headerLeft: null,
                        }
                    }}
                >
                    <Tab.Screen
                        name="  Estações"
                        component={Maps}
                        options={{
                            tabBarIcon: () => (
                                <Image source={require('../../assets/menuEstacoes.png')} />
                            ),
                            headerLeft: null,
                            tabBarLabelStyle: {
                                fontSize: 9,
                                fontWeight: "bold",
                            }
                        }}
                    />
                    <Tab.Screen
                        name="  Veículos"
                        component={Vehicles}
                        options={{
                            tabBarIcon: () => (
                                <Image source={require('../../assets/menuVeiculos.png')} />
                            ),
                            headerLeft: null,
                            tabBarLabelStyle: {
                                fontSize: 9,
                                fontWeight: "bold",
                            }
                        }}
                    />
                    <Tab.Screen
                        name=" Carregar"
                        component={Recharge}
                        options={{
                            tabBarIcon: () => (
                                <Image source={require('../../assets/menuRecarregar.png')} />
                            ),
                            headerLeft: null,
                            tabBarLabelStyle: {
                                fontSize: 9,
                                fontWeight: "bold",
                            },
                            //tabBarInactiveTintColor: '#E0DCDC',
                            //tabBarActiveTintColor: '#E0DCDC'
                        }}
                    />
                    <Tab.Screen
                        name="   Viagens"
                        component={Travel}
                        options={{
                            tabBarIcon: () => (
                                <Image source={require('../../assets/menuViagens.png')} />
                            ),
                            headerLeft: null,
                            tabBarLabelStyle: {
                                fontSize: 9,
                                fontWeight: "bold",
                            }
                        }}
                    />
                    <Tab.Screen
                        name="   Perfil"
                        component={User}
                        options={{
                            tabBarIcon: () => (
                                <Image source={require('../../assets/menuPerfil.png')} />
                            ),
                            headerLeft: null,
                            tabBarLabelStyle: {
                                fontSize: 9,
                                fontWeight: "bold",
                            }
                        }}
                    />
                </Tab.Navigator>
            </Animatable.View>
        </View>
    )
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
        flex: 7,
        backgroundColor: '#FFFFFF',
    },
    text: {
        color: '#515151',
        textAlign: 'center',
        fontSize: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconTabRound: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    }
})