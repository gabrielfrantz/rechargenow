import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Menu from '../pages/Menu'

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator 
            screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Register"
                component={Register}
            />
            <Stack.Screen
                name="Menu"
                component={Menu}
            />
        </Stack.Navigator>
    )
}