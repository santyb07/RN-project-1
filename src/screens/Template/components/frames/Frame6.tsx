import React from 'react';
import { View, Image, Text } from 'react-native';
import { RootState } from '../../../../redux/store/store';
import { useAppSelector } from '../../../../redux/hooks';

const Frame6 = () => {
    const businessData = useAppSelector((state:RootState)=>state.businessDetails)
    
  return (
        <View className='w-full absolute bottom-0 '>
            <View className='bg-orange-400 px-8 py-1 relative'>
            <View className='absolute right-4 bottom-4 border-4 border-white rounded-xl'>
            <Image source={{uri:"https://webgraphagency.com/wp-content/uploads/2023/04/testimonial2.jpg"}} style={{minHeight:80,minWidth:70}} resizeMode='cover'/>
            </View>
            
            <View className='w-full'>
                <Text className='text-xl font-[Montserrat-SemiBold]'>{businessData.businessName ? businessData.businessName:"your name"}</Text>
                <Text className='text-base'>{businessData.designation? businessData.designation:"designation"}</Text>
            </View>
            </View>
            <View className='w-full justify-center  items-start'>
            <View className='bg-white py-1 px-8 w-full justify-center'>
                <Text className='text-base text-black'>{businessData.location ?businessData.location:"location"}</Text>
            </View>
            </View>
        </View>        
  );
};
export default Frame6;
