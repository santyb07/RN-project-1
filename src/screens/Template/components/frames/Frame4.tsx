import React from 'react';
import { View, Image, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';


const Frame4 = () => {
    const businessData = useSelector((state:RootState)=>state.businessDetails)
    
  return (
        <View className='w-full absolute bottom-0 bg-white'>
            <View className='bg-white px-8 py-1 relative'>
            <View className='absolute right-4 bottom-4 border-4 border-orange-400 rounded-xl'>
            <Image source={{uri:"https://webgraphagency.com/wp-content/uploads/2023/04/testimonial2.jpg"}} style={{minHeight:80,minWidth:70}} resizeMode='cover'/>
            </View>
            
            <View className='w-full'>
                <Text className='text-xl font-[Montserrat-SemiBold]'>{businessData.businessName ? businessData.businessName:"your name"}</Text>
                <Text className='text-base'>{businessData.designation? businessData.designation:"designation"}</Text>
            </View>
            </View>
            <View className='w-full justify-center  items-start'>
            <View className='bg-orange-400 pl-12 py-1 px-20 rounded-r-2xl justify-center'>
                <Text className='text-base text-white'>{businessData.location ?businessData.location:"location"}</Text>
            </View>
            </View>
        </View>        
  );
};
export default Frame4;
