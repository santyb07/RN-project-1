import { View, Text } from 'react-native'
import React from 'react'

interface Props{
    name:string,
    logo?:string |undefined
}
const Clip = ({name}:Props) => {
  return (
      <Text className="inline-block h-8 mr-3 rounded-full text-black text-center border-2 px-3 py-1.5 text-md border-gray-400 font-['Montserrat-Medium']">{name}</Text>
  )
}

export default Clip