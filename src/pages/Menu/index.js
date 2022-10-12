import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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

const Tab = createBottomTabNavigator();

export default function Menu() {
    return (
        <View style={styles.container}>
            <Animatable.View anima tion="fadeInUp" delay={500} style={styles.containerForm}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarStyle: { backgroundColor: '#fff' },
                        tabBarActiveTintColor: '#000',
                    }}
                >
                    <Tab.Screen
                        name=" Estações"
                        component={Maps}
                        options={{
                            tabBarIcon: () => (
                                <Image source={require('../../assets/menuEstacoes.png')} />
                            ),
                            headerLeft: null,
                            tabBarLabelStyle: {
                                fontSize: 11,
                                fontWeight: "bold",
                            },
                            headerShown: false
                        }}
                    />
                    <Tab.Screen
                        name="Veículos"
                        component={Vehicles}
                        options={{
                            tabBarIcon: () => (
                                <Image source={require('../../assets/menuVeiculos.png')} />
                            ),
                            headerLeft: null,
                            tabBarLabelStyle: {
                                fontSize: 11,
                                fontWeight: "bold",
                            },
                            headerShown: false
                        }}
                    />
                    <Tab.Screen
                        name="Carregar"
                        component={Recharge}
                        options={{
                            tabBarIcon: () => (
                                <Image source={require('../../assets/menuRecarregar.png')} />
                            ),
                            headerLeft: null,
                            tabBarLabelStyle: {
                                fontSize: 11,
                                fontWeight: "bold",
                            },
                            headerShown: false
                        }}
                    />
                    <Tab.Screen
                        name="Viagens"
                        component={Travel}
                        options={{
                            tabBarIcon: () => (
                                <Image source={require('../../assets/menuViagens.png')} />
                            ),
                            headerLeft: null,
                            tabBarLabelStyle: {
                                fontSize: 11,
                                fontWeight: "bold",
                            },
                            headerShown: false
                        }}
                    />
                    <Tab.Screen
                        name="Perfil"
                        component={User}
                        options={{
                            tabBarIcon: () => (
                                <Image source={require('../../assets/menuPerfil.png')} />
                            ),
                            headerLeft: null,
                            tabBarLabelStyle: {
                                fontSize: 11,
                                fontWeight: "bold",
                            },
                            headerShown: false
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
    containerForm: {
        flex: 4,
        backgroundColor: '#FFFFFF',
    },
    text: {
        color: '#515151',
        textAlign: 'center',
        fontSize: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
})