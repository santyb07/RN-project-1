import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from './appNavigation'
import Login from '../screens/Login'
import VerifyOtp from '../screens/VerifyOtp'
import OnboardingScreen from '../screens/OnboardingScreen'

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{contentStyle:{backgroundColor:'#FFFFFF'}}}>
        <Stack.Screen name="Login" options={{headerShown:false}} component={Login}/>
        <Stack.Screen name="VerifyOtp" options={{headerShown:false}} component={VerifyOtp}/>
        <Stack.Screen name="Onboarding" options={{headerShown:false}} component={OnboardingScreen}/>
    </Stack.Navigator>
  )
}

export default AppStack