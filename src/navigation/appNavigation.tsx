import React,{useContext, useEffect, useState} from 'react'
import {NavigationContainer, NavigationProp} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import { getItem } from '../utils/asyncStorage';
import Login from '../screens/Login'
import VerifyOtp from '../screens/VerifyOtp';
import { AuthContext } from '../context/AuthContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

// export type ScreenNames = ["Home", "Onboarding"] // type these manually
// export type RootStackParamList = Record<ScreenNames[number], {onboarded:boolean}>;
// export type StackNavigation = NavigationProp<RootStackParamList>;

export type RootStackParamList={
  // Home:{
  //   onboarded:boolean
  // },
  Onboarding:undefined,
  Login:undefined,
  VerifyOtp:undefined,

}

export const Stack = createNativeStackNavigator<RootStackParamList>();

const appNavigation = () => {
  const {isLoading, userToken} = useContext(AuthContext);

 
  return (
    <NavigationContainer>
      {
        userToken ? <AppStack/> : <AuthStack/>
      }
    </NavigationContainer>
  )
}

export default appNavigation