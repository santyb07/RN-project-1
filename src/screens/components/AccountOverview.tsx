import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import { colors } from '../../utils/constants'


interface props{
    name:string,
    logo:string,
    count:string,
}
const AccountOverview = ({name,logo,count}:props) => {
  return (
    <LinearGradient
    start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
    locations={[0,0.5]}
    colors={['#e3ffe7', '#d9e7ff']}
    className='rounded-2xl justify-around items-start px-5 py-3 h-24 w-44'
    >
      {/* <View className='justify-around items-start px-5 py-3 h-24 w-44'> */}
        <View>
        <Text className='text-md text-blue-700 font-[Montserrat-Medium]'>{name}</Text>
        </View>
        <View className='flex-row justify-start items-center w-full'>
        <Text className=" text-black py-1.5 mr-4 text-md  font-['Montserrat-Medium']"> 
        <FontAwesomeIcons name={logo} color={colors.ActiveColor} size={15} />
        </Text>
        <Text className='text-2xl text-gray-800 font-[Montserrat-Bold]'>{count}</Text>
        </View>
      {/* </View> */}
      </LinearGradient>
  )
}

export default AccountOverview