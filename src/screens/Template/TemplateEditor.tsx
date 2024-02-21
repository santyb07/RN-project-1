import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import IonicAwesomeIcons from 'react-native-vector-icons/Ionicons';

import {colors} from '../../utils/constants';
import {Button, Slider} from '@rneui/base';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/appNavigation';
import {useRoute} from '@react-navigation/native';
import {captureRef} from 'react-native-view-shot';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {showMessage} from 'react-native-flash-message';
import Share from 'react-native-share';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import Frame1 from './components/frames/Frame1';
import Frame2 from './components/frames/Frame2';
import Frame3 from './components/frames/Frame3';
import Frame4 from './components/frames/Frame4';
import Frame5 from './components/frames/Frame5';
import Frame6 from './components/frames/Frame6';
import Frame7 from './components/frames/Frame7';
import Frame8 from './components/frames/Frame8';
import HeaderBar from '../components/HeaderBar';
import TemplateHeaderBar from './components/TempHeaderBar';
import Frame9 from './components/frames/Frame9';
import Frame10 from './components/frames/Frame10';
import Frame11 from './components/frames/Frame11';
import Selectframe from './SelectFrame';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { selectFrame } from '../../redux/features/businessDetailsSlice';

interface TemplateEditorProps {
  navigation: StackNavigationProp<RootStackParamList, 'TemplateEditor'>;
}
interface EditTemplatesParams {
  templateImg: string;
  promotion: boolean;
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
const TemplateEditor = ({navigation}: TemplateEditorProps) => {
  const route = useRoute();
  const {templateImg, promotion} = route.params as EditTemplatesParams;
  const [logoSize, setLogoSize] = useState({height: 20, width: 40});
  const [logoPosition, setLogoPosition] = useState('left');
  const viewShotRef = useRef(null);
  const [logoVisible, setLogoVisible] = useState<boolean | null>(true);
  const businessData = useSelector((state: RootState) => state.businessDetails);
  const [aspectRatio,setAspectRatio] = useState<number>()
  const [openSelectFrame,setOpenSelectFrame]= useState(true);
  const translateY = useSharedValue(150);
  const [selectedFrame,setSelectedFrame] = useState(businessData.selectedFrame);
  const dispatch = useDispatch();

  // console.warn(businessData.selectedFrame)

  // console.warn(route.params)
  const adjustLogoSize = (height: number) => {
    // let newHeight = height + 5;
    // let newWidth = newHeight + 20;
    // setLogoSize({height: newHeight, width: newWidth});
    setLogoSize(val=>({...val,width:val.width+5}))
  };
  const handleFrameSelection=()=>{
    if(openSelectFrame){
      translateY.value =withTiming(-180,{duration:300});
    }else{
      translateY.value =withTiming(180,{duration:300});
      console.log('frame selected')
    }
    setOpenSelectFrame((val)=>!val)
}
const ChangeFrame=()=>{
  dispatch(selectFrame(selectedFrame))

}
  // const increaseLogoSize = () => {
  //   // let newHeight = height + 5;
  //   // let newWidth = newHeight + 20;
  //   // setLogoSize({height: newHeight, width: newWidth});
  //   if(logoSize.width<250){
  //     setLogoSize(val=>({...val,width:val.width+2}))
  //   }
  // };
  const increaseLogoSize = () => {
    if (logoSize.width < 80) {
      // Increase width while maintaining aspect ratio
      const newWidth = logoSize.width + 2;
      const newHeight = (newWidth / 7) * 5;
      setLogoSize({ width: newWidth, height: newHeight });
    }
  };
  useEffect(()=>{
    if(businessData.logo){
      Image.getSize(businessData.logo, (width, height) => {
        console.log('height:',height,'width:',width)
        const ratio= width/height;
        setAspectRatio(ratio);
      });
    }
  },[])
  const handlePress = () => {
    translateY.value -= 100;
};
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value}],
  }));
  // const decreaseLogoSize = () => {
  //   // let newHeight = height + 5;
  //   // let newWidth = newHeight + 20;
  //   // setLogoSize({height: newHeight, width: newWidth});
  //   if(logoSize.width>20){
  //     setLogoSize(val=>({...val,width:val.width-2}))
  //   }
  // };
  const decreaseLogoSize = () => {
    if (logoSize.width > 20) {
      // Decrease width while maintaining aspect ratio
      const newWidth = logoSize.width - 2;
      const newHeight = (newWidth / 7) * 5;
      setLogoSize({ width: newWidth, height: newHeight });
    }
  };
  const adjustLogoPosition = (pos: string) => {
    setLogoPosition(pos);
    // console.warn(logoPosition,pos)
  };
  const saveImage = async (action: string) => {
    if (viewShotRef.current) {
      try {
        const uri = await captureRef(viewShotRef, {
          fileName: 'webBrand',
          format: 'jpg',
          //only jpeg images will be compressed
          quality: 0.2,
        });
        if (action == 'share') {
          await Share.open({message: 'Made in ❤ with WebBrand', url: uri})
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              err && console.log(err);
            });
        } else {
          await CameraRoll.saveAsset(uri)
            .then(resp => {
              console.log(resp.node.image.uri);
              showMessage({
                message: 'Image Downloaded Successfully',
                // description: "This is our second message",
                type: 'success',
                titleStyle: {
                  fontFamily: 'Montserrat-Bold',
                  textAlign: 'center',
                  color: '#FFFFFF',
                },
                // backgroundColor:"#000000"
              });
            })
            .catch(err => console.log('err:', err));
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  return (
    <SafeAreaView className='flex-1'>
    <View className="flex-1 justify-start items-center bg-white">
      <TemplateHeaderBar saveImage={saveImage} />
      {/* Image container with logos and text */}
      <View
        className={`relative w-full h-[60vh]`}
        // className={`relative w-full h-3/5`}
        ref={viewShotRef}
        collapsable={false}>
        {/* Logos on left and right */}

        {promotion ? (
          <View className="absolute top-2 left-2 right-2 z-10 flex-1 flex-row justify-between">
            {businessData.logo && logoVisible && (
              <Image
                source={{uri: businessData.logo}}
                style={{minHeight: logoSize.height, minWidth: logoSize.width}}
                resizeMode="contain"
              />
            )}
            <Image
              source={{
                uri: 'https://res.cloudinary.com/drxhgcqvw/image/upload/v1705428150/ysxh4cpuke6va2sqhou8.png',
              }}
              style={{minHeight: 50, minWidth: 70}}
              resizeMode="contain"
            />
          </View>
        ) : (
          // <View className={`absolute top-2 left-2 right-2 z-10 flex-1 flex-row justify-${logoPosition}`}>
          <View
            style={{
              position: 'absolute',
              // position:'relative',
              top: 12,
              left: 12,
              right: 12,
              zIndex: 10,
              flex: 1,
              flexDirection: 'row',
              // alignItems:'flex-start',
              // alignItems:'flex-end',
              justifyContent: `${
                logoPosition == 'center'
                  ? 'center'
                  : logoPosition == 'left'
                  ? 'flex-start'
                  : 'flex-end'
              }`,
            }}>
            {businessData.logo && logoVisible && (
              <Image
                source={{uri: businessData.logo}}
                style={{minHeight: logoSize.height, minWidth:logoSize.width,aspectRatio:aspectRatio}}
                // style={{
                //   width: logoSize.width, // Adjusted width
                //   height: 'auto', // Auto height based on aspect ratio
                //   aspectRatio: 1, // Square aspect ratio
                //   resizeMode: 'contain', // Experiment with different resize modes
                // }}
                resizeMode="contain"
              />
            )}
          </View>
         
        )}

        {/* Main image taking full width and 50% of the screen height */}
        <Image
          source={{uri: templateImg}}
          className="flex-1"
          resizeMode="cover"
        />
         {/* <Image
          source={{uri: "https://res.cloudinary.com/drxhgcqvw/image/upload/v1707575650/WhatsApp_Image_2024-02-10_at_6.36.51_PM_1_mjoufm.jpg"}}
          className="flex-1"
          resizeMode="contain"
        /> */}

        {/* Text details above the image */}
        {businessData.selectedFrame === 'frame1' && <Frame1 />}
        {businessData.selectedFrame === 'frame2' && <Frame2 />}
        {businessData.selectedFrame === 'frame3' && <Frame3 />}
        {businessData.selectedFrame === 'frame4' && <Frame4 />}
        {businessData.selectedFrame === 'frame5' && <Frame5 />}
        {businessData.selectedFrame === 'frame6' && <Frame6 />}
        {businessData.selectedFrame === 'frame7' && <Frame7 />}
        {businessData.selectedFrame === 'frame8' && <Frame8 />}
        {businessData.selectedFrame === 'frame9' && <Frame9 />}
        {businessData.selectedFrame === 'frame10' && <Frame10 />}
        {businessData.selectedFrame === 'frame11' && <Frame11 />}
        {!businessData.selectedFrame && <Frame1 />}
      </View>
      <View className="flex-col px-3 py-3 mt-2">
        <View className="flex-row justify-between space-x-4 items-center">
          <Text className="text-lg font-[Montserrat-Bold]">Logo</Text>
          {logoVisible ? (
            <View className="border p-1 rounded-md">
              <IonicAwesomeIcons
                name="eye"
                size={30}
                onPress={() => setLogoVisible(false)}
              />
            </View>
          ) : (
            <View className="border p-1 rounded-md">
              <IonicAwesomeIcons
                name="eye-off"
                size={30}
                onPress={() => setLogoVisible(true)}
              />
            </View>
          )}
        </View>
        <View className=" flex-row space-x-4 justify-center item-center">
          <View className="flex-row justify-around items-center space-x-3 border rounded-xl  py-1 px-3 mt-3">
            {/* <IonicAwesomeIcons name='resize-outline' size={30} style={{alignItems:'center',justifyContent:'center',borderColor:'#494848'}}/> */}
            {/* <Slider
              style={{width: 80}}
              disabled={!logoVisible}
              minimumValue={10}
              maximumValue={90}
              step={1}
              value={logoSize.height}
              trackStyle={{height: 3, backgroundColor: 'blue'}}
              thumbStyle={{
                height: 15,
                width: 15,
                backgroundColor: `${colors.ActiveColor}`,
              }}
              onValueChange={(value: number) => adjustLogoSize(value)}
            /> */}
            <TouchableOpacity>
            <FontAwesomeIcons name='minus-square' size={30} color={colors.ActiveColor} onPress={decreaseLogoSize}/>
            </TouchableOpacity>
            <View>
            <Text className='text-xl font-["Montserrat-Semibold"]'>
              {logoSize.width}
            </Text>
            </View>
            <TouchableOpacity>
            <FontAwesomeIcons name='plus-square' size={30} color={colors.ActiveColor} onPress={increaseLogoSize}/>
            </TouchableOpacity>
          </View>

          {!promotion && businessData.logo && logoVisible ? (
            <View className="flex-row space-x-3 border py-1 mt-3 px-1 justify-around rounded-xl">
              <FontAwesomeIcons
                name="align-left"
                size={25}
                onPress={() => adjustLogoPosition('left')}
                style={{
                  backgroundColor: `${
                    logoPosition == 'left' ? colors.ActiveColor : 'white'
                  }`,
                  color: `${logoPosition == 'left' ? 'white' : 'black'}`,
                  padding: 8,
                  borderRadius: 10,
                }}
              />
              <FontAwesomeIcons
                name="align-center"
                size={25}
                onPress={() => adjustLogoPosition('center')}
                style={{
                  backgroundColor: `${
                    logoPosition == 'center' ? colors.ActiveColor : 'white'
                  }`,
                  color: `${logoPosition == 'center' ? 'white' : 'black'}`,
                  padding: 8,
                  borderRadius: 10,
                }}
              />
              <FontAwesomeIcons
                name="align-right"
                size={25}
                onPress={() => adjustLogoPosition('end')}
                style={{
                  backgroundColor: `${
                    logoPosition == 'end' ? colors.ActiveColor : 'white'
                  }`,
                  color: `${logoPosition == 'end' ? 'white' : 'black'}`,
                  padding: 8,
                  borderRadius: 10,
                }}
              />
            </View>
          ) : (
            <View className="flex-row space-x-3 border py-1 mt-3 px-1 justify-around rounded-xl">
              <FontAwesomeIcons
                name="align-left"
                size={25}
                onPress={() => adjustLogoPosition('left')}
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  padding: 8,
                  borderRadius: 10,
                }}
              />
              <FontAwesomeIcons
                name="align-center"
                size={25}
                onPress={() => adjustLogoPosition('center')}
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  padding: 8,
                  borderRadius: 10,
                }}
              />
              <FontAwesomeIcons
                name="align-right"
                size={25}
                onPress={() => adjustLogoPosition('end')}
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  padding: 8,
                  borderRadius: 10,
                }}
              />
            </View>
          )}
        </View>
      </View>
        <Animated.View style={[styles.box,animatedStyles]}>
        <ScrollView className='' horizontal>
        <View className='flex-col px-4'>
            {/* <View>
            <Text className='text-lg font-[Montserrat-Medium] px-6 underline'>Business</Text>
            </View> */}
        <View className='flex-row justify-around items-center space-x-3 px-4 py-4'>
            {
                FrameData.map((val,index)=>(
                    // <View key={index}>
                    <TouchableOpacity className={(businessData.selectedFrame===val) ? "border-4 border-white bg-orange-400 rounded-xl":"border-2 bg-white rounded-xl" } key={index} 
                    onPress={()=>  dispatch(selectFrame(val))}>
                    <Image source={{uri:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg'}} 
                    height={140} 
                    width={100} 
                    resizeMode='contain'
                    /> 
                    </TouchableOpacity>
                    // </View>
                    ))
                }
        </View>
        </View>
        </ScrollView>
        <View className=' px-4 py-2 bg-black-300'>
        <TouchableOpacity className='flex-row space-x-2 justify-center items-center px-4 py-3 border bg-white rounded-xl'
         onPress={handleFrameSelection}
        >
          <MaterialIcons name='image-frame' size={24} color={'black'}/>
          <Text className={'font-[Montserrat-Medium] text-lg text-center text-black'}>Select Frame</Text>
          {/* <FeatherIcons name='arrow-right' size={24} color={'black'}/> */}
      </TouchableOpacity>
        </View>
        </Animated.View>
      <View className=" absolute bottom-0 px-4 left-0 right-0 w-full py-2 z-50">
        <TouchableOpacity
          // onPress={() => navigation.navigate('ChooseFrame')}
          // onPress={()=>setOpenSelectFrame((val)=>!val)}
          onPress={handleFrameSelection}
          className="flex-row justify-center items-center space-x-3 py-3 border rounded-xl px-4 border-black">
          <MaterialIcons name="image-frame" size={24} color={'black'} />
          <Text className={'font-[Montserrat-Medium] text-lg text-black'}>
            Select Frames
          </Text>
          {/* <FeatherIcons name="arrow-right" size={24} color={'black'} /> */}
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  box: {
    height: 250,
    width: '100%',
    // backgroundColor: 'orange',
    backgroundColor:'#191919',
    // borderRadius: 20,
    borderTopStartRadius:20,
    borderTopRightRadius:20,
    marginVertical: 50,
    zIndex:100,
  },
});

export default TemplateEditor;
