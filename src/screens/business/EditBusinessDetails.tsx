import { View, Text, Button, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import { Image } from 'react-native';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import FontAwesomeIcon5 from "react-native-vector-icons/FontAwesome5"
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import EvillIcons from "react-native-vector-icons/EvilIcons"
import FontistoIcons from "react-native-vector-icons/Fontisto"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import { Input } from '@rneui/themed';
import * as yup from 'yup';
import { Formik, FormikProps } from 'formik';

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
});

const EditBusinessDetails = () => {
  const [img, setImg] = useState<string | null>("");
  const [businessDetails,setBusinessDetails]= useState<businessDetailsProps>({
    image:'',
    businessName:"",
    mobileNumber:{
      mobileNumber1:'',
      mobileNumber2:'',
    },
    email:'',
    website:'',
    location:'',
  });

  const pickImage =()=>{
    ImagePicker.openPicker({
      // width: null,
      // height: 'auto',
      cropping: true
    }).then(image => {
      console.log(image);
      setBusinessDetails((prevData) => ({
        ...prevData,
        image: image.path,
      }));
      setImg(image.path)
    });
  }
  
  const handleSubmit = (values: any) => {
    // Perform your submit logic here, e.g., API call or state update
    console.warn('Form submitted successfully:', values);
  };

  return (
    <View className='flex-1'>
      {/* <ScrollView> */}
      <View className='mx-4 my-4 border-2 rounded-xl border-orange-400 relative'>
      <Image source={{uri:img ? img:'https://cdn.pixabay.com/photo/2016/03/21/20/05/image-1271454_1280.png'}} height={118} resizeMode='contain'/>
      <TouchableOpacity onPress={pickImage} className='absolute bottom-2 right-2'>
      <FontAwesomeIcon name="edit" color={"#4287f5"} size={25}/>
      </TouchableOpacity>
      </View>
      <Formik
      initialValues={{
        businessName: '',
        mobileNumber1: '',
        mobileNumber2: '',
        email: '',
        website: '',
        location: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }: FormikProps<any>): React.ReactNode => (
          <View>
            <View className='px-4'>
            <Input
        placeholder='Business Name'
        maxLength={20}
        value={values.businessName}
        onChangeText={handleChange('businessName')}
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
        </View>
        <View style={{ marginHorizontal: 10 }}>
            <TouchableOpacity style={{ backgroundColor: '#FFA500', paddingVertical: 10, borderRadius: 5 }} onPress={()=>handleSubmit()}>
              <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>Save</Text>
            </TouchableOpacity>
          </View>
          </View>
      )}
    </Formik>
    </View>
  )
}

export default EditBusinessDetails