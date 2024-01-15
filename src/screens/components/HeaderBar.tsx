import { View, Text } from 'react-native'
import React from 'react'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"


interface headerBarProps{
    logo:boolean,
    name:string,
    help:boolean,
    search:boolean,
}

const HeaderBar = ({logo,name,help,search}:headerBarProps) => {
  return (
    <View className='w-full flex-row bg-white px-5 py-2 justify-between items-center'>
    <View className='flex flex-row justify-center items-center'>
    {
        logo && <Text className="inline-block rounded-full text-white bg-purple-500 px-2 py-1 text-xs font-bold font-['Montserrat-Regular']">Logo</Text>
    }
    {
        name.length>3 && <Text className=" text-gray-700 px-2 py-1 text-lg font-['Montserrat-Bold']">{name}</Text>

    }
    </View>
    {
        help && <Text className="inline-block rounded-full text-black border px-3 py-1.5 text-md items-center justify-center  font-['Montserrat-Medium']"> <FontAwesomeIcon name="phone" color={"#000000"} size={15} /> Help?</Text>
    }
    {
        search && <Text className="inline-block rounded-full text-black border px-3 py-1.5 text-md items-center justify-center  font-['Montserrat-Medium']"> <FontAwesomeIcon name="search" color={"#000000"} size={15} /> Search</Text>

    }
    </View>
  )
}

export default HeaderBar