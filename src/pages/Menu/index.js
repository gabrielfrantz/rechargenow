import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'

import User from '../../pages/User'
import Vehicles from '../../pages/Vehicles'
import RegisterVehicles from '../../pages/RegisterVehicles'
import RegisterVehiclesData from '../../pages/RegisterVehiclesData'
import Maps from '../../pages/Maps'
import Travel from '../../pages/Travel'
import Electropost from '../../pages/Electropost'
import RegisterElectropost from '../../pages/RegisterElectropost'

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
                            borderTopColor: 'transparent'
                        },
                        activeTintColor: '#000000',
                        tabStyle: {
                            paddingBottom: 10,
                            paddingTop: 10,
                            headerLeft: null
                        }
                    }}
                >
                    <Tab.Screen
                        name="Mapa"
                        component={RegisterElectropost}
                        options={{
                            tabBarIcon: () => (
                                <Image source={require('../../assets/menuMapa.png')} />
                            ),
                            headerLeft: null
                        }}
                    />
                    <Tab.Screen
                        name="Veículos"
                        component={RegisterVehiclesData}
                        options={{
                            tabBarIcon: () => (
                                <Image source={require('../../assets/menuVeiculos.png')} />
                            ),
                            headerLeft: null
                        }}
                    />
                    <Tab.Screen
                        name="Rotas"
                        component={Travel}
                        options={{
                            tabBarIcon: () => (
                                <Image source={require('../../assets/menuRotas.png')} />
                            ),
                            headerLeft: null
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
})