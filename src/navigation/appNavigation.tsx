import React, { useEffect } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import SplashScreen from 'react-native-splash-screen';

// export type ScreenNames = ["Home", "Onboarding"] // type these manually
// export type RootStackParamList = Record<ScreenNames[number], {onboarded:boolean}>;
// export type StackNavigation = NavigationProp<RootStackParamList>;

export type RootStackParamList={
  Home:undefined,
  Onboarding:undefined,
  Login:undefined,
  VerifyOtp:{
    mobileNumber:string
  },
  // AccountOverview:undefined,
  // Templates:undefined,
  // AdsPackage:undefined,
  // AllLeads:undefined,
  // BusinessDetails: undefined,
  //New Navigation
  TemplateEditor:{
    templateImg:string,
    promotion:boolean,
  } | undefined,
  DownloadShareTemplate:{
    templateLocation:string,
  }  
}

export const Stack = createNativeStackNavigator<RootStackParamList>();

const appNavigation = () => {
  const isUserLoggedIn = useSelector((state:RootState)=>state.auth.userLoggedIn)
  // const {isLoading, userToken} = useContext(AuthContext);

  useEffect(()=>{
    if(isUserLoggedIn){
      SplashScreen.hide(); 
    }
  },[])
  return (
    <NavigationContainer>
      {
        isUserLoggedIn ? <AppStack/> : <AuthStack/>
      }
    </NavigationContainer>
  )
}

export default appNavigation