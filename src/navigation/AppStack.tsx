import React from 'react'
import { Stack } from './appNavigation'
import HomeScreen from '../screens/HomeScreen'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeatherIcons from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome6"

import { Animated, Easing, Platform } from 'react-native';
import { colors } from '../utils/constants';
import Templates from '../screens/Templates';
import AdsPackage from '../screens/AdsPackage';
import AllLeads from '../screens/AllLeads';
import BusinessDetails from '../screens/BusinessDetails';

export type BottomTabParamList ={
 Home: undefined,
 Design: undefined,
 Grow: undefined,
 Leads: undefined,
 Business:undefined
}
interface TransitionParams {
  transition?: string;
}
interface SceneProps {
  layout: { initWidth: number; initHeight: number };
  position: Animated.Value;
  scene: { index: number; route: { params?: TransitionParams } };
  index:any;
  width:any;
}
type ScreenInterpolatorFunction = (sceneProps: SceneProps) => object;


let SlideFromRight: ScreenInterpolatorFunction = ({index, position, width}) => {
  const translateX = position.interpolate({
    inputRange: [index - 1, index],
    outputRange: [width, 0],
  });

  return { transform: [{ translateX }] };
};

export type BottomTabAnimation={
  initialRouteName:string,
  transitionConfig:()=>void;
};

const TransitionConfiguration = () => {
  return {
    gestureEnabled: true,
    cardOverlayEnabled: true,
    cardStyleInterpolator: ({ current, next, layouts }: any) => {
      const progress = Animated.add(
        current.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }),
        next
          ? next.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' })
          : 0
      );

      const width = layouts.screen.width;

      const translateX = progress.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [width, 0, -width],
      });

      return { cardStyle: { transform: [{ translateX }] } };
    },
  };
};

// const Tab = createBottomTabNavigator();

const Tab = createBottomTabNavigator<BottomTabParamList>();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AccountOverview"
      component={HomeScreen}
      options={{headerShown:false}}
    />
  </Stack.Navigator>
)

const DesignStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Templates"
      component={Templates}
      options={{headerShown:false}}
    />
  </Stack.Navigator>
)
const GrowStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AdsPackage"
      component={AdsPackage}
      options={{headerShown:false}}
    />
  </Stack.Navigator>
)

const LeadsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AllLeads"
      component={AllLeads}
      options={{headerShown:false}}
    />
  </Stack.Navigator>
)
const BusinessStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BusinessDetails"
      component={BusinessDetails}
      options={{headerShown:false}}
    />
  </Stack.Navigator>
)

const AppStack = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: colors.ActiveColor,
      tabBarInactiveTintColor: colors.InactiveColor,
      tabBarStyle: {
        position: 'absolute',
        borderTopColor: 'rgba(0, 0, 0, .2)',
        paddingBottom:10,
        paddingTop:3,
        height:60
      },
      headerShown:false,
      tabBarLabelStyle:{fontFamily:'Montserrat-Medium',fontSize:12},
    }}
    

    backBehavior='initialRoute'
    initialRouteName='Home'
    >
        <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused ,color, size}) => (
            <FeatherIcons name="home" color={color} size={24} />
        ),
    
      }
      } 
        />
        <Tab.Screen 
        name="Design" 
        component={DesignStack}
        options={()=>({
          tabBarLabel: 'Design',
          tabBarIcon: ({color, size}) => (
            <FeatherIcons name="layout" color={color} size={24} />
        ),
      })} 
        />
        <Tab.Screen 
        name="Grow" 
        component={GrowStack}
        options={()=>({
          tabBarLabel: 'Grow',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="rocket-launch" color={color} size={24} />
        ),        
      })} 
        />
        <Tab.Screen 
        name="Leads" 
        component={LeadsStack}
        options={()=>({
          tabBarLabel: 'Leads',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account-group-outline" color={color} size={24} />
        ),
      })}
        />
         <Tab.Screen 
        name="Business" 
        component={BusinessStack}
        options={()=>({
          tabBarLabel: 'Business',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcons name="building" color={color} size={24} />
        ),
      })}
        />
    </Tab.Navigator>
  )
}

export default AppStack