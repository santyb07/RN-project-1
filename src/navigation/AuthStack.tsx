import { View, Text, Appearance } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from './appNavigation'
import Login from '../screens/Login'
import VerifyOtp from '../screens/VerifyOtp'
import OnboardingScreen from '../screens/OnboardingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreen from 'react-native-splash-screen';


const AuthStack = () => {
    const [isFirstLaunch,setIsFirstLaunch] = useState<boolean | null>(null);
    let routeName;

    const checkLaunched= async()=>{
        await AsyncStorage.getItem('alreadyLaunched').then((value)=>{
            if(value==null){
                // AsyncStorage.setItem('alreadyLaunched','true');
                setIsFirstLaunch(true);
                SplashScreen.hide();

            }else{
                setIsFirstLaunch(false);
                SplashScreen.hide();

            }
        })
    }

    useEffect(()=>{
        // AsyncStorage.getItem('alreadyLaunched').then((value)=>{
        //     if(value==null){
        //         // AsyncStorage.setItem('alreadyLaunched','true');
        //         setIsFirstLaunch(true);
        //     }else{
        //         setIsFirstLaunch(false);
        //     }
        // })
        checkLaunched()
        // SplashScreen.hide();


        return()=> {
             AsyncStorage.removeItem('alreadyLaunched')
             setIsFirstLaunch(null);
        }
    },[])
    console.warn(isFirstLaunch);

    if(isFirstLaunch==null){
        return null;
    }
    // else if(isFirstLaunch==true){
    //     routeName= 'Onboarding';
    // }else{
    //     routeName= 'Login';
    // }
  return (
    
    <Stack.Navigator {...{initialRouteName:isFirstLaunch? 'Onboarding':'Login'}} screenOptions={{ contentStyle: {backgroundColor: 'white'} }}>
    <Stack.Screen name="Onboarding" options={{headerShown:false}} component={OnboardingScreen}/>
    <Stack.Screen name="Login" options={{headerShown:false}} component={Login}/>
    <Stack.Screen name="VerifyOtp" options={{headerShown:false}} component={VerifyOtp}/>
    </Stack.Navigator>

  )
}

export default AuthStack

