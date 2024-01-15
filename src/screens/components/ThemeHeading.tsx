import { View, Text } from 'react-native'
import React from 'react'

interface HeadingProp{
    heading:string
}

const ThemeHeading = ({heading}:HeadingProp) => {
  return (
    <View className='py-3'>
    <Text className='text-base text-gray-700 font-semibold font-[Montserrat-Bold]'>{heading}</Text>
    </View>
  )
}

export default ThemeHeading