import React, { useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectFrame } from '../../redux/features/businessDetailsSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/appNavigation';
import { RootState } from '../../redux/store/store';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors } from '../../utils/constants';

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
const Selectframe = () => {
    const dispatch = useDispatch();
    const businessData = useSelector((state:RootState)=>state.businessDetails)
    const [selectedFrame,setSelectedFrame] = useState(businessData.selectedFrame);
    const translateY = useSharedValue(-150);

    const handlePress = () => {
        translateY.value -= 100;
    };
      const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring(translateY.value * 2) }],
      }));

    const handleFrameSelection=()=>{
        // dispatch(selectFrame(selectedFrame))
        // navigation.pop(1)
        console.log(selectedFrame)
    }
    
  return (
        <Animated.View style={[styles.box,animatedStyles]}>
        <ScrollView className='' horizontal>
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
        </ScrollView>
        <View className='px-4 py-2'>
        <TouchableOpacity onPress={handlePress} className=' px-4 py-3 border rounded-xl'>
          {/* <MaterialIcons name='image-frame' size={24} color={'black'}/> */}
          <Text className={'font-[Montserrat-Medium] text-lg text-center text-black'}>Select Frames</Text>
          {/* <FeatherIcons name='arrow-right' size={24} color={'black'}/> */}
      </TouchableOpacity>
        </View>
        </Animated.View>
  );
};

export default Selectframe

const styles=StyleSheet.create({
    box: {
        height: 300,
        width: '100%',
        // backgroundColor: 'black',
        backgroundColor:'white',
        borderRadius: 20,
        marginVertical: 50,
      },
})