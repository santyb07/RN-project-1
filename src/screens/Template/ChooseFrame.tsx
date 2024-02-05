import React, { useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectFrame } from '../../redux/features/businessDetailsSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/appNavigation';
import { RootState } from '../../redux/store/store';

const { width, height } = Dimensions.get('window');

const businessData={
    name:'',
    designation:"",
    email:'webgraphagency@gmail.com',
    website:'webgraphagency.com',
    number:{number1:'98765543210',number2:'9876543210'},
    logo:'https://cdn.pixabay.com/photo/2019/01/23/21/16/pixabay-3951079_1280.png',
    address:'Poonam sagar complex, mira road, 401107',
}

const FrameData=[
    'frame1',
    'frame2',
    'frame3',
    'frame4',
    'frame5',
    'frame6',
    'frame7',
    'frame8',
]

interface ChooseFrameProps{
    navigation: StackNavigationProp<RootStackParamList,"ChooseFrame">,
}
const ChooseFrame = ({navigation}:ChooseFrameProps) => {
    const dispatch = useDispatch();
    const businessData = useSelector((state:RootState)=>state.businessDetails)
    const [selectedFrame,setSelectedFrame] = useState(businessData.selectedFrame);


    const handleFrameSelection=()=>{
        dispatch(selectFrame(selectedFrame))
        navigation.pop(1)
    }
    
  return (
        <View className='flex-1 pb-10 relative'>
        <ScrollView className=''>
        <View className='flex-col '>
            <Text className='text-lg font-[Montserrat-Medium] px-6 underline unde'>Business</Text>
        <View className='flex-row justify-start items-center gap-x-6 gap-y-6 flex-wrap  px-6 py-6'>
            {
                FrameData.map((val,index)=>(
                    // <View key={index}>
                    <TouchableOpacity className={(selectedFrame===val) ? "border-4 border-orange-500 rounded-xl":"border-4 border-gray-500 rounded-xl" } key={index} onPress={()=>setSelectedFrame(val)}>
                    <Image source={{uri:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg'}} 
                    height={180} 
                    width={150} 
                    resizeMode='contain'
                    /> 
                    </TouchableOpacity>
                    // </View>
                    ))
                }
        </View>
        </View>
        <View className='flex-col '>
            <Text className='text-lg font-[Montserrat-Medium] px-6 underline'>Political</Text>
        <View className='flex-row justify-start items-center gap-x-6 gap-y-6 flex-wrap  px-6 py-6'>
            {
                FrameData.map((val,index)=>(
                    // <View key={index}>
                    <TouchableOpacity className={(selectedFrame===val) ? "border-4 border-orange-500 rounded-xl":"border-4 border-gray-500 rounded-xl" } key={index} onPress={()=>setSelectedFrame(val)}>
                    <Image source={{uri:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg'}} 
                    height={180} 
                    width={150} 
                    resizeMode='contain'
                    /> 
                    </TouchableOpacity>
                    // </View>
                    ))
                }
        </View>
        </View>
        </ScrollView>
        <View className=' absolute bottom-0 px-4 left-0 right-0 w-full py-2 '>
        <TouchableOpacity onPress={handleFrameSelection} className='flex-row justify-center items-center bg-orange-400 space-x-3 py-3 rounded-xl px-4 border-black'>
          {/* <MaterialIcons name='image-frame' size={24} color={'black'}/> */}
          <Text className={'font-[Montserrat-Medium] text-lg text-white'}>Select Frames</Text>
          {/* <FeatherIcons name='arrow-right' size={24} color={'black'}/> */}
      </TouchableOpacity>
        </View>
        </View>
  );
};
export default ChooseFrame;
