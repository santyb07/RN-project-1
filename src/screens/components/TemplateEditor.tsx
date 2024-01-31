import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import AntIcons from "react-native-vector-icons/AntDesign"
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import IonicAwesomeIcons from "react-native-vector-icons/Ionicons"

import { colors } from '../../utils/constants';
import { Button, Slider } from '@rneui/base';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/appNavigation';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const templateData={
    templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg',
    promotion:false,
}
const businessData={
    email:'webgraphagency@gmail.com',
    website:'webgraphagency.com',
    number:{number1:'98765543210',number2:'9876543210'},
    brandlogo:'https://cdn.pixabay.com/photo/2019/01/23/21/16/pixabay-3951079_1280.png',
    address:'Poonam sagar complex, mira road, 401107',
}

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
  
  // console.warn(route.params)
    const adjustLogoSize=(height:number)=>{
        let newHeight=height+5;
        let newWidth=newHeight+20;
        setLogoSize({height:newHeight,width:newWidth})
    }
    
  return (
    <View className='flex-1 justify-start items-center bg-white'>
      {/* Image container with logos and text */} 
      <View style={styles.imageContainer}>
        {/* Logos on left and right */}
        
        {
            promotion ? 
            (
                <View className='absolute top-2 left-2 right-2 z-10 flex-1 flex-row justify-between'>
                {
                    businessData.brandlogo &&
                    <Image source={{ uri:businessData.brandlogo}} style={{minHeight:logoSize.height,minWidth:logoSize.width}} resizeMode='contain'/>
                }
                  <Image source={{ uri:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1705428150/ysxh4cpuke6va2sqhou8.png'}} style={{minHeight:50,minWidth:70}} resizeMode='contain'/>
        
                </View>
            ):
            (
                <View className={`absolute top-2 left-2 right-2 z-10 flex-1 flex-row justify-${logoPosition}`}>
                    {
                    businessData.brandlogo &&
                    <Image source={{ uri:businessData.brandlogo}} style={{minHeight:logoSize.height,minWidth:logoSize.width}} resizeMode='contain'/>
                    }
                </View>
            )
        }

        {/* Main image taking full width and 50% of the screen height */}
        <Image source={{uri:templateImg}} style={styles.image} />

        {/* Text details above the image */}
       
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

            businessData.number.number1 &&(
                <View className='flex-row gap-x-1'>
            <MaterialIcons name='local-phone' size={15}/>
          <Text className='text-xs mx-2'>
           {businessData.number.number1}</Text>
        </View>
        )
    }
        {

            businessData.number.number2 &&(
                <View className='flex-row gap-x-1'>
            <MaterialIcons name='local-phone' size={15}/>
          <Text className='text-xs mx-2'>
           {businessData.number.number2}</Text>
        </View>
        )
    }
        </View>
        </View>
        {
            businessData.address &&(
            <View className=' bg-black flex-row py-2 px-2 justify-start items-center'>
            <MaterialIcons name='location-on' size={20} color={'white'}/>
          <Text className='text-xs text-white mx-3'>
           {businessData.address}</Text>
        </View>)
        }
        </View>
        </View>
        <View className='flex-col w-full px-10 py-3'>
        <Text className='text-xl font-[Montserrat-Bold]'>Logo</Text>
        <View className='flex-row w-full justify-around
         items-center space-x-3 border rounded-xl  py-3 px-3 mt-3'>
        <IonicAwesomeIcons name='resize-outline' size={30} style={{borderWidth:2,borderRadius:5,alignItems:'center',justifyContent:'center',borderColor:'#494848'}}/>
        <Slider
            style={{ width: 200 }}
            minimumValue={20}
            maximumValue={70}
            step={1}
            value={logoSize.height}
            trackStyle={{ height: 3, backgroundColor:'blue'}}
            thumbStyle={{ height: 15, width: 15, backgroundColor:`${colors.ActiveColor2}` }}
            onValueChange={(value:number) => adjustLogoSize(value)}
            />
        <Text className='text-xl font-["Montserrat-Semibold"]'>{logoSize.height}</Text>
        </View>
        {
            (!promotion && businessData.brandlogo) &&
            <View className='flex-row space-x-3 border py-2 mt-3 px-3 justify-around rounded-xl'>
            <FontAwesomeIcons name='align-left' size={25} onPress={()=>setLogoPosition('left')} style={{backgroundColor:`${logoPosition=='left'? colors.ActiveColor:'white'}`,color:`${logoPosition=='left'? 'white':'black'}`,padding:8,borderRadius:10}}/>
            <FontAwesomeIcons name='align-center' size={25} onPress={()=>setLogoPosition('center')} style={{backgroundColor:`${logoPosition=='center'? colors.ActiveColor:'white'}`,color:`${logoPosition=='center'? 'white':'black'}`,padding:8,borderRadius:10}}/>
            <FontAwesomeIcons name='align-right' size={25} onPress={()=>setLogoPosition('end')} style={{backgroundColor:`${logoPosition=='end'? colors.ActiveColor:'white'}`,color:`${logoPosition=='end'? 'white':'black'}`,padding:8,borderRadius:10}}/>
        </View>
        }
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: width,
    height: height * 0.6,
    borderWidth:5,
    borderRadius:20,
    borderColor:colors.ActiveColor
  },
  logoContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
    display:'flex',
    // height:70,
    flexDirection:'row',
    justifyContent:'space-between',
    // backgroundColor:'yellow'
  },
  logo: {
    // width: 50,
    // width:null,
    // height:null,
    // height: 50,
    minHeight:50,
    minWidth:70,
    resizeMode: 'contain',
  },
  logoR: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default TemplateEditor;
