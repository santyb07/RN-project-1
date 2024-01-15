import React,{FC} from 'react'
import { View,Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/appNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { setItem } from '../utils/asyncStorage';
import Onboarding, { DoneButtonProps, NextButtonProps, SkipButtonProps, DotProps } from 'react-native-onboarding-swiper'; 
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import { colors } from '../utils/constants';

const {width, height} = Dimensions.get('window');
interface OnboardingScreenProps{
    navigation: StackNavigationProp<RootStackParamList,'Onboarding'>,
}
const OnboardingScreen= ({navigation}:OnboardingScreenProps) => {
    // const navigation = useNavigation();


    const handleDone=()=>{
        navigation.replace("Login");
    }
    const Next=({...props}:DoneButtonProps)=>{
        return(
        
         <TouchableOpacity className='mx-10' {...props}>
          <View style={styles.btnView}>
             <FontAwesomeIcon name="arrow-circle-right" color={"#ffffff"} size={60} />
         </View>
     </TouchableOpacity>
        )
    }
    const Done=({...props}:DoneButtonProps)=>{
        return(
            <TouchableOpacity className='mx-10'
            {...props}>
             <View style={styles.btnView}>
                <FontAwesomeIcon name="check-circle" color={"#ffffff"} size={60} />
            </View>
        </TouchableOpacity>
        )
    }
  
    const Skip = ({...props}:SkipButtonProps) => (
        <TouchableOpacity
            style={{marginHorizontal:10,...styles.navButton}}
            {...props}
        >
            <Text style={{fontSize:16,color:'white'}}>Skip</Text>
        </TouchableOpacity>
    );
    const Dots = ({selected}:DotProps) => {
        return (
            <View 
            className={`
            ${selected ?
            'border px-3 py-1 mx-3 border-transparent rounded-md transition-all ease-in duration-700 opacity-100 bg-white':
            'border px-1 py-1 mx-3 border-transparent rounded-md bg-gray-700'
            }
            `}
            />
        );
    }
    
  return (
    //   <View style={styles.container}>
        <View className="flex-1">
        <StatusBar backgroundColor="#4473c2" barStyle='light-content'/>
        <Onboarding
        onDone={handleDone}
        // onSkip={handleDone}
        showSkip={false}
        bottomBarHeight={100}
        bottomBarHighlight={false}
        // imageContainerStyles={{backgroundColor:'#4287f5',width:'100%'}}
        NextButtonComponent={Next}
        // SkipButtonComponent={Skip}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        containerStyles={{paddingHorizontal:30,paddingBottom:80,backgroundColor:'#4287f5'}}
        titleStyles={styles.title}
        subTitleStyles={styles.subTitle}
        pages={[{
            backgroundColor:`${colors.ActiveColor}`,
            image:(
             <LottieView  style={styles.lottie} source={require('../assets/animations/digital-marketing-4.json')} autoPlay loop/>
            ),
            // title:<Text style={styles.title}>Welcome to ABC Agency</Text>,
            title:'Welcome to ABC Agency',
            subtitle:'Elevate your brand with our digital expertise.'
        },
        {
            backgroundColor:`${colors.ActiveColor}`,
            image:(
                    <LottieView  style={styles.lottie} source={require('../assets/animations/digital-marketing-2.json')} autoPlay loop/>
                ),
            title:'Unleash Marketing Potential',
            subtitle:'Explore powerful strategies tailored for your business success.'
        },
        {
            backgroundColor:`${colors.ActiveColor}`,
            image:(
                    <LottieView style={styles.lottie} source={require('../assets/animations/digital-marketing-3.json')} autoPlay loop/>
            ),
            title:"Let's Get Started",
            subtitle:'Dive into the world of effective digital marketing. Your journey begins now.'
        }]}
        />
    
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#FFFFFF'
    },
    linearGradient:{
        // flex:1,
        
    },
    lottie:{
        width: width*0.9,
        height: width,
    },
    title:{
        fontSize:28,
        color:'#FFFFFF',
        // color:'black',
        // backgroundColor:'#ffffff',
        // fontWeight:'700',
        textAlign:'center',
        // marginBottom:15,
        fontFamily:'Montserrat-Bold'
    },
    subTitle:{
        fontSize:17,
        color:'#FFFFFF',
        // color:'#000000',
        // backgroundColor:'#ffffff',
        fontFamily:'Montserrat-Regular'
    },
    btnView:{
        width: '100%',
        height: '100%',
        justifyContent:"center",
        alignItems:'flex-end',
        backgroundColor: '#4287f5',
        // backgroundColor:'#ffffff',
        // opacity:0.7,
        borderRadius: 50,
    },
    btnText:{
        color: 'black',
        fontSize: 32,
        textAlign: 'center',
    },
    navButton:{
        width:'30%',
        height:40,
        backgroundColor:'black',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    doneButton: {
        paddingHorizontal: 20,
        paddingVertical:20,
        // backgroundColor: 'white',
        // borderTopLeftRadius: 100,
        // borderBottomLeftRadius: 100,
    },
})