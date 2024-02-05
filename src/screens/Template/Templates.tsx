import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderBar from '../components/HeaderBar'
import LottieView from 'lottie-react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/appNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/AppStack';
import { useNavigation } from '@react-navigation/native';
import TemplateScroll from './components/TemplateScroll';
import { ScrollView } from 'react-native';
import KarykartaTemp from './components/KaryKartaTemp';


const {width, height} = Dimensions.get('window');


const templateData=[
  {
    templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg',
    promotion:false,
},
{
  templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706763570/IMG-20240201-WA0003_d8aout.jpg',
  promotion:false,
},
{
  templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg',
  promotion:false,
},
{
templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706763570/IMG-20240201-WA0003_d8aout.jpg',
promotion:false,
},
{
  templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg',
  promotion:false,
},
{
templateImg:"https://res.cloudinary.com/drxhgcqvw/image/upload/v1706763570/IMG-20240201-WA0003_d8aout.jpg",
promotion:false,
},
{
  templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg',
  promotion:false,
},
{
templateImg:"https://res.cloudinary.com/drxhgcqvw/image/upload/v1706763570/IMG-20240201-WA0003_d8aout.jpg",
promotion:false,
},
]

interface TemplateProps{
  navigation: StackNavigationProp<RootStackParamList,"Login">,
}

const Templates = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const navigateToEditor=(templateImg:string,promotion:boolean)=>{
    navigation.navigate('TemplateEditor',{
      templateImg,
      promotion,
    })    
  }
  return (
    <View className='flex-1 bg-white pb-16'> 
    <HeaderBar name={'Social Media Designs'} logo={false} help={false} search={true}/>
    <ScrollView className=''>
    <TemplateScroll templateData={templateData} navigateToEditor={navigateToEditor} categoryName='Editors Choice'/>
    <TemplateScroll templateData={templateData} navigateToEditor={navigateToEditor} categoryName='Good Morning'/>
    {/* <TemplateScroll templateData={templateData} navigateToEditor={navigateToEditor} categoryName='Jai Shree Ram'/>
    <TemplateScroll templateData={templateData} navigateToEditor={navigateToEditor} categoryName='Goood Night'/>
    <TemplateScroll templateData={templateData} navigateToEditor={navigateToEditor} categoryName='Motivation'/>
   <TemplateScroll templateData={templateData} navigateToEditor={navigateToEditor} categoryName='Job Posting'/> */}
   {/* <KarykartaTemp/> */}
    </ScrollView>
  </View>
  )
}

export default Templates
