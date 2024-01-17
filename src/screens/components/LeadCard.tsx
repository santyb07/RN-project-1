import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import { colors } from '../../utils/constants'

const LeadCard = () => {
  return (
    <View style={styles.card}>
      <View className=" flex-row justify-between items-between ">
        <View className='px-3 flex-row space-x-3 py-4'>
        <Image source={{uri:'https://cdn.pixabay.com/photo/2018/05/21/19/50/sticker-3419259_1280.jpg'}} className='h-16 w-20 rounded-lg' resizeMode={'cover'}/>
        <View className='justify-around'>
            <Text className='font-[Montserrat-SemiBold]'>Demo Lead 1</Text>
            <Text className='text-gray-500 font-[Montserrat-SemiBold]'>+91 9876543210</Text>
            <Text className=' text-xs text-gray-500 font-[Montserrat-Medium]'>Added : 17-01-2023</Text>
        </View>
        </View>
        <View className='justify-between items-end '>
            <Text className='font-[Montserrat-Regular] bg-green-200 text-black px-2 py-1 rounded-md rounded-tl-none rounded-br-none'>
                New Lead
            </Text>
            <Text className='px-3 pb-4'>
            <FontAwesomeIcons name={'phone-square'} size={48} color={colors.ActiveColor2}/>
            </Text>
        </View>
      </View>
    </View>
  )
}

export default LeadCard

const styles = StyleSheet.create({
    card: {
      // maxWidth: 340,
      width:'100%',
      margin: 'auto',
      backgroundColor: '#ffffff',
      borderRadius: 12,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
      marginTop:9
    },
    cardImage: {
      width: '100%',
      height: 160, // You can adjust the height as needed
      resizeMode: 'cover',
    },
    cardContent: {
      padding: 12,
    },
    cardTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 8,
    },
    cardText: {
      color: '#555555',
      fontSize: 14,
      lineHeight: 20,
    },
    tag: {
      backgroundColor: '#e2e8f0',
      color: '#4a5568',
      paddingVertical: 4,
      paddingHorizontal: 8,
      marginRight: 8,
      borderRadius: 9999,
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
  