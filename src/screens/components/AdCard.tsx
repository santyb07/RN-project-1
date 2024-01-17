import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ThemeHeading from './ThemeHeading'
import AddParams from './AddParams'

const adParamData={
  'AD VIEWS':0,
  'CLICKS':0,
  'SPENT':0,
  'PLATFORM':['instagram','facebook'],
}

const AdCard = () => {
  return (
    <View style={styles.card}>
      <View className="px-3 flex-col py-4">
        <View>
        {/* <ThemeHeading heading={'Branding 19-12-2021'}/> */}
        <Text className=" text-lg text-gray-700 font-[Montserrat-Bold]">Branding 19-12-2021</Text>
        <Text className=" text-md mb-2 text-orange-400 font-[Montserrat-SemiBold]">02 Oct to 03 Oct, 2021</Text>
        </View>
        <View className='flex-row space-x-3'>
          <Image source={{uri:'https://cdn.pixabay.com/photo/2019/04/26/07/14/store-4156934_1280.png'}} className='h-28 w-36 rounded-lg' resizeMode={'cover'}/>
          {/* <View className=' bg-red-500 justify-around flex-grow flex-1 flex-row flex-wrap'>
         <AddParams count={"1000"} name={'AD VIEWS'} logo={""}/>
         <AddParams count={"478"} name={'CLICKS'} logo={""}/>
         <AddParams count={"3000"} name={'SPENT'} logo={"rupee"}/>
         <AddParams count={"1000"} name={'AD VIEWS'} logo={""}/>
          </View>
        </View> */}
        <View className=' justify-around flex-grow flex-1 flex-row flex-wrap'>
          <View>
         <AddParams count={"1000"} name={'AD VIEWS'}/>
         <AddParams count={"3000"} name={'SPENT'} logo={"rupee"}/>
          </View>
          <View>
         <AddParams count={"478"} name={'CLICKS'}/>
         <AddParams name={'PLATFORMS'} platforms={['instagram','facebook-square']}/>
          </View>
          </View>
        </View>
          <TouchableOpacity className='w-full bg-blue-500 rounded-xl mt-3 '>
        <View className=' flex-row justify-center items-center py-3'>
            <Text className='font-[Montserrat-Medium] text-lg text-white'>See Details</Text>
        </View>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default AdCard


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

 