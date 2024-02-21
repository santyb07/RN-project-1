import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {RootStackParamList} from '../navigation/appNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {useRoute} from '@react-navigation/native';
import {colors} from '../utils/constants';
import HeaderBar from './components/HeaderBar';
import ThemeHeading from './components/ThemeHeading';
import LinearGradient from 'react-native-linear-gradient';
import AccountOverview from './components/AccountOverview';
import LeadsSummary from './components/LeadsSummary';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import AdCard from './components/AdCard';
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOutDown,
  FadeOutLeft,
} from 'react-native-reanimated';
import {RootState} from '../redux/store/store';
import {useDispatch, useSelector} from 'react-redux';
import firestore from "@react-native-firebase/firestore"
import CheckInternet from './CheckInternet';
import { addBusinessDetails } from '../redux/features/businessDetailsSlice';
import { getToken } from '../utils/firebase/CommonUtils';
// import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"

interface HomeScreenProps {
  // navigation: StackNavigationProp<RootStackParamList,"Home">,
}

const HomeScreen = (props: HomeScreenProps) => {
  const userData = useSelector((state:RootState)=>state.auth)
  const dispatch = useDispatch();

  // console.warn(auth().currentUser?.uid)

  useEffect(()=>{

    const getBusinessData=async ()=>{
      const fcmtoken= getToken();
      
      const documentRef = await  (firestore() as any).collection('users').doc(userData.userId);
      await documentRef.get()
      .then((docSnapshot:any) => {
        if (docSnapshot.exists) {
          const data = docSnapshot._data;
      console.log('Document already exists',data);

      //store fcmtoken
      firestore()
      .collection('tokens')
      .doc(userData.userId)
      .update({token:fcmtoken})
      .then(() => {
        console.log('Token added');
      })

      dispatch(addBusinessDetails({
        businessName:data.businessName,
        email:data.email,
        location:data.location,
        logo:data.logo,
        mobileNumber1:data.mobileNumber1,
        mobileNumber2:data.mobileNumber2,
        website:data.website,
        designation:data.designation,
        logoMetadata:data.logoMetadata,
        accountType:data.accountType,
      }))
    } else {
      // Document doesn't exist, save the data
      documentRef.set({
        createdAt: firestore.FieldValue.serverTimestamp(),
        mobileNumber1:userData.mobileNumber
      })
        .then(() => {
          firestore()
          .collection('tokens')
          .doc(userData.userId)
          .set({token:fcmtoken})
          .then(() => {
            console.log('Token added');
          })

          console.log('Document saved successfully');
          dispatch(addBusinessDetails({
            businessName:"",
            email:"",
            location:"",
            logo:"https://res.cloudinary.com/drxhgcqvw/image/upload/v1705428150/ysxh4cpuke6va2sqhou8.png",
            mobileNumber1:userData.mobileNumber,
            mobileNumber2:"",
            website:"",
            designation:""
          }))
        })
        
        .catch((error:any )=> {
          console.log('Error saving document:', error);
        });
    }
  }) .catch((error:any) => {
    console.log('Error checking document:', error);
  });
}
      getBusinessData();
  },[])
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      
        <View className="flex-1 mb-18 pb-14">
          <StatusBar backgroundColor={colors.StatusBarLightGray} barStyle='light-content'/>
          <HeaderBar
            name={'Facebook Test'}
            logo={true}
            help={true}
            search={false}
          />
          <ScrollView className='space-y-4'>
            <View className="justify-around px-4 items-start bg-white">
              <ThemeHeading heading={'Account Overview'} />

              <View className=" flex-row items-center justify-between w-full ">
                <AccountOverview
                  name={'Campaigns'}
                  logo={'bullhorn'}
                  count={`${2}`}
                />
                <AccountOverview
                  name={'Ad Views'}
                  logo={'eye'}
                  count={`20,000`}
                />
              </View>
            </View>
            <View className="justify-around px-4 bg-white items-start">
              <ThemeHeading heading={'Leads Summary'} />
              <View className=" flex-row items-center justify-between w-full">
                <LeadsSummary
                  name={'Total Leads'}
                  logo={'user-o'}
                  logoColor={'blue'}
                  count={`${0}`}
                />
                <LeadsSummary
                  name={'Follow up Done'}
                  logo={'check-circle-o'}
                  logoColor={'green'}
                  count={`${2}`}
                />
                <LeadsSummary
                  name={'Follow up Pending'}
                  logo={'dot-circle-o'}
                  logoColor={'tomato'}
                  count={`${2}`}
                />
              </View>
            </View>
            <View className="justify-around px-4 bg-white items-start">
              <ThemeHeading heading={'Integrations'} />
              <View className=" flex-row items-center justify-between w-full">
                <TouchableOpacity className="w-full bg-blue-500 flex-row justify-center items-center py-3 rounded-xl">
                  <Text className=" text-white mr-3">
                    <FontAwesomeIcons
                      name={'facebook-square'}
                      color={'white'}
                      size={20}
                    />
                  </Text>
                  <Text className="font-[Montserrat-Medium] text-lg text-white">
                    Link Your Facebook Page
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="w-full flex-row justify-center items-center py-5 rounded-xl">
                <View className=" w-full text-center">
                  <Text className="font-[Montserrat-Bold] text-md text-blue-700 text-center">
                    Link Your Facebook Page Using Browser
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="justify-around px-4 bg-white items-start">
              <ThemeHeading heading={'Past Ads'} />
              <View className="w-full flex-1 items-center justify-center">
                <AdCard />
                <AdCard />
              </View>
            </View>
          </ScrollView>
      </View>
      
    </SafeAreaView>
  );
};

export default HomeScreen;
