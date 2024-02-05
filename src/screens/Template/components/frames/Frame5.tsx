import React, { useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, SafeAreaView } from 'react-native';
import { RootState } from '../../../../redux/store/store';
import { useSelector } from 'react-redux';

const businessData={
    name:'',
    designation:"",
    email:'webgraphagency@gmail.com',
    website:'webgraphagency.com',
    number:{number1:'98765543210',number2:'9876543210'},
    logo:'https://cdn.pixabay.com/photo/2019/01/23/21/16/pixabay-3951079_1280.png',
    address:'Poonam sagar complex, mira road, 401107',
}

const Frame5 = () => {
    const businessData = useSelector((state:RootState)=>state.businessDetails)
    
  return (
        <View className='w-full absolute bottom-0 bg-white'>
            <View className='bg-white px-8 py-1 relative'>
            <View className='absolute right-4 bottom-4 border-4 border-orange-400 rounded-xl'>
            <Image source={{uri:"https://webgraphagency.com/wp-content/uploads/2023/04/testimonial2.jpg"}} style={{minHeight:80,minWidth:70}} resizeMode='cover'/>
            </View>
            
            <View className='w-full'>
                <Text className='text-xl'>{businessData.businessName ? businessData.businessName:"your name"}</Text>
                <Text className='text-base'>{businessData.designation? businessData.designation:"designation"}</Text>
            </View>
            </View>
            <View className='w-full justify-center  items-start'>
            <View className='bg-orange-400 py-1 px-8 w-full justify-center'>
                <Text className='text-base text-white'>{businessData.location ?businessData.location:"location"}</Text>
            </View>
            </View>
        </View>        
  );
};
export default Frame5;
