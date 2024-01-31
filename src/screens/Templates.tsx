import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderBar from './components/HeaderBar'
import LottieView from 'lottie-react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/appNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../navigation/AppStack';
import { useNavigation } from '@react-navigation/native';


const {width, height} = Dimensions.get('window');


const templateData=[
  {
    templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg',
    promotion:false,
},
{
  templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg',
  promotion:false,
},
{
  templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg',
  promotion:false,
},
{
  templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg',
  promotion:false,
},
{
  templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg',
  promotion:false,
},
{
  templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg',
  promotion:false,
},
{
  templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706686607/IMG-20240131-WA0003_dmda7w.jpg',
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
    <View className='flex-1 bg-white'>
    <HeaderBar name={'Social Media Designs'} logo={false} help={false} search={true}/>
    <View className="w-full">
      <View className='flex-row justify-between px-3 py-3'>
        <Text className='text-base font-["Montserrat-Bold"] text-gray-700'>Editor's Choice</Text>
        <View className='flex-row space-x-1'>
        <Text className='text-sm font-["Montserrat-SemiBold"] text-gray-700'>See All</Text>
        <FontAwesome5Icon name="angle-right" size={20}/>
        </View>
      </View>
      {/* Templates section */}
      <View>
      <FlatList
      style={{
        // backgroundColor: '#FFFFFF',
        // marginBottom:150,
        // position:'relative',
        // top:100
        display:'flex',
        flexDirection:'row'
      }}
      horizontal
      data={templateData}
      renderItem={item=>{
        return(
          <TouchableOpacity onPress={()=>navigateToEditor(item.item.templateImg,item.item.promotion)}>
          <Image source={{uri:item.item.templateImg}} height={120} width={120} resizeMode='contain'/> 
          </TouchableOpacity>
        )
      }
    }
      />
      </View>
    </View>
  </View>
  )
}

export default Templates
