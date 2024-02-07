import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useRef, useState } from 'react'
import { Text, TextInput, TextInputComponent, TextInputProps, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from '../navigation/appNavigation'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import { showMessage } from 'react-native-flash-message'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/features/authSlice'
import HeaderBar from './components/HeaderBar'
import { useRoute } from '@react-navigation/native'
import PhoneSignIn from '../utils/firebase/PhoneSignIn'
import { Button } from '@rneui/themed'
import Auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { getToken } from '../utils/firebase/CommonUtils'


interface VerifyOtpProps{
  navigation: StackNavigationProp<RootStackParamList,'VerifyOtp'>,
}
interface VerifyOtp {
  mobileNumber: string;
  confirmData:FirebaseAuthTypes.ConfirmationResult | null
}

const VerifyOtp = ({navigation}:VerifyOtpProps) => {
  const route= useRoute();
  const { mobileNumber,confirmData } = route.params as VerifyOtp;
  const [loading,setLoading] = useState<boolean>(false);

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

  const  handleVerify=async()=>{
    try{
      setLoading(true)
      const otp=f1+f2+f3+f4+f5+f6;
      // console.warn(confirmData)
      const response = await confirmData?.confirm(otp)

      showMessage({
        message: "Logged In Successfully",
        // description: "This is our second message",
        type: "success",
        titleStyle:{fontFamily:'Montserrat-Bold',textAlign:"center",color:'#FFFFFF'},
        // backgroundColor:"#000000"
      });
      setLoading(false)
      // console.warn(Auth().currentUser?.uid);
    }catch(err){
      setLoading(false);
      console.log('Error in verifying the Otp',err)
    }
  }
  async function onAuthStateChanged(user:any) {
    if (user) {
      console.log(user)
      const notifyToken= getToken();

      const documentRef = await  (firestore() as any).collection('tokens').doc(user.uid);
      await documentRef.get()
      .then((docSnapshot:any) => {
        if (docSnapshot.exists) {
      console.log('Document already exists');
    } else {
      // Document doesn't exist, save the data
      documentRef.set({token:notifyToken})
        .then(() => {
          console.log('Document saved successfully');
        })
        .catch((error:any )=> {
          console.log('Error saving document:', error);
        });
    }
  }) .catch((error:any) => {
    console.log('Error checking document:', error);
  });

      // await firestore()
      // .collection('tokens')
      // .doc(user.uid).
      // set({token:notifyToken});
      dispatch(loginUser({mobileNumber,userId:user.uid}))
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }
  useEffect(() => {
    const subscriber = Auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

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
          <TextInput keyboardType='number-pad' maxLength={1} className={`w-11 h-11 rounded-md ${f1.length>=1? 'border-blue-400':'border-gray-400' }  border-2 text-center focus:border-blue-400 text-black text-xl`}
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
          <TextInput keyboardType='number-pad' maxLength={1} className={`w-10 h-11 rounded-md ${f2.length>=1? 'border-blue-400':'border-gray-400' }  border-2 text-center focus:border-blue-400 text-black text-xl`}
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
          <TextInput keyboardType='number-pad' maxLength={1} className={`w-10 h-11 rounded-md ${f3.length>=1? 'border-blue-400':'border-gray-400' }  border-2 text-center focus:border-blue-400 text-black text-xl`}
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
          <TextInput keyboardType='number-pad' maxLength={1} className={`w-10 h-11 rounded-md ${f4.length>=1? 'border-blue-400':'border-gray-400' }  border-2 text-center focus:border-blue-400 text-black text-xl`}
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
          <TextInput keyboardType='number-pad' maxLength={1} className={`w-10 h-11 rounded-md ${f5.length>=1? 'border-blue-400':'border-gray-400' }  border-2 text-center focus:border-blue-400 text-black text-xl`}
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
          <TextInput keyboardType='number-pad' maxLength={1} className={`w-10 h-11 rounded-md ${f6.length>=1? 'border-blue-400':'border-gray-400' }  border-2 text-center focus:border-blue-400 text-black text-xl`}
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
      {
          loading ? 
          <View className='w-full justify-center items-center py-8'>
          <Button
          title="Login"
          loading={true}
          disabled={isDisableVerify}
          loadingProps={{
            size: 'large',
            color: 'rgb(255, 255, 255)',
          }}
          titleStyle={{ fontFamily:'Montserrat-SemiBold',fontSize:20 }}
          buttonStyle={{
            backgroundColor: 'rgb(59,130,246)',
            width:'100%',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 5,
            // paddingVertical: 10,
          }}
          containerStyle={{
            width: '100%',
          }}
        />
        </View>:
         <View className='w-full justify-center items-center py-8'>
         <Button
         title="Verify"
        //  loading={true}
         onPress={handleVerify}
         loadingProps={{
           size: 'large',
           color: 'rgba(111, 202, 186, 1)',
         }}
         disabled={isDisableVerify}
         titleStyle={{ fontFamily:'Montserrat-SemiBold',fontSize:20 }}
         buttonStyle={{
           backgroundColor: 'rgb(59,130,246)',
           width:'100%',
           borderColor: 'transparent',
           borderWidth: 0,
           borderRadius: 5,
           paddingVertical: 14,
         }}
         containerStyle={{
           width: '100%',
         }}
       />
       </View>
       }
      <View>
      {/* <TouchableOpacity className={`mt-5 py-2.5 rounded-md ${isDisableVerify? 'bg-gray-300':'bg-blue-500'}`}  onPress={handleVerify} disabled={isDisableVerify}>
        <Text className="text-white text-xl text-center font-['Montserrat-Bold']" >Verify</Text>
      </TouchableOpacity> */}
      </View>
      {/* <PhoneSignIn/> */}

    </View>
  )
}

export default VerifyOtp