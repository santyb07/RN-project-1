import { View, Text, Image } from 'react-native'
import React from 'react'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import IonicAwesomeIcons from "react-native-vector-icons/Ionicons"
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../navigation/appNavigation'
import { StackNavigationProp } from '@react-navigation/stack'

type TemplateHeaderProps={
    saveImage:(action:string)=>void;
}

const TemplateHeaderBar = ({saveImage}:TemplateHeaderProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const goback=()=>{
    navigation.pop(1)
  }
    
  return (
    <View className='w-full flex-row bg-gray-100 px-5 py-2 justify-between items-center'>
    <View className='flex flex-row justify-center items-center space-x-4'>
    {/* {
    <Image source={{uri:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1705428150/ysxh4cpuke6va2sqhou8.png'}} className='h-8 w-8 rounded-lg' resizeMode={'cover'}/>

    } */}
    <IonicAwesomeIcons name='arrow-back-circle-outline' size={30}  color={'orange'} onPress={goback}/>
    <Text className='font-[Montserrat-SemiBold] text-gray-600 text-lg'>Template Editor</Text>
   
    </View>
    <View className='flex-row gap-x-4'>

         <View className='border p-1 rounded-md  border-white bg-white'>
          <IonicAwesomeIcons name='download-outline' size={30}  color={'orange'} onPress={()=>saveImage('download')}/>
          </View>
          <View className='border p-1 rounded-md border-white bg-white'>
          <IonicAwesomeIcons name='share-social-outline' size={30} color={'orange'} onPress={()=>saveImage('share')}/>
          </View>
        </View>
    </View>
  )
}

export default TemplateHeaderBar