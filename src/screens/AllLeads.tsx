import { View, Text } from 'react-native'
import React from 'react'
import HeaderBar from './components/HeaderBar'

const AllLeads = () => {
  return (
    <View className='flex-1 bg-white'>
    <HeaderBar name={'Leads'} logo={true} help={false} search={true}/>
  </View>
  )
}

export default AllLeads