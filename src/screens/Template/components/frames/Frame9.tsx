import React from 'react';
import { View, Image, Text} from 'react-native';
import { useAppSelector } from '../../../../redux/hooks';
import { RootState } from '../../../../redux/store/store';


const Frame9 = () => {
    const businessData = useAppSelector((state:RootState)=>state.businessDetails)
    
  return (
         <View className='w-full absolute bottom-0 '>
         <View className='bg-orange-400 px-8 py-1 relative'>
         <View className='absolute left-0 bottom-2 border-4 border-white rounded-xl'>
         <Image source={{uri:"https://webgraphagency.com/wp-content/uploads/2023/04/testimonial2.jpg"}} style={{minHeight:110,minWidth:100}} resizeMode='cover'/>
         </View>
         
         <View className='w-full pl-24'>
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
export default Frame9;
