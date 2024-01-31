import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import HeaderBar from './components/HeaderBar'
import LottieView from 'lottie-react-native'
import PhoneSignIn from '../utils/firebase/PhoneSignIn';

//Grow Component
const {width, height} = Dimensions.get('window');

const AdsPackage = () => {
  return (
    <View className='flex-1 bg-white'>
      <HeaderBar name={'Grow Your Business'} logo={true} help={true} search={false}/>
      <View className="justify-center items-center flex-1 pb-20">
      <Text className='font-[Montserrat-Bold] text-3xl'>Coming Soon</Text>
    <LottieView  style={styles.lottie} source={require('../assets/animations/coming-soon.json')} autoPlay loop/>
    </View>
        <View>
        {/* <PhoneSignIn/> */}
      
     
      
     
      </View>
    </View>
  )
}

export default AdsPackage

const styles = StyleSheet.create({
  lottie:{
      width: width*0.9,
      height: 200,
  }
}
)