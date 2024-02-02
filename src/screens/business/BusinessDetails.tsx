import { View, Text, StyleSheet, Image, StatusBar, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../../utils/constants';
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import FontAwesomeIcons5 from "react-native-vector-icons/FontAwesome5"
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/features/authSlice';
import HeaderBar from '../components/HeaderBar';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/appNavigation';
import { StackNavigationProp } from '@react-navigation/stack';

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


  const handleLogout=async()=>{
    await logoutDispatch(logoutUser())
  }
  const navigateToEditDetails=()=>{
    navigation.navigate('EditBusinessDetails');
  }
  return (
    //new Business Sectiont
    <View className='flex-1'>
      <HeaderBar name={'My Business'} logo={true} help={true} search={false}/>
      <ScrollView>
      <View className='w-full bg-blue-400 py-4 flex-row justify-start items-center px-6 space-x-4'>
        <Image 
        source={{uri:'https://www.bootdey.com/img/Content/avatar/avatar1.png'}} 
        height={70} width={70} resizeMode='cover'
        style={{borderRadius:50}}
        />
        <View className='pr-12'>
          <Text className='text-xl font-[Montserrat-SemiBold] text-white'>Test Account</Text>
          <Text className='text-sm font-[Montserrat-Regular] text-white'>Poonam Sagar Complex, Mira road,Thane 401107</Text>
          <Text className='text-sm font-[Montserrat-Regular] text-white'>+91 9876543210</Text>
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
        <LinearGradient
          colors={['#CA1D7E', '#E35157', '#F2703F']}
          start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
          style={{borderRadius:10}}
          // style={{ height: 52,width: 52,alignItems: 'center',justifyContent: 'center',borderRadius:82 / 2}}
          >
        <TouchableOpacity className='flex-row space-x-2 px-10 py-2 border-2 border-white rounded-md' onPress={handleLogout}>
          <FontAwesomeIcons name='sign-out' size={30} color={'white'}/>
          <Text className='font-[Montserrat-Regular] text-base text-white'>Logout</Text>
        </TouchableOpacity>
  </LinearGradient>
        <View>
        <Text className='font-[Montserrat-Regular] text-sm'>Version 1.0.1</Text>
        </View>
      </View>
      
      </ScrollView>
    </View>

  )
}


export default BusinessDetails

