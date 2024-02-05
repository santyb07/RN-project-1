import React, { useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons"
import AntIcons from "react-native-vector-icons/AntDesign"
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import IonicAwesomeIcons from "react-native-vector-icons/Ionicons"

import { colors } from '../../utils/constants';
import { Button, Slider } from '@rneui/base';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/appNavigation';
import { useRoute } from '@react-navigation/native';
import { captureRef } from 'react-native-view-shot';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import FeatherIcons from "react-native-vector-icons/Feather"
import { showMessage } from 'react-native-flash-message'
import Share from 'react-native-share';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
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

interface TemplateEditorProps{
    navigation: StackNavigationProp<RootStackParamList,"TemplateEditor">,
}
interface EditTemplatesParams {
  templateImg: string;
  promotion: boolean;
}

const TemplateEditor = ({navigation}:TemplateEditorProps) => {
  const route=useRoute();
  const {templateImg,promotion} = route.params as EditTemplatesParams;
  const [logoSize,setLogoSize]=useState({height:50,width:70});
  const [logoPosition,setLogoPosition] = useState('left');
  const viewShotRef = useRef(null);
  const [logoVisible,setLogoVisible]=useState<boolean | null>(true);
  const businessData = useSelector((state:RootState)=>state.businessDetails)
  // console.warn(businessData.selectedFrame)
  
  // console.warn(route.params)
    const adjustLogoSize=(height:number)=>{
        let newHeight=height+5;
        let newWidth=newHeight+20;
        setLogoSize({height:newHeight,width:newWidth})
    }
    const adjustLogoPosition=(pos:string)=>{
      setLogoPosition(pos);
      // console.warn(logoPosition,pos)
    }
    const saveImage = async (action:string) => {
      if (viewShotRef.current) {
        try{
          const uri= await captureRef(viewShotRef,{
            fileName:'webBrand',
            format:'jpg',
            //only jpeg images will be compressed
            quality:0.2
          })
          if(action=='share'){
            await Share.open({message:'Made in ❤ with WebBrand',url:uri})
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {err && console.log(err);
            });
          }else{
            await CameraRoll.saveAsset(uri)
            .then((resp) =>{
              console.warn(resp.node.image.uri)
              showMessage({
                message: "Image Downloaded Successfully",
                // description: "This is our second message",
                type: "success",
                titleStyle:{fontFamily:'Montserrat-Bold',textAlign:"center",color:'#FFFFFF'},
                // backgroundColor:"#000000"
              });
            }
            )
            .catch(err => console.warn('err:', err))
          }
        
        }catch(error){
          console.warn(error)
        }
      }
       
    };

  return (
    <View className='flex-1 justify-start items-center bg-white'>
      <TemplateHeaderBar saveImage={saveImage}/>
      {/* Image container with logos and text */} 
      <View className={`relative w-full h-[60vh]`} ref={viewShotRef} collapsable={false}>
        {/* Logos on left and right */}
        
        {
            promotion ? 
            (
                <View className='absolute top-2 left-2 right-2 z-10 flex-1 flex-row justify-between'>
                {
                    (businessData.logo && logoVisible) &&
                    <Image source={{ uri:businessData.logo}} style={{minHeight:logoSize.height,minWidth:logoSize.width}} resizeMode='contain'/>
                }
                  <Image source={{ uri:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1705428150/ysxh4cpuke6va2sqhou8.png'}} style={{minHeight:50,minWidth:70}} resizeMode='contain'/>
        
                </View>
            ):
            (
              // <View className={`absolute top-2 left-2 right-2 z-10 flex-1 flex-row justify-${logoPosition}`}>
              <View style={{position:'absolute',top:12,left:12,right:2,zIndex:10,flex:1,flexDirection:'row',justifyContent:`${logoPosition=='center'? 'center':(logoPosition=='left'? 'flex-start':'flex-end')}`,}}> 
                {
                  (businessData.logo && logoVisible) &&
                  <Image source={{ uri:businessData.logo}} style={{minHeight:logoSize.height,minWidth:logoSize.width}} resizeMode='contain'/>
                }
            </View>
            )
        }

        {/* Main image taking full width and 50% of the screen height */}
        <Image source={{uri:templateImg}} className='flex-1' resizeMode='contain'/>

        {/* Text details above the image */}
        {businessData.selectedFrame==='frame1' &&
                <Frame1/>
        }
        {businessData.selectedFrame==='frame2' &&
                <Frame2/>
        }
        {businessData.selectedFrame==='frame3' &&
                <Frame3/>
        }
        {businessData.selectedFrame==='frame4' &&
                <Frame4/>
        }
        {businessData.selectedFrame==='frame5' &&
                <Frame5/>
        }
        {businessData.selectedFrame==='frame6' &&
                <Frame6/>
        }
        {businessData.selectedFrame==='frame7' &&
                <Frame7/>
        }
         {businessData.selectedFrame==='frame8' &&
                <Frame8/>
        }
        {!businessData.selectedFrame &&
                <Frame1/>
        }
        </View>
        <View className='flex-col mt-10 px-3 py-3 rounded-md border-gray-400 border-2'>
        <View className='flex-row justify-between space-x-4 items-center'>
        <Text className='text-lg font-[Montserrat-Bold]'>Logo</Text>
        {
          logoVisible ? 
          (
          <View className='border p-1 rounded-md'>
            <IonicAwesomeIcons name='eye' size={30} onPress={()=>setLogoVisible(false)}/>
          </View>
          ):(
            <View className='border p-1 rounded-md'>
          <IonicAwesomeIcons name='eye-off' size={30} onPress={()=>setLogoVisible(true)}/>
          </View>
          ) 
        }
        </View>
        <View className=' flex-row space-x-4 justify-center item-center'>
        
          <View className='flex-row justify-around items-center space-x-3 border rounded-xl  py-1 px-3 mt-3'>
         {/* <IonicAwesomeIcons name='resize-outline' size={30} style={{alignItems:'center',justifyContent:'center',borderColor:'#494848'}}/> */}
         <Slider
             style={{ width: 80}}
            //  minimumValue={20}
            //  maximumValue={70}
            disabled={!logoVisible}
             minimumValue={10}
             maximumValue={90}
             step={1}
             value={logoSize.height}
             trackStyle={{ height: 3, backgroundColor:'blue'}}
             thumbStyle={{ height: 15, width: 15, backgroundColor:`${colors.ActiveColor}` }}
             onValueChange={(value:number) => adjustLogoSize(value)}
             />
         <Text className='text-xl font-["Montserrat-Semibold"]'>{logoSize.height}</Text>
         </View>
        
        {
            ((!promotion && businessData.logo) && (logoVisible)) ?
            <View className='flex-row space-x-3 border py-1 mt-3 px-1 justify-around rounded-xl'>
            <FontAwesomeIcons name='align-left' size={25} onPress={()=>adjustLogoPosition('left')} style={{backgroundColor:`${logoPosition=='left'? colors.ActiveColor:'white'}`,color:`${logoPosition=='left'? 'white':'black'}`,padding:8,borderRadius:10}}/>
            <FontAwesomeIcons name='align-center' size={25} onPress={()=>adjustLogoPosition('center')} style={{backgroundColor:`${logoPosition=='center'? colors.ActiveColor:'white'}`,color:`${logoPosition=='center'? 'white':'black'}`,padding:8,borderRadius:10}}/>
            <FontAwesomeIcons name='align-right' size={25} onPress={()=>adjustLogoPosition('end')} style={{backgroundColor:`${logoPosition=='end'? colors.ActiveColor:'white'}`,color:`${logoPosition=='end'? 'white':'black'}`,padding:8,borderRadius:10}}/>
        </View>:
         <View className='flex-row space-x-3 border py-1 mt-3 px-1 justify-around rounded-xl'>
         <FontAwesomeIcons name='align-left' size={25} onPress={()=>adjustLogoPosition('left')} style={{backgroundColor:'white',color:'black',padding:8,borderRadius:10}}/>
         <FontAwesomeIcons name='align-center' size={25} onPress={()=>adjustLogoPosition('center')} style={{backgroundColor:'white',color:'black',padding:8,borderRadius:10}}/>
         <FontAwesomeIcons name='align-right' size={25} onPress={()=>adjustLogoPosition('end')} style={{backgroundColor:'white',color:'black',padding:8,borderRadius:10,}}/>
     </View>
        }    
            </View>  
        </View>
            {/* <View className=' absolute bottom-0 left-0 right-0 flex-row w-full py-1 justify-around'>
        <TouchableOpacity onPress={()=>saveImage('download')} className='flex-row justify-center items-center space-x-3 py-3 border rounded-xl px-4 bg-orange-400 border-white'>
          <FeatherIcons name='download' size={20} color={'white'}/>
          <Text className={'font-[Montserrat-Medium] text-lg text-white'}>Download</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>saveImage('share')} className='flex-row  space-x-3 py-3 border rounded-xl px-10 bg-orange-400 border-white'>
          <FeatherIcons name='share-2' size={20} color={'white'}/>
          <Text className='font-[Montserrat-Medium] text-lg text-white'>Share</Text>
      </TouchableOpacity>
        </View>
         */}
        <View className=' absolute bottom-0 px-4 left-0 right-0 w-full py-2'>
        <TouchableOpacity onPress={()=>navigation.navigate('ChooseFrame')} className='flex-row justify-center items-center space-x-3 py-3 border rounded-xl px-4 border-black'>
          <MaterialIcons name='image-frame' size={24} color={'black'}/>
          <Text className={'font-[Montserrat-Medium] text-lg text-black'}>Select Frames</Text>
          <FeatherIcons name='arrow-right' size={24} color={'black'}/>
      </TouchableOpacity>
        </View>
        
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});

export default TemplateEditor;
