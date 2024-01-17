import { View, Text } from 'react-native'
import React from 'react'
import FontAwesomIcons from "react-native-vector-icons/FontAwesome"

interface AddParamProps{
    count?:string,
    name:string,
    logo?:string | undefined,
    platforms?:string[] | undefined
}
const AddParams = ({count,name,logo,platforms}:AddParamProps) => {
  return (
    <View className='justify-start items-start space-y-2 mt-2 flex-grow'>
    {
        platforms ? 
        <View className='flex-row justify-center items-center gap-x-2'>
        <Text className='text-base font-["Montserrat-SemiBold"]'>
            <FontAwesomIcons name={platforms[0]} size={20} color={'red'}/>
        </Text>
        <Text className='text-base font-["Montserrat-SemiBold"]'>
            <FontAwesomIcons name={platforms[1]} size={20} color={'blue'}/>
        </Text>
        </View>
    :
    <Text className='text-base font-["Montserrat-SemiBold"]'>
    {
        logo && <FontAwesomIcons name={logo} size={14}/>
    }
    
  {count}
</Text>
    }
    <Text className='text-gray-500 text-xs font-[Montserrat-Regular]'>
      {name}
    </Text>
  </View>
  )
}

export default AddParams