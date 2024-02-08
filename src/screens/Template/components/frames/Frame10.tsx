import React from 'react';
import { View, Image, Text} from 'react-native';
import { useAppSelector } from '../../../../redux/hooks';
import { RootState } from '../../../../redux/store/store';


const Frame10 = () => {
    const businessData = useAppSelector((state:RootState)=>state.businessDetails)
    
  return (
         <View className='w-full absolute bottom-0 '>
         <View className='bg-orange-400 px-8 py-1 relative'>
         <View className='absolute right-2 bottom-2 border-4 border-white rounded-xl'>
         <Image source={{uri:businessData.logo? businessData.logo:"https://webgraphagency.com/wp-content/uploads/2023/04/testimonial2.jpg"}} style={{minHeight:110,minWidth:100}} resizeMode='cover'/>
         </View>
         
         <View className='w-full pl-4'>
             <Text className='text-xl text-white font-[Montserrat-SemiBold]'>{businessData.businessName ? businessData.businessName:"your name"}</Text>
             <Text className='text-base text-white'>{businessData.designation? businessData.designation:"designation"}</Text>
             <Text className='text-base text-white'>{businessData.location? businessData.location:"location"}</Text>

         </View>

         {/* </View> */}
         {/* <View className='h-2 bg-black'> */}
         </View>
     </View>        
  );
};
export default Frame10;
