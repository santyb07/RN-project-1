import { View, Text, StyleSheet, Image, StatusBar, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../utils/constants';
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import FontAwesomeIcons5 from "react-native-vector-icons/FontAwesome5"
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/features/authSlice';

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
  {
    id: 11,
    iconName:"sign-out",
    name: 'Logout',
  },
]

const BusinessDetails = () => {
  const logoutDispatch = useDispatch();


  const handleLogout=()=>{
    logoutDispatch(logoutUser())
  }
  return (
    <View className='flex-1 bg-white'>
    <StatusBar backgroundColor={colors.ActiveColor} barStyle='light-content'/>
    <View className='bg-[#F39424] rounded-b-xl'>

    <View className='bg-[#F39424] flex-row justify-between items-center' >
    <Text className='font-[Montserrat-SemiBold] text-lg text-white p-3'>Business Details</Text>
    <Text className='font-[Montserrat-SemiBold] text-lg text-white p-3'>Edit</Text>
    </View>
    <View className='h-32 w-full'>
    </View>
    </View>
      
      <View className='absolute top-20 w-full px-4 border-b border-gray-400  justify-center items-center '>
        <View className='justify-center items-center bg-white  rounded-xl px-2 py-3 '>
        <Image
          source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png' }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 60,
            borderWidth: 4,
            borderColor:'#4287f5',
            // marginBottom: 10,
          }}
        />
        <View className=' justify-center items-center'>
        <Text className='font-[Montserrat-Bold] text-xl text-black '>Test Account</Text>
        <Text className='font-[Montserrat-SemiBold] mt-1 text-center text-black'>Shop No.17, Poonam Sagar Complex, Mira Road</Text>
        </View>
        </View>
        </View>
      <FlatList
      style={{
        backgroundColor: '#FFFFFF',
        marginBottom:150,
        position:'relative',
        top:100
      }}
      data={data}
      ItemSeparatorComponent={()=>{
        return <View style={{
          height: 1,
          backgroundColor: '#CCCCCC',
        }}/>
      }}
      // keyExtractor={item => {
      //   return item.id
      // }}
      renderItem={item=>{
        return(
          <TouchableOpacity className='px-6 py-4 flex-row justify-start items-center gap-x-5 border-b-3' onPress={item.item.name=='Logout'? handleLogout:()=>{}}>
            <Text className='bg-[#D2E0F7] p-1.5 rounded-md'>
              {
                item.item.iconName=="wallet" || item.item.iconName==="exclamation-circle"?
                  <FontAwesomeIcons5 name={item.item.iconName} size={25} color={colors.ActiveColor2} style={{borderRadius:20,borderColor:'#000000'}}/>
                :
                <FontAwesomeIcons name={item.item.iconName} size={25} color={colors.ActiveColor2} style={{borderRadius:20,borderColor:'#000000'}}/>
              }
            </Text>
            <Text className='font-[Montserrat-Medium] text-base text-gray-700'>{item.item.name}</Text>

          </TouchableOpacity>
        )
      }}
      >

      </FlatList>
   
    </View>

  )
}


export default BusinessDetails

