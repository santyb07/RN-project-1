import React, { useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import AntIcons from "react-native-vector-icons/AntDesign"
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import IonicAwesomeIcons from "react-native-vector-icons/Ionicons"

import { Button, Slider } from '@rneui/base';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import FeatherIcons from "react-native-vector-icons/Feather"
import FlashMessage, { showMessage } from 'react-native-flash-message'
// import { Share } from 'react-native';
import Share from 'react-native-share';
import { useSelector } from 'react-redux';
import { colors } from '../../../utils/constants';

const { width, height } = Dimensions.get('window');

const templateData={
    templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg',
    promotion:false,
}
const businessData={
    name:'',
    designation:"",
    email:'webgraphagency@gmail.com',
    website:'webgraphagency.com',
    number:{number1:'98765543210',number2:'9876543210'},
    logo:'https://cdn.pixabay.com/photo/2019/01/23/21/16/pixabay-3951079_1280.png',
    address:'Poonam sagar complex, mira road, 401107',
}


interface EditTemplatesParams {
  templateImg: string;
  promotion: boolean;
}

const KarykartaTemp = () => {
  const route=useRoute();
//   const {templateImg,promotion} = route.params as EditTemplatesParams;
  const [logoSize,setLogoSize]=useState({height:50,width:70});
  const [logoPosition,setLogoPosition] = useState('left');
  const viewShotRef = useRef(null);
  const [logoVisible,setLogoVisible]=useState<boolean | null>(true);
//   const businessData = useSelector((state:RootState)=>state.businessDetails)
  // console.warn(businessData.logo)
  
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
            // format:'png',
            quality:0.7,
          })
          if(action=='share'){
            await Share.open({message:'Made in ❤ with WebBrand',url:uri})
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {err && console.log(err);
            });
          }else{
            await CameraRoll.saveToCameraRoll(uri)
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
      {/* Image container with logos and text */} 
      <View style={styles.imageContainer} ref={viewShotRef}>
        {/* Logos on left and right */}
        
        {
            templateData.promotion ? 
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
                <View className={`absolute bottom-10 left-2 border-4 border-orange-400 rounded-xl z-10 flex-1 flex-row justify-${logoPosition}`}>
                  {/* // <View style={{position:'absolute',top:2,left:2,right:2,zIndex:10,backgroundColor:'blue',flex:1,flexDirection:'row',justifyContent:`flex-end`}}> */}
                    {
                     (businessData.logo && logoVisible) &&
                       <Image source={{uri:"https://webgraphagency.com/wp-content/uploads/2023/04/testimonial2.jpg"}} style={{minHeight:80,minWidth:70}} resizeMode='cover'/>
                    }
                </View>
            )
        }

        {/* Main image taking full width and 50% of the screen height */}
        <Image source={{uri:templateData.templateImg}} style={styles.image}/>

        {/* Text details above the image */}
       
        <View className='w-full absolute bottom-0'>
            <View className='bg-white pl-28 py-1 justify-center'>
                <Text className='text-xl'>{businessData.name ? businessData.name:"देवेंद्र फडणवीस"}</Text>
                <Text className='text-base'>{businessData.designation? businessData.designation:"उपमुख्यमंत्री "}</Text>
            </View>
            {/* <View className='bg-orange-400 pl-12 py-1 mr-16  rounded-br-full justify-center'>
                <Text className='text-base text-white'>{!businessData.address ?businessData.address:"महाराष्ट्र राज्य "}</Text>
            </View> */}
            <View className='w-full justify-center bg-black items-center'>
            <View className='bg-orange-400 pl-12 py-1 px-20 rounded-2xl justify-center'>
                <Text className='text-base text-white'>{!businessData.address ?businessData.address:"महाराष्ट्र राज्य "}</Text>
            </View>
            </View>
        </View>
        
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position:'relative',
  },
  imageContainer: {
    position: 'relative',
    width: width,
    height: height * 0.6,
    borderWidth:7,
    borderRadius:10,
    borderColor:colors.ActiveColor,
    // display:'flex'
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

export default KarykartaTemp;
