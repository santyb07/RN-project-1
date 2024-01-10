import React from 'react'
import { Text, View } from 'react-native'

import {RootStackParamList } from '../navigation/appNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';

interface HomeScreenProps{
  // navigation: StackNavigationProp<RootStackParamList,"Home">,
}

const HomeScreen= (props:HomeScreenProps)  => {
  const value= useRoute();

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}

export default HomeScreen