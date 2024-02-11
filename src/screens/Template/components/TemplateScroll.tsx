import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, useEffect } from 'react'

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatList } from 'react-native';

interface ImageObject {
  url: string;
  tags?: string[];
}
interface TemplateScrollProps{
    templateData:ImageObject[],
    navigateToEditor:(templateImg:string,promotion:boolean)=>void,
    categoryName?:string,
}

const TemplateScroll = ({templateData,navigateToEditor,categoryName}:TemplateScrollProps) => {
  
  useEffect(()=>{
    
    console.log("template scroll page",templateData)
  },[])
  return (
    <View className="w-full mb-4">
    <View className='flex-row justify-between px-3 py-3'>
      <Text className='text-base font-["Montserrat-Bold"] text-gray-700'>{categoryName}</Text>
      <View className='flex-row space-x-1'>
      <Text className='text-sm font-["Montserrat-SemiBold"] text-gray-700'>See All</Text>
      <FontAwesome5Icon name="angle-right" size={20}/>
      </View>
    </View>
    {/* Templates section */}
    <View>
    <FlatList
    style={{
      display:'flex',
      // flexDirection:'row',
    }}
    horizontal
    data={templateData}
    renderItem={item=>{
      return(
        <TouchableOpacity onPress={()=>navigateToEditor(item.item.url,false)}>
        <Image source={{uri:item.item.url}} height={140} width={140} resizeMode='contain'/> 
        {/* <Image source={{uri:"https://res.cloudinary.com/drxhgcqvw/image/upload/v1707634984/WhatsApp_Image_2024-02-10_at_6.36.51_PM_2_pamsxo.jpg"}} height={140} width={140} resizeMode='contain'/>  */}
        </TouchableOpacity>
      )
    }
  }
    />
    </View>
  </View>
  )
}

export default TemplateScroll

