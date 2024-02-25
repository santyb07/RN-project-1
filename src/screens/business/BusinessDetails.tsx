import { View, Text, StyleSheet, Image, StatusBar, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../../utils/constants';
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import FontAwesomeIcons5 from "react-native-vector-icons/FontAwesome5"
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/features/authSlice';
import HeaderBar from '../components/HeaderBar';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/appNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import Auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { clearBusinessDetails } from '../../redux/features/businessDetailsSlice';
import { RootState } from '../../redux/store/store';

const data = [
  {
    id: 1,
    iconName:"rocket",
    name: 'Campaign Settings',
  },
  {
    id: 2,
    iconName:"credit-card",
    name: 'Billing Details',
  },
  {
    id: 3,
    iconName:"laptop",
    name: 'Manage Website',
  },
  {
    id: 4,
    iconName:"bell-o",
    name: 'Notification',
  },
  {
    id: 5,
    iconName:"pencil",
    name: 'Designs',
  },
  {
    id: 6,
    iconName:"wallet",
    name: 'Payment History',
  },
  {
    id: 7,
    iconName:"share-alt",
    name: 'Share App',
  },
  {
    id: 8,
    iconName:"exclamation-circle",
    name: 'Terms & Conditions',
  },
  {
    id: 9,
    iconName:"shield",
    name: 'Privacy & Policy',
  },
  {
    id: 10,
    iconName:"address-book-o",
    name: 'Contact Us',
  },
]

const BusinessDetails = () => {
  const logoutDispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const businessData = useSelector((state:RootState)=>state.businessDetails)
  const userData = useSelector((state:RootState)=>state.auth)


  console.log(businessData);
  const handleLogout=async()=>{
    await Auth().signOut();
    logoutDispatch(clearBusinessDetails());
    logoutDispatch(logoutUser());
  }
  const navigateToEditDetails=()=>{
    navigation.navigate('EditBusinessDetails');
  }
  useEffect(()=>{
    const user = Auth().currentUser
    console.log('current User',user);
  },[])
  const logo = (businessData.logo ? businessData.logo:'https://www.bootdey.com/img/Content/avatar/avatar1.png')
  console.log(businessData.logo)
  return (
    //new Business Sectiont
    <View className='flex-1'>
      <HeaderBar name={'My Business'} logo={true} help={true} search={false}/>
      <ScrollView>
      <View className='w-full bg-blue-400 py-4 flex-row justify-start items-center px-6 space-x-4'>
        <Image 
        source={{uri:logo}} 
        height={70} width={70} resizeMode='cover'
        style={{borderRadius:50,borderColor:colors.ActiveColor,borderWidth:3}}
        />
        <View className='pr-12'>
          <Text className='text-xl font-[Montserrat-SemiBold] text-white'>{businessData.businessName ? businessData.businessName:'Your Name'}</Text>
          <Text className='text-sm font-[Montserrat-Regular] text-white'>{businessData.location ? businessData.location:'Your address'}</Text>
          <Text className='text-sm font-[Montserrat-Regular] text-white'>{businessData.mobileNumber1 ? businessData.mobileNumber1:'+91 9999999999'}</Text>
          <TouchableOpacity className='pt-2 flex-row space-x-1 justify-start items-center' onPress={navigateToEditDetails}>
            <Text className='text-xs font-[Montserrat-Regular] text-white'>Edit Details</Text>
            <FontAwesomeIcons name='angle-right' size={20} color={'white'}/>
          </TouchableOpacity>
        </View>
      </View>
      <View className='bg-white'>
        {
          data.map((val,index)=>(
            <View key={index}>
            {/* <TouchableOpacity className='px-6 py-4 flex-row justify-start items-center gap-x-5 border-b-3' onPress={()=>navigation.navigate('TestNotification')}> */}
            <TouchableOpacity className='px-6 py-4 flex-row justify-start items-center gap-x-5 border-b-3'>
            <Text className='bg-[#D2E0F7] p-2 rounded-2xl'>
              {
                val.iconName=="wallet" || val.iconName==="exclamation-circle"?
                  <FontAwesomeIcons5 name={val.iconName} size={20} color={colors.ActiveColor2}/>
                :
                <FontAwesomeIcons name={val.iconName} size={20} color={colors.ActiveColor2} />
              }
            </Text>
            <Text className='font-[Montserrat-Medium] text-base text-gray-700'>{val.name}</Text>
          </TouchableOpacity>
          <View style={{
              height: 1,
              backgroundColor: '#CCCCCC',
            }}/>
          </View>
          ))
        }
      </View>
      <View className='w-full bg-white flex-col justify-center items-center space-y-3  py-4 mb-14'>
        <TouchableOpacity className='flex-row items-center justify-center space-x-6'>
          <FontAwesomeIcons name='facebook-square' size={50} color={'#316FF6'}/>
          <LinearGradient
          colors={['#CA1D7E', '#E35157', '#F2703F']}
          start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
          style={{ height: 52,width: 52,alignItems: 'center',justifyContent: 'center',borderRadius:82 / 2}}>
          <FontAwesomeIcons5 name='instagram-square' size={40} color={'#ffffff'}/>
  </LinearGradient>
        </TouchableOpacity>
        {/* <LinearGradient
          colors={['#CA1D7E', '#E35157', '#F2703F']}
          start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
          style={{borderRadius:10}}
          > */}
        <TouchableOpacity className='flex-row space-x-2 px-10 py-2 border-2 border-gray-800 rounded-md' onPress={handleLogout}>
          <FontAwesomeIcons name='sign-out' size={30} color={'gray'}/>
          <Text className='font-[Montserrat-Regular] text-base text-gray-700'>Logout</Text>
        </TouchableOpacity>
  {/* </LinearGradient> */}
        <View>
        <Text className='font-[Montserrat-Regular] text-sm'>Version 1.0.1</Text>
        </View>
      </View>
      
      </ScrollView>
    </View>

  )
}


export default BusinessDetails

