import { StackNavigationProp } from '@react-navigation/stack'
import React,{ useEffect, useRef, useState} from 'react'
import { Button, Dimensions, KeyboardAvoidingView, StatusBar, ViewStyle, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from '../navigation/appNavigation'
import PhoneInput from 'react-native-phone-input'
import LottieView from 'lottie-react-native'
import CheckBox from '@react-native-community/checkbox';
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { removeLaunch } from '../redux/features/onboardSlice'
import HeaderBar from './components/HeaderBar'
// import { AuthContext } from '../context/AuthContext'
// import { styled } from 'nativewind'
// import { SafeAreaView } from 'react-native-safe-area-context'
// const {width, height} = Dimensions.get('window');



interface LoginScreenProps{
    navigation: StackNavigationProp<RootStackParamList,"Login">,
}


const Login = ({navigation}:LoginScreenProps) => {
  const [number,setChangeNumber]= useState<string>("");
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(true)

  let disableLogin= (number.length>9 && toggleCheckBox==true) ? true:false;
  // console.warn(disableLogin);
  const onChanged =(text:string)=>{
    let mobile= text.replace(/[^0-9]/g, '');
    setChangeNumber(mobile);
    // console.warn(number)
}
  const handleLogin=()=>{
    navigation.navigate('VerifyOtp',{mobileNumber:number});
    // console.warn(number)
  }

  
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
        className='gray-600 border p-2.5 text-lg rounded-md text-black flex-grow focus:border-2 border-gray-300 focus:border-blue-800'
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
          tintColors={{true:'#4287f5',false:'#607a74'}}
          tintColor="black"
          value={toggleCheckBox}
          
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
          // className="border-4 bg-black border-black"
          />
          <Text className="text-[10px] font-['Montserrat-Light']">By continuing, you agree to our Terms & Privacy Policies</Text>
        </View>
        {/* <PhoneInput 
         ref={ref=>{
          phoneRef=ref;
         }}
        onPressFlag={()=>null}
         initialCountry='in'
         initialValue={number}
         textProps={{
             placeholder: 'Enter a phone number...'
         }}
         textStyle={{color:'black'}}
         onChangePhoneNumber={(value)=>onChanged(value)}
         
         
        /> */}
        </View>

      <TouchableOpacity className={`mt-5 py-2.5 rounded-md ${disableLogin? 'bg-blue-500':'bg-gray-300'}`}  onPress={handleLogin} disabled={!disableLogin}>
        <Text className="text-white text-xl text-center font-['Montserrat-Bold']" >Login</Text>
      </TouchableOpacity>
    </View>

  </View>
  // </SafeAreaView>
   
);
};

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   alignItems: 'center',
//   justifyContent: 'center',
//   backgroundColor:'#fff',
// },
// form: {
//   width: '80%',
// },
// label: {
//   marginTop: 20,
//   marginBottom:5
// },
// input: {
//   borderColor: '#ccc',
//   borderWidth: 1,
//   borderRadius: 5,
//   padding: 10,
//   fontSize: 18,
// },
// button: {
//   marginTop: 20,
//   backgroundColor: '#1E90FF',
//   borderRadius: 5,
//   paddingVertical: 10,
//   paddingHorizontal: 20,
// },
// buttonText: {
//   color: '#fff',
//   fontSize: 18,
//   textAlign:'center',
// },
// avatarContainer: {
//   marginTop: 10,
//   alignItems: 'center',

//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.8,
//   shadowRadius: 2,
//   elevation: 1,
// },
// avatar: {
//   width: 100,
//   height: 100,
//   borderRadius: 50,
// },
// });
export default Login

