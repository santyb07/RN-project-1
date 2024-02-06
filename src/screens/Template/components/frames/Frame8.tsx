
import React from 'react';
import { View, Text} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';
import AntIcons from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"


const Frame8 = () => {
    const businessData = useSelector((state:RootState)=>state.businessDetails)

  return (
    <View className='w-full absolute bottom-0'>
        <View className='flex-row space-x-5 items-cnter px-5 py-1 bg-white'>
        <View className='justify-center items-start'>
        {
            businessData.email && 
            <View className='flex-row'>
            <MaterialIcons name='email' size={15} />
          <Text className='text-xs mx-2'>
           {businessData.email}</Text>
        </View>
        }
           {
            businessData.website && 
            <View className='flex-row'>
            <AntIcons name='earth' size={15} />
          <Text className='text-xs mx-2'>
           {businessData.website}</Text>
        </View>
        }
        
       
        </View>
        <View className='justify-center items-start'>
        {

            businessData.mobileNumber1 &&(
                <View className='flex-row gap-x-1'>
            <MaterialIcons name='local-phone' size={15}/>
          <Text className='text-xs mx-2'>
           {businessData.mobileNumber1}</Text>
        </View>
        )
    }
        {

            businessData.mobileNumber2 &&(
                <View className='flex-row gap-x-1'>
            <MaterialIcons name='local-phone' size={15}/>
          <Text className='text-xs mx-2'>
           {businessData.mobileNumber2}</Text>
        </View>
        )
    }
        </View>
        </View>
        {
            businessData.location &&(
            <View className=' bg-black flex-row py-2 px-2 justify-start items-center'>
            <MaterialIcons name='location-on' size={20} color={'white'}/>
          <Text className='text-xs text-white mx-3'>
           {businessData.location}</Text>
        </View>)
        }
        </View>
  );
};
export default Frame8;



 