import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { onDisplayNotification } from '../utils/firebase/CommonUtils'

const TestNotification = () => {
  return (
    <View className='flex-1 justify-center items-center'>
    <TouchableOpacity className='px-5 py-2 bg-gray-700' onPress={()=>onDisplayNotification({title:"Notification Title",body:"Notification Body"})}>
      <Text className='text-xl text-white'>Test Notification</Text>
    </TouchableOpacity>
    </View>
  )
}

export default TestNotification