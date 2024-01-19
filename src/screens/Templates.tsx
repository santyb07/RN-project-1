import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import HeaderBar from './components/HeaderBar'
import LottieView from 'lottie-react-native'


const {width, height} = Dimensions.get('window');

const Templates = () => {
  return (
    <View className='flex-1 bg-white'>
    <HeaderBar name={'Social Media Designs'} logo={false} help={false} search={true}/>
    <View className="justify-center items-center flex-1 pb-20">
      <Text className='font-[Montserrat-Bold] text-3xl'>Coming Soon</Text>
    <LottieView  style={styles.lottie} source={require('../assets/animations/coming-soon.json')} autoPlay loop/>
    </View>
  </View>
  )
}

export default Templates


const styles = StyleSheet.create({
  lottie:{
      width: width*0.9,
      height: 200,
  }
}
)