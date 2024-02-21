import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import { Image } from 'react-native';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import FontAwesomeIcon5 from "react-native-vector-icons/FontAwesome5"
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import EvillIcons from "react-native-vector-icons/EvilIcons"
import FontistoIcons from "react-native-vector-icons/Fontisto"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import { Button, Input } from '@rneui/themed';
import * as yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import firestore from "@react-native-firebase/firestore"
import Auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { showMessage } from 'react-native-flash-message'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/appNavigation';
import { useDispatch } from 'react-redux'
import { addBusinessDetails, updateLogo } from '../../redux/features/businessDetailsSlice';
import storage from '@react-native-firebase/storage';

type businessDetailsProps={
  image:string,
  businessName:string, 
  mobileNumber:{
    mobileNumber1:string,
    mobileNumber2:string,
  }
  email:string,
  website:string,
  location:string,
}
const validationSchema = yup.object().shape({
  businessName: yup.string().required('Business Name is required'),
  mobileNumber1: yup.string().matches(/^\d+$/, 'Invalid phone number').min(10, 'Must be at least 10 digits').required('Mobile Number 1 is required'),
  mobileNumber2: yup.string().matches(/^\d+$/, 'Invalid phone number').min(10, 'Must be at least 10 digits'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  website: yup.string(),
  location: yup.string().required('Location is required'),
  designation: yup.string(),

});

interface EditBusinessDetailsProps{
  navigation: StackNavigationProp<RootStackParamList,'EditBusinessDetails'>,
}

const EditBusinessDetails = ({navigation}:EditBusinessDetailsProps) => {
  const userData = useSelector((state:RootState)=>state.auth)
  const businessData = useSelector((state:RootState)=>state.businessDetails)
  const [img, setImg] = useState<string | undefined>(businessData.logo);
  // const [uploadedImg, setUploadedImg] = useState<string>("");
  // const [metaData,setMetadat] = useState(businessData.logoMetadata? businessData.logoMetadata:"");
  const [loading,setLoading] = useState<boolean>(false);
  const [select,setSelect] =useState(false);
  const dispatch = useDispatch();
  const [accountType,setAccountType]= useState(businessData.accountType? businessData.accountType:'Personal');

  // console.log(businessData)

  const pickImage =()=>{
    ImagePicker.openPicker({
      // width: null,
      // height: 'auto',
      cropping: true,
      compressImageQuality:0.3
    }).then(image => {
      console.log(image);
      setImg(image.path)
      setSelect(true);
    }).catch((err:any)=>{
      console.log('error in uploading the image',err)
    });
  }

  const uploadImage =async()=>{
    try{
      setLoading(true)
      if(businessData.logoMetadata){
        try{
          const response = storage().ref(businessData.logoMetadata).delete();
          console.log('previous image deleted successfully.',response);
        }catch(err){
          console.log("error in deleting image",err)
        }
      }
      const response = storage().ref(`/logo/webbrand-${userData.userId}.jpg`)
      if(img!= undefined){
        const put = await response.putFile(img);
        const url = await response.getDownloadURL();
        console.log("metadata : ",put.metadata.fullPath)
        console.log("image uploaded successfully",url);

        //store logo uri in database
        const logoDetails={logo:url,logoMetadata:put.metadata.fullPath}
        const res = await firestore()
        .collection('users')
        .doc(userData.userId)
        .update(logoDetails);

        dispatch(updateLogo(logoDetails))
        setImg(url);
        setLoading(false)
        setSelect(false)
      }else{
        console.log('image not available')
      }
    }catch(err){
      console.log(err)
    }
  }
  // const deleteImage =async()=>{
  //   try{
  //     setLoading(true)
  //     const response = storage().ref(logoMetadata).delete();
  //     console.log('image deleted successfully.',response);
  //     setLoading(false)
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  
  const handleSubmit =async(values: any) => {
    try{
      // setLoading(true);
      // if(businessData.logoMetadata){
      //   await deleteImage()
      // }
        setLoading(true);
        //updating the details
        const details={
          businessName:values.businessName,
          email:values.email,
          location:values.location,
          mobileNumber1:values.mobileNumber1,
          mobileNumber2:values.mobileNumber2,
          website:values.website,
          designation:values.designation,
          accountType:accountType
        }
        dispatch(addBusinessDetails(details))
        const res = await firestore()
      .collection('users')
      .doc(userData.userId)
      .update(details);
      
      // await uploadImage();
      // await CameraRoll.saveToCameraRoll(img)
      // const details={
      //   businessName:values.businessName,
      //   email:values.email,
      //   location:values.location,
      //   logo: img,
      //   logoMetadata:logoMetadata,
      //   mobileNumber1:values.mobileNumber1,
      //   mobileNumber2:values.mobileNumber2,
      //   website:values.website,
      //   designation:values.designation
      // }
      // console.log(details)
      //store in localstorage
      // dispatch(addBusinessDetails(details))

      // Perform your submit logic here, e.g., API call or state update
      // const response = await firestore()
      // .collection('users')
      // .doc(userData.userId)
      // .update(details);
      // console.log(response);
      showMessage({
        message: "Details updated Successfully",
        // description: "This is our second message",
        type: "success",
        titleStyle:{fontFamily:'Montserrat-Bold',textAlign:"center",color:'#FFFFFF'},
        // backgroundColor:"#000000"
      });
      // console.log('Form submitted successfully:', values);
      setLoading(false);
      navigation.goBack();
    }catch(err){
      showMessage({
        message: "Somethign went wrong",
        // description: "This is our second message",
        type: "danger",
        titleStyle:{fontFamily:'Montserrat-Bold',textAlign:"center",color:'#FFFFFF'},
        // backgroundColor:"#000000"
      });
      // console.log('something went wrong while updating the details',err)
    }
  };

  console.log(accountType)
  return (
    <View className='flex-1 py-4'>
      <ScrollView>
      <View className='flex-row justify-center space-x-4 items-center py-2 '>
      <TouchableOpacity className={accountType=='Personal'? 'border-none px-12 py-3 rounded-xl bg-orange-400':'border px-12 py-3 rounded-xl'} onPress={()=>setAccountType('Personal')}>
          <Text className={accountType=='Personal'? 'font-[Montserrat-SemiBold] text-white':'font-[Montserrat-SemiBold] '}>Personal</Text>
        </TouchableOpacity>
        <TouchableOpacity className={accountType=='Business'? 'border-none px-12 py-3 rounded-xl bg-orange-400':'border px-12 py-3 rounded-xl'} onPress={()=>setAccountType('Business')}>
          <Text className={accountType=='Business'? 'font-[Montserrat-SemiBold] text-white':'font-[Montserrat-SemiBold] '}>Business</Text>
        </TouchableOpacity>
      </View>
      <View className='flex-row justify-around items-center px-4 py-4'>
        <View className='border rounded-xl border-orange-400'>
        <Image source={{uri:img}} height={118} width={118} resizeMode="contain" style={{borderRadius:10}}/>
        </View>
        {
        select ?
        <View className='justify-center items-center mb-4'>
        {
          loading? 
          (<TouchableOpacity className=' justify-center items-center border-none bg-orange-400   py-2 px-16 rounded-xl'>
          <Text className='text-base font-[Montserrat-SemiBold] text-white '><ActivityIndicator size={'small'} color={'white'}/></Text>
        </TouchableOpacity>)
          :
          (<TouchableOpacity className=' justify-center items-center border-none bg-orange-400 py-2 px-6 rounded-xl' onPress={uploadImage}>
          <Text className='text-base font-[Montserrat-SemiBold] text-white'>Save {accountType=='Personal'? 'Profile':'Logo'}</Text>
        </TouchableOpacity>)
        }
      </View>:
      <TouchableOpacity className={'border px-4 py-3 rounded-xl'} onPress={pickImage}>
      <Text className={'text-base font-[Montserrat-Regular] '}>Choose {accountType=='Personal'? 'Profile':'Logo'}</Text>
    </TouchableOpacity>
      }
      </View>
      <Formik
      initialValues={{
        businessName: businessData.businessName,
        mobileNumber1: userData.mobileNumber,
        mobileNumber2: businessData.mobileNumber2 || "",
        email: businessData.email,
        website: businessData.website,
        location: businessData.location,
        designation: businessData.designation
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }: FormikProps<any>): React.ReactNode => (
          <View>
            <View className='px-4'>
            <Input
        placeholder={accountType==='Personal'? 'Your Name':'Business Name'}
        maxLength={20}
        value={values.businessName}
        onChangeText={handleChange('businessName')}
        errorMessage={(errors.businessName && typeof errors.businessName === 'string') ? errors.businessName:''}
        leftIcon={
          <FontAwesomeIcon5
            name='business-time'
            size={18}
            color='black'
          />}
          inputContainerStyle={{
            borderBottomWidth:2,
            borderWidth:2,
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:20,
            paddingVertical:2,
            borderRadius:10,
            marginBottom:0
          }}
          inputStyle={{
            fontSize:16
          }}
        containerStyle={{
          paddingHorizontal:0,
          paddingBottom:0
        }}
        underlineColorAndroid='transparent'        
        />
         <Input
        placeholder='Mobile Number 1'
        value={values.mobileNumber1}
        onChangeText={handleChange('mobileNumber1')}
        disabled
        errorMessage={(errors.mobileNumber1 && typeof errors.mobileNumber1 === 'string') ? errors.mobileNumber1:''}
        keyboardType='numeric'
        maxLength={10}
        leftIcon={
          <SimpleLineIcons
          name='screen-smartphone'
          size={18}
          color='black'
        />}
          inputContainerStyle={{
            borderBottomWidth:2,
            borderWidth:2,
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:20,
            paddingVertical:2,
            borderRadius:10,
            marginBottom:0
          }}
          inputStyle={{
            // borderBottomColor:'white',
            // paddingBottom:20
            // paddingVertical:0
            fontSize:16            
          }}
        containerStyle={{
          // borderWidth:1,
          paddingHorizontal:0,
          paddingBottom:0
          // paddingVertical:0,
          // justifyContent:'center',
          // alignItems:'center',
          // borderRadius:10
          // padding:0,
          // margin:0
          
        }}
        underlineColorAndroid='transparent'        
        // inputStyle={{borderWidth:4}}
        />
         <Input
        placeholder='Mobile Number 2'
        value={values.mobileNumber2}
        onChangeText={handleChange('mobileNumber2')}
        keyboardType='numeric'
        maxLength={10}
        errorMessage={(errors.mobileNumber2 && typeof errors.mobileNumber2 === 'string') ? errors.mobileNumber2:''}
        leftIcon={
          <SimpleLineIcons
          name='screen-smartphone'
          size={18}
          color='black'
        />}
          inputContainerStyle={{
            borderBottomWidth:2,
            borderWidth:2,
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:20,
            paddingVertical:2,
            borderRadius:10,
            marginBottom:0
          }}
          inputStyle={{
            // borderBottomColor:'white',
            // paddingBottom:20
            // paddingVertical:0
            fontSize:16
          }}
        containerStyle={{
          // borderWidth:1,
          paddingHorizontal:0,
          paddingBottom:0
          // paddingVertical:0,
          // justifyContent:'center',
          // alignItems:'center',
          // borderRadius:10
          // padding:0,
          // margin:0
          
        }}
        underlineColorAndroid='transparent'        
        // inputStyle={{borderWidth:4}}
        />
         <Input
        placeholder='Email'
        value={values.email}
        onChangeText={handleChange('email')}
        keyboardType='email-address'
        maxLength={30}
        errorMessage={(errors.email && typeof errors.email === 'string') ? errors.email:''}
        leftIcon={
          <FontistoIcons
          name='email'
          size={18}
          color='black'
        />}
          inputContainerStyle={{
            borderBottomWidth:2,
            borderWidth:2,
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:20,
            paddingVertical:2,
            borderRadius:10,
            marginBottom:0
          }}
          inputStyle={{
            // borderBottomColor:'white',
            // paddingBottom:20
            // paddingVertical:0
            fontSize:16
          }}
        containerStyle={{
          // borderWidth:1,
          paddingHorizontal:0,
          paddingBottom:0
          // paddingVertical:0,
          // justifyContent:'center',
          // alignItems:'center',
          // borderRadius:10
          // padding:0,
          // margin:0
          
        }}
        underlineColorAndroid='transparent'        
        // inputStyle={{borderWidth:4}}
        />
         <Input
        placeholder='Website'
        value={values.website}
        errorMessage={(errors.website && typeof errors.website === 'string') ? errors.website:''}
        onChangeText={handleChange('website')}
        keyboardType='url'
        maxLength={20}
        leftIcon={
          <AntDesignIcon
          name='earth'
          size={18}
          color='black'
        />}
          inputContainerStyle={{
            borderBottomWidth:2,
            borderWidth:2,
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:20,
            paddingVertical:2,
            borderRadius:10,
            marginBottom:0
          }}
          inputStyle={{
            // borderBottomColor:'white',
            // paddingBottom:20
            // paddingVertical:0
            fontSize:16
          }}
        containerStyle={{
          // borderWidth:1,
          paddingHorizontal:0,
          paddingBottom:0
          // paddingVertical:0,
          // justifyContent:'center',
          // alignItems:'center',
          // borderRadius:10
          // padding:0,
          // margin:0
          
        }}
        underlineColorAndroid='transparent'        
        // inputStyle={{borderWidth:4}}
        />
         <Input
        placeholder='Location'
        value={values.location}
        onChangeText={handleChange('location')}
        errorMessage={(errors.location && typeof errors.location === 'string') ? errors.location:''}
        maxLength={70}
        leftIcon={
          <EvillIcons
          name='location'
          size={18}
          color='black'
        />}
          inputContainerStyle={{
            borderBottomWidth:2,
            borderWidth:2,
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:20,
            paddingVertical:2,
            borderRadius:10,
            marginBottom:0
          }}
          inputStyle={{
            // borderBottomColor:'white',
            // paddingBottom:20
            // paddingVertical:0
            fontSize:16
          }}
        containerStyle={{
          // borderWidth:1,
          paddingHorizontal:0,
          paddingBottom:0
          // paddingVertical:0,
          // justifyContent:'center',
          // alignItems:'center',
          // borderRadius:10
          // padding:0,
          // margin:0
          
        }}
        underlineColorAndroid='transparent'        
        // inputStyle={{borderWidth:4}}
        />
        <Input
        placeholder='Designation'
        value={values.designation}
        onChangeText={handleChange('designation')}
        // errorMessage={(errors.mobileNumber1 && typeof errors.mobileNumber1 === 'string') ? errors.mobileNumber1:''}
        // keyboardType='numeric'
        maxLength={30}
        leftIcon={
          <SimpleLineIcons
          name='screen-smartphone'
          size={18}
          color='black'
        />}
          inputContainerStyle={{
            borderBottomWidth:2,
            borderWidth:2,
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:20,
            paddingVertical:2,
            borderRadius:10,
            marginBottom:0
          }}
          inputStyle={{
            // borderBottomColor:'white',
            // paddingBottom:20
            // paddingVertical:0
            fontSize:16            
          }}
        containerStyle={{
          // borderWidth:1,
          paddingHorizontal:0,
          paddingBottom:0
          // paddingVertical:0,
          // justifyContent:'center',
          // alignItems:'center',
          // borderRadius:10
          // padding:0,
          // margin:0
          
        }}
        underlineColorAndroid='transparent'        
        // inputStyle={{borderWidth:4}}
        />
        </View>
        
        {/* <View style={{ marginHorizontal: 10 }}>
            <TouchableOpacity style={{ backgroundColor: '#FFA500', paddingVertical: 10, borderRadius: 5 }} onPress={()=>handleSubmit()}>
              <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>Save</Text>
            </TouchableOpacity>
          </View> */}
          <View style={{ marginHorizontal: 20 }}>
          {
          loading ? 
          <View className='w-full justify-center items-center py-1'>
          <Button
          title="Save"
          loading={true}
          disabled={true}
          loadingProps={{
            size: 'large',
            color: 'rgb(255, 255, 255)',
          }}
          titleStyle={{ fontFamily:'Montserrat-SemiBold',fontSize:20 }}
          buttonStyle={{
            backgroundColor: '#F39424',
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
         <View className='w-full justify-center items-center py-1'>
         <Button
         title="Save"
        //  loading={true}
         onPress={()=>handleSubmit()}
        //  disabled={!disableLogin}
         titleStyle={{ fontFamily:'Montserrat-SemiBold',fontSize:20 }}
         buttonStyle={{
           backgroundColor: '#F39424',
           width:'100%',
           borderColor: 'transparent',
           borderWidth: 0,
           borderRadius: 30,
           paddingVertical: 10,
         }}
         containerStyle={{
           width: '100%',
         }}
       />
       </View>
        }
        </View>
          </View>
      )}
    </Formik>
    </ScrollView>
    </View>
  )
}

export default EditBusinessDetails