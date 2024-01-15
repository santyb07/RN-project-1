import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useRef, useState } from 'react'
import { Text, TextInput, TextInputComponent, TextInputProps, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from '../navigation/appNavigation'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import { showMessage } from 'react-native-flash-message'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/features/authSlice'
import HeaderBar from './components/HeaderBar'



interface VerifyOtpProps{
  navigation: StackNavigationProp<RootStackParamList,'VerifyOtp'>,
}

const VerifyOtp = ({navigation}:VerifyOtpProps) => {
  const mobileNumber=navigation.getState().routes[1].params?.mobileNumber;
  const dispatch = useDispatch();
  const [cnt,setCnt] = useState(0);
  const [seconds,setSeconds] = useState(30);
  const et1 = useRef<TextInput | null>(null);
  const et2 = useRef<TextInput | null>(null);
  const et3 = useRef<TextInput | null>(null);
  const et4 = useRef<TextInput | null>(null);
  const et5 = useRef<TextInput | null>(null);
  const et6 = useRef<TextInput | null>(null);
  const [f1,setF1] = useState('');
  const [f2,setF2] = useState('');
  const [f3,setF3] = useState('');
  const [f4,setF4] = useState('');
  const [f5,setF5] = useState('');
  const [f6,setF6] = useState('');

  const backToLogin=()=>{
    navigation.pop(1);
  }

  // console.warn(mobileNumber);

  let isDisableVerify= f1!=='' && f2!=='' && f3!=='' && f4!=='' && f5!=='' && f6!==''? false:true;

  const  handleVerify=()=>{
    if(cnt===0){
      showMessage({
        message: "Incorrect OTP",
        // description: "This is our second message",
        type: "danger",
        titleStyle:{fontFamily:'Montserrat-Bold',textAlign:"center",color:'#FFFFFF'},
        // backgroundColor:"#000000"
      });
      setCnt(1)
    }else{
      dispatch(loginUser(mobileNumber))
    }
   
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
          clearInterval(interval);
        }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });


  return (
    <View className='flex-1 pb-10 px-4 container'>
    <HeaderBar name={''} logo={true} help={true} search={false}/>

      <View className='flex flex-col gap-2'>
        <Text className='text-2xl font-["Montserrat-Bold"]'>
            Verify OTP
        </Text>
        <View className='flex-row justify-start items-center gap-2'>

        <Text className='text-md font-["Montserrat-Medium"]'>
            A OTP message was sent to {mobileNumber}
            {/* <Text onPress={backToLogin}>goback</Text> */}
        </Text>
        <TouchableOpacity onPress={backToLogin}>
         {/* style={{marginHorizontal:30,width:'70%',alignItems:'flex-end',justifyContent:'center'}}  */}
          <View>
             <FontAwesomeIcon name="edit" color={"#4287f5"} size={25} />
         </View>
     </TouchableOpacity>
        </View>
      </View>
      <View className='flex flex-col py-10'>
        <Text className='text-md mb-3 font-["Montserrat-SemiBold"]'>
            Enter OTP
        </Text>
        <View className='flex justify-center items-center flex-row gap-5'>
          <TextInput keyboardType='number-pad' maxLength={1} className={`w-10 h-10 rounded-md ${f1.length>=1? 'border-blue-400':'border-gray-400' }  border-2 text-center focus:border-blue-400 text-black text-xl`}
          ref={et1}
          value={f1}
          onChangeText={txt =>{
            setF1(txt);
            if(txt !=''){
              et2.current?.focus();
            }else{
              et1.current?.focus();
            }
          }}
          />
          <TextInput keyboardType='number-pad' maxLength={1} className={`w-10 h-10 rounded-md ${f2.length>=1? 'border-blue-400':'border-gray-400' }  border-2 text-center focus:border-blue-400 text-black text-xl`}
          ref={et2}
          value={f2}
          onChangeText={txt =>{
            setF2(txt);
            if(txt !=''){
              et3.current?.focus();
            }else if(txt.length<1){
              et1.current?.focus();
            }
          }}
          />
          <TextInput keyboardType='number-pad' maxLength={1} className={`w-10 h-10 rounded-md ${f3.length>=1? 'border-blue-400':'border-gray-400' }  border-2 text-center focus:border-blue-400 text-black text-xl`}
           ref={et3}
           value={f3}
           onChangeText={txt =>{
            setF3(txt);
            if(txt !=''){
               et4.current?.focus();
             }else if(txt.length<1){
              et2.current?.focus();
            }
           }}
          />
          <TextInput keyboardType='number-pad' maxLength={1} className={`w-10 h-10 rounded-md ${f4.length>=1? 'border-blue-400':'border-gray-400' }  border-2 text-center focus:border-blue-400 text-black text-xl`}
          ref={et4}
          value={f4}
          onChangeText={txt =>{
            setF4(txt);
            if(txt !=''){
              et5.current?.focus();
            }else if(txt.length<1){
              et3.current?.focus();
            }
          }}
          />
          <TextInput keyboardType='number-pad' maxLength={1} className={`w-10 h-10 rounded-md ${f5.length>=1? 'border-blue-400':'border-gray-400' }  border-2 text-center focus:border-blue-400 text-black text-xl`}
          ref={et5}
          value={f5}
          onChangeText={txt =>{
            setF5(txt);
            if(txt !=''){
              et6.current?.focus();
            }else if(txt.length<1){
              et4.current?.focus();
            }
          }}
          />
          <TextInput keyboardType='number-pad' maxLength={1} className={`w-10 h-10 rounded-md ${f6.length>=1? 'border-blue-400':'border-gray-400' }  border-2 text-center focus:border-blue-400 text-black text-xl`}
          ref={et6}
          value={f6}
          onChangeText={txt =>{
            setF6(txt);
            if(txt !=''){
              et6.current?.focus();
            }else if(txt.length<1){
              et5.current?.focus();
            }
          }}
         />
        </View>
        <Text className='text-md text-center mt-8 font-["Montserrat-SemiBold"]'>
          {
            seconds===0 ? 
            <Text onPress={()=> setSeconds(30)}>Resend OTP</Text>
            :`${seconds}s`
          }
        </Text>
       
      </View>
      <View>
      <TouchableOpacity className={`mt-5 py-2.5 rounded-md ${isDisableVerify? 'bg-gray-300':'bg-blue-500'}`}  onPress={handleVerify} disabled={isDisableVerify}>
        <Text className="text-white text-xl text-center font-['Montserrat-Bold']" >Verify</Text>
      </TouchableOpacity>
      </View>

    </View>
  )
}

export default VerifyOtp