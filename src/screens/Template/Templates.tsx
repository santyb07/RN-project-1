import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderBar from '../components/HeaderBar'
import LottieView from 'lottie-react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/appNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/AppStack';
import { useNavigation } from '@react-navigation/native';
import TemplateScroll from './components/TemplateScroll';
import { ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../../utils/constants';
import { showMessage } from 'react-native-flash-message';

const {width, height} = Dimensions.get('window');


const templateData=[
  {
    templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1707573834/WhatsApp_Image_2024-02-10_at_7.30.08_PM_o2odlv.jpg',
    promotion:false,
},
{
  templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1707573833/WhatsApp_Image_2024-02-10_at_7.30.09_PM_aanxmx.jpg',
  promotion:false,
},
{
  templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1707573833/WhatsApp_Image_2024-02-10_at_7.30.09_PM_1_mslhxa.jpg',
  promotion:false,
},
{
templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1707573830/WhatsApp_Image_2024-02-10_at_7.30.10_PM_lkowul.jpg',
promotion:false,
},
{
  templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1707573830/WhatsApp_Image_2024-02-10_at_7.30.10_PM_1_hn0hxg.jpg',
  promotion:false,
},
{
templateImg:"https://res.cloudinary.com/drxhgcqvw/image/upload/v1707573830/WhatsApp_Image_2024-02-10_at_7.30.10_PM_2_yzryyt.jpg",
promotion:false,
},
{
  templateImg:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1707573830/WhatsApp_Image_2024-02-10_at_7.30.11_PM_1_urjhsi.jpg',
  promotion:false,
},
{
templateImg:"https://res.cloudinary.com/drxhgcqvw/image/upload/v1707573829/WhatsApp_Image_2024-02-10_at_7.30.12_PM_1_st9pga.jpg",
// templateImg:"https://res.cloudinary.com/drxhgcqvw/image/upload/v1706763570/IMG-20240201-WA0003_d8aout.jpg",
promotion:false,
},
]

interface TemplateProps{
  navigation: StackNavigationProp<RootStackParamList,"Login">,
}

interface ImageObject {
  url: string;
  tags?: string[];
}

interface CategoryObject {
  created_at: { nanoseconds: number, seconds: number };
  images: ImageObject[];
  name: string;
}
const Templates = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [categories, setCategories] = useState<CategoryObject[]>([]);
  const [loading, setLoading] = useState(true);

  function convertToCategoryObject(doc: any): CategoryObject {
    const created_at = doc.created_at; // Assuming created_at is stored as is in Firestore
    const images = doc.images.map((image: any) => ({ url: image.url })); // Convert images array
    const name = doc.name;
    

    return { created_at, images, name };
}

  useEffect(()=>{
 async function fetchCategoriesFromFirestore() {
      const collectionRef = firestore().collection('imageCategories');

      try {
        const querySnapshot = await collectionRef.get();
        const fetchedCategories: CategoryObject[] = [];

        querySnapshot.forEach((doc) => {
          const categoryObject = convertToCategoryObject(doc.data());
          fetchedCategories.push(categoryObject);
        });

        setCategories(fetchedCategories);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
        setLoading(false);
        showMessage({
          message: "Something went wrong, contact the developer",
          // description: "This is our second message",
          type: "danger",
          titleStyle:{fontFamily:'Montserrat-Bold',textAlign:"center",color:'#FFFFFF'},
          // backgroundColor:"#000000"
        });
      }
    }

    fetchCategoriesFromFirestore();
  },[])




  const navigateToEditor=(templateImg:string,promotion:boolean)=>{
    navigation.navigate('TemplateEditor',{
      templateImg,
      promotion,
    })    
  }

  const getNumberOfCategories = () => {
    console.log('Number of categories:', categories.length);
  };
  if (loading) {
    return (    
      <View className='flex-1 bg-white pb-16 items-center'> 
      <HeaderBar name={'Social Media Designs'} logo={false} help={false} search={true}/>
      <View className='flex-1 justify-center items-center'>
      <Text>
    <ActivityIndicator size="large" color={colors.ActiveColor} />
      </Text>
      </View>
    </View>
    )
  }
  return (
    <View className='flex-1 bg-white pb-16 justify-center items-center'> 
    <HeaderBar name={'Social Media Designs'} logo={false} help={false} search={true}/>
   <FlatList
   // horizontal
   data={categories}
   renderItem={({ item }) => (
          <TemplateScroll templateData={item.images} navigateToEditor={navigateToEditor} categoryName={item.name} />
        )}
        keyExtractor={(item, index) => index.toString()}
        />
      {/* <Text onPress={getNumberOfCategories}>Get numbers</Text> */}
  
    </View>
  )
}

export default Templates
