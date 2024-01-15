import { View, Text } from 'react-native'
import React from 'react'
import HeaderBar from './components/HeaderBar'

const Templates = () => {
  return (
    <View className='flex-1 bg-white'>
    <HeaderBar name={'Social Media Designs'} logo={false} help={false} search={true}/>
  </View>
  )
}

export default Templates