import { StackNavigationProp } from '@react-navigation/stack'
import React,{ useEffect, useRef, useState} from 'react'
import {Dimensions, KeyboardAvoidingView, StatusBar, ViewStyle, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from '../navigation/appNavigation'
import PhoneInput from 'react-native-phone-input'
import LottieView from 'lottie-react-native'
import CheckBox from '@react-native-community/checkbox';
import { LogBox } from 'react-native';
import HeaderBar from './components/HeaderBar'
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { showMessage } from 'react-native-flash-message'
import { Button } from '@rneui/themed'
import { useDispatch } from 'react-redux'
import { setConfirmData } from '../redux/features/authSlice'
import { colors } from '../utils/constants'
// import { AuthContext } from '../context/AuthContext'
// import { styled } from 'nativewind'
// import { SafeAreaView } from 'react-native-safe-area-context'
// const {width, height} = Dimensions.get('window');

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

interface LoginScreenProps{
    navigation: StackNavigationProp<RootStackParamList,"Login">,
}


const Login = ({navigation}:LoginScreenProps) => {
  const [number,setChangeNumber]= useState<string>("");
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(true)
  // const [confirmData,setConfirmData] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [loading,setLoading] = useState<boolean>(false)
  const dispatch = useDispatch();


  let disableLogin= (number.length===10 && toggleCheckBox==true) ? true:false;
  // console.warn(disableLogin);
  const onChanged =(text:string)=>{
    let mobile= text.replace(/[^0-9]/g, '');
    setChangeNumber(mobile);
    // console.warn(number)
}
  const handleLogin=async()=>{
    try{
      setLoading(true);
      const mobileNumber= "+91" +number
      const confirmation = await auth().signInWithPhoneNumber(mobileNumber)
    console.log(confirmation)
    // setConfirmData(confirmation);
       showMessage({
        message: "OTP Sent Successfully",
        // description: "This is our second message",
        type: "success",
        titleStyle:{fontFamily:'Montserrat-Bold',textAlign:"center",color:'#FFFFFF'},
        // backgroundColor:"#000000"
      });
      dispatch(setConfirmData(confirmation))
      navigation.navigate('VerifyOtp',{mobileNumber:number});
      setLoading(false);
    }catch(err){
      setLoading(false)
      console.warn('error in firebase auth',err);
    }
    // console.warn(number)
  }
  useEffect(()=>{
    const user = auth().currentUser
    console.log('current User',user);
  },[])

  
  return (
    
    <View  className='flex-1 items-center justify-between pb-28'>
      <StatusBar  backgroundColor="#dadada" barStyle='light-content'/>    
      <HeaderBar name={''} logo={true} help={true} search={false}/>
    <View className='w-full flex justify-around items-center '>
      <Text className="text-2xl font-['Montserrat-Bold'] text-center">Grow Your Business With The Power of AI</Text>
      <LottieView  style={{
        width: '80%',
        height: '50%',}} source={require('../assets/animations/digital-marketing-1.json')} autoPlay loop/>
    </View>
      
    <View className='w-11/12 flex justify-center'>
      <View className='flex gap-2 pb-5'>
      <Text className="text-2xl font-['Montserrat-Bold']">Login</Text>
      <Text className="text-sm  font-['Montserrat-Medium']">Enter your phone number to proceed</Text>
      </View>
      <View>

      <Text className="my-2 text-black font-semibold text-sm font-['Montserrat-Medium'] pl-10">Mobile Number</Text>
      <View className='flex-row justify-center items-center gap-2'>
        <Text className="font-['Montserrat-Medium'] text-lg">+91</Text>
      <TextInput
        // style={styles.input}
        className='gray-600 border p-2.5 text-lg rounded-md text-black flex-grow focus:border-2 border-gray-300 focus:border-orange-400'
        placeholder="Enter your Number"
        value={number}
        onChangeText={(val)=>onChanged(val)}
        inputMode='numeric'
        // autoFocus={true}
        maxLength={10}
        keyboardType='numeric'
        />
        </View>
        <View className='flex-row justify-center items-center py-3 gap-2 '>
          <CheckBox
          disabled={false}
          tintColors={{true:'#F39424',false:'#607a74'}}
          tintColor="black"
          value={toggleCheckBox}
          
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
          // className="border-4 bg-black border-black"
          />
          <Text className="text-[10px] font-['Montserrat-Light']">By continuing, you agree to our Terms & Privacy Policies</Text>
        </View>
        </View>
        {
          loading ? 
          <View className='w-full justify-center items-center py-8'>
          <Button
          title="Login"
          loading={true}
          disabled={!disableLogin}
          loadingProps={{
            size: 'large',
            color: 'rgb(255, 255, 255)',
          }}
          titleStyle={{ fontFamily:'Montserrat-SemiBold',fontSize:20 }}
          buttonStyle={{
            backgroundColor:colors.ActiveColor,
            width:'100%',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
            // paddingVertical: 10,
          }}
          containerStyle={{
            width: '100%',
          }}
        />
        </View>:
         <View className='w-full justify-center items-center py-8'>
         <Button
         title="Login"
        //  loading={true}
         onPress={handleLogin}
         disabled={!disableLogin}
         titleStyle={{ fontFamily:'Montserrat-SemiBold',fontSize:20 }}
         buttonStyle={{
           backgroundColor: colors.ActiveColor,
           width:'100%',
           borderColor: 'transparent',
           borderWidth: 0,
           borderRadius: 30,
           paddingVertical: 14,
         }}
         containerStyle={{
           width: '100%',
         }}
       />
       </View>
        }
      
    </View>

  </View>
  // </SafeAreaView>
   
);
};

export default Login

