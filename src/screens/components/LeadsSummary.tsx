import { View, Text } from 'react-native'
import React from 'react'
import { colors } from '../../utils/constants'
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"

interface Leadprops{
    logo:string,
    logoColor:string,
    count:string,
    name:string,
}

const LeadsSummary = ({logo,logoColor,count,name}:Leadprops) => {
  return (
    <View className='justify-center items-center w-1/3 px-3 gap-y-3'> 
    <View className='flex-row justify-center text-center items-center w-full'>
    <Text className=" text-black py-1.5 mr-4 text-md"> 
    <FontAwesomeIcons name={logo} color={logoColor} size={20} />
    </Text>
    <Text className='text-2xl text-gray-800 font-[Montserrat-Bold]'>{count}</Text>
    </View>
    <View>
    <Text className='text-md text-gray-500 text-center font-[Montserrat-Medium]'>{name}</Text>
    </View>
    </View>
  )
}

export default LeadsSummary