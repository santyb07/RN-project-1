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
    'frame9',
    'frame10',
    'frame11',
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
    <SafeAreaView className='flex-1'>
        <View className='flex-1 pb-16 relative'>
        <ScrollView className=''>
        <View className='flex-col gap-y-2 '>
            <View>
            <Text className='text-lg font-[Montserrat-Medium] px-6 underline'>Business</Text>
            </View>
        <View className='flex-row justify-around items-center space-y-3 flex-wrap  '>
            {
                FrameData.map((val,index)=>(
                    // <View key={index}>
                    <TouchableOpacity className={(selectedFrame===val) ? "border-2 border-orange-500 rounded-xl":"border-2 border-gray-400 rounded-xl" } key={index} onPress={()=>setSelectedFrame(val)}>
                    <Image source={{uri:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg'}} 
                    height={180} 
                    width={140} 
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
            <View className='flex-row justify-around items-center space-y-3 flex-wrap  '>            
            {
                FrameData.map((val,index)=>(
                    // <View key={index}>
                    <TouchableOpacity className={(selectedFrame===val) ? "border-2 border-orange-500 rounded-xl":"border-2 border-gray-500 rounded-xl" } key={index} onPress={()=>setSelectedFrame(val)}>
                    <Image source={{uri:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg'}} 
                    height={180} 
                    width={140} 
                    resizeMode='contain'
                    /> 
                    </TouchableOpacity>
                    // </View>
                    ))
                }
        </View>
        </View>
        </ScrollView>
        <TouchableOpacity onPress={handleFrameSelection} className='absolute bottom-0 left-0 right-0 mx-2 my-2 flex-row justify-center items-center bg-orange-400 space-x-3 py-3 rounded-xl px-4 border-black'>
          {/* <MaterialIcons name='image-frame' size={24} color={'black'}/> */}
          <Text className={'font-[Montserrat-Medium] text-lg text-white'}>Select Frames</Text>
          {/* <FeatherIcons name='arrow-right' size={24} color={'black'}/> */}
      </TouchableOpacity>
        </View>
        </SafeAreaView>
  );
};
export default ChooseFrame;
