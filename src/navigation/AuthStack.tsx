import { View, Text, Appearance } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from './appNavigation'
import Login from '../screens/Login'
import VerifyOtp from '../screens/VerifyOtp'
import OnboardingScreen from '../screens/OnboardingScreen'
import SplashScreen from 'react-native-splash-screen';
import { getItem, removeItem, setItem } from '../utils/asyncStorage'

const AuthStack = () => {
    const [isFirstLaunch,setIsFirstLaunch] = useState<boolean | null>(null);
    
    useEffect(()=>{
        const checkLaunched= async()=>{
            let value =await getItem('alreadyLaunched');
            if(value==null){
                // setItem('alreadyLaunched','true');
                setIsFirstLaunch(true);
                SplashScreen.hide();  
            }else{
                setIsFirstLaunch(false);
                SplashScreen.hide();
            }
        }
        checkLaunched()
        // return()=> {
        //     removeItem('alreadyLaunched');
        //      setIsFirstLaunch(null);
        // }
    },[])
    // console.warn(isFirstLaunch);



    if(isFirstLaunch==null){
        return null;
    }
  return (
    
    <Stack.Navigator {...{initialRouteName:isFirstLaunch? 'Onboarding':'Login'}} screenOptions={{ contentStyle: {backgroundColor: 'white'} }}>
    <Stack.Screen name="Onboarding" options={{headerShown:false}} component={OnboardingScreen}/>
    <Stack.Screen name="Login" options={{headerShown:false}} component={Login}/>
    <Stack.Screen name="VerifyOtp" options={{headerShown:false}} component={VerifyOtp}/>
    </Stack.Navigator>

  )
}

export default AuthStack

