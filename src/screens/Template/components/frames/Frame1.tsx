import React from 'react';
import { View, Image, Text,Dimensions} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';

const Frame1 = () => {
    const businessData = useSelector((state:RootState)=>state.businessDetails)
    
  return (
        <View className='w-full absolute bottom-0 bg-white'>
            <View className='bg-white pl-28 py-1 relative'>
            <View className='absolute left-4 bottom-4 border-4 border-orange-400 rounded-xl'>
            <Image source={{uri:businessData.logo? businessData.logo:"https://webgraphagency.com/wp-content/uploads/2023/04/testimonial2.jpg"}} style={{minHeight:80,minWidth:70}} resizeMode='cover'/>
            </View>
            
            <View className='w-full '>
                <Text className='text-xl font-[Montserrat-SemiBold]'>{businessData.businessName ? businessData.businessName:"your name"}</Text>
                <Text className='text-base'>{businessData?.designation ? businessData.designation:"your designation"}</Text>
            </View>
            </View>
            <View className='bg-orange-400 pl-12 py-1 mr-16  rounded-r-full justify-center'>
                <Text className='text-base text-white'>{businessData.location? businessData.location:"location"}</Text>
            </View>
        </View>        
  );
};
export default Frame1;
