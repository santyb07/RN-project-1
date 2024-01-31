import React, { useCallback, useRef, useState } from 'react'
import { Stack } from './appNavigation'
import HomeScreen from '../screens/HomeScreen'
import {BottomTabBar, BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeatherIcons from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome6"

import { colors } from '../utils/constants';
import Templates from '../screens/Templates';
import AdsPackage from '../screens/AdsPackage';
import AllLeads from '../screens/AllLeads';
import BusinessDetails from '../screens/BusinessDetails';
import MainScreen from '../screens/MainScreen';
import TemplateEditor from '../screens/components/TemplateEditor';
import { NavigationContainer } from '@react-navigation/native';
import AccountOverview from '../screens/components/AccountOverview';

export type BottomTabParamList ={
 Home: undefined,
 Design: undefined,
 Grow: undefined,
 Leads: undefined,
 Business:undefined,
}

const Tab = createBottomTabNavigator<BottomTabParamList>();


// const HomeStack=()=>(
//   <Stack.Navigator 
//   screenOptions={{ 
//         contentStyle: {backgroundColor: 'white'},
//         animationTypeForReplace:"pop",
//         animation:"slide_from_right",
//      }}
//     >
//     <Stack.Screen name="AccountOverview" options={{headerShown:false}} component={HomeScreen}/>
//     {/* <Stack.Screen name="Templates" options={{headerShown:true}} component={}/> */}
//     </Stack.Navigator>
// )
// const TemplateStack=()=>(
//   <Stack.Navigator 
//   screenOptions={{ 
//         contentStyle: {backgroundColor: 'white'},
//         animationTypeForReplace:"pop",
//         animation:"slide_from_right",
//      }}
//     >
//     <Stack.Screen name="Templates" options={{headerShown:false}} component={Templates}/>
//     <Stack.Screen name="EditTemplates" options={{headerShown:true,title:'Edit Template'}} component={TemplateEditor}/>
//     </Stack.Navigator>
// )
// const AdsPackageStack=()=>(
//   <Stack.Navigator 
//   screenOptions={{ 
//         contentStyle: {backgroundColor: 'white'},
//         animationTypeForReplace:"pop",
//         animation:"slide_from_right",
//      }}
//     >
//     <Stack.Screen name="AdsPackage" options={{headerShown:false}} component={AdsPackage}/>
//     {/* <Stack.Screen name="Templates" options={{headerShown:true}} component={}/> */}
//     </Stack.Navigator>
// )
// const LeadsStack=()=>(
//   <Stack.Navigator 
//   screenOptions={{ 
//         contentStyle: {backgroundColor: 'white'},
//         animationTypeForReplace:"pop",
//         animation:"slide_from_right",
//      }}
//     >
//     <Stack.Screen name="AdsPackage" options={{headerShown:false}} component={AllLeads}/>
//     {/* <Stack.Screen name="Templates" options={{headerShown:true}} component={}/> */}
//     </Stack.Navigator>
// )
// const BusinessProfileStack=()=>(
//   <Stack.Navigator 
//   screenOptions={{ 
//         contentStyle: {backgroundColor: 'white'},
//         animationTypeForReplace:"pop",
//         animation:"slide_from_right",
//      }}
//     >
//     <Stack.Screen name="BusinessDetails" options={{headerShown:false}} component={BusinessDetails}/>
//     {/* <Stack.Screen name="Templates" options={{headerShown:true}} component={}/> */}
//     </Stack.Navigator>
// )

// const AppStack = () => {

//    return (
//     <Tab.Navigator
//     screenOptions={{
//       tabBarActiveTintColor: colors.ActiveColor,
//       tabBarInactiveTintColor: colors.InactiveColor,
//       tabBarStyle: {
//         position: 'absolute',
//         borderTopColor: 'rgba(0, 0, 0, .2)',
//         paddingBottom:10,
//         paddingTop:3,
//         height:60
//       },
//       headerShown:false,
//       tabBarLabelStyle:{fontFamily:'Montserrat-Medium',fontSize:12},
//     }}
//     backBehavior='initialRoute'
//     initialRouteName='Home'
//     >  
//          <Tab.Screen 
//          name="Home" 
//          component={HomeStack}
//          options={{
//            tabBarLabel: 'Home',
//            tabBarIcon: ({focused ,color, size}) => (
//              <FeatherIcons name="home" color={color} size={24} />
//          ),
    
//        }
//        } 
//          />
//          <Tab.Screen 
//          name="Design" 
//          component={TemplateStack}
//          options={()=>({
//            tabBarLabel: 'Design',
//           //  tabBarVisible: false,
//            tabBarIcon: ({color, size}) => (
//              <FeatherIcons name="layout" color={color} size={24} />
//          ),
//         })} 
//          />
//          <Tab.Screen 
//          name="Grow" 
//          component={AdsPackageStack}
//          options={()=>({
//            tabBarLabel: 'Grow',
//            tabBarIcon: ({color, size}) => (
//              <MaterialCommunityIcons name="rocket-launch" color={color} size={24} />
//              ),        
//             })} 
//             />
//          <Tab.Screen 
//          name="Leads" 
//          component={LeadsStack}
//          options={()=>({
//            tabBarLabel: 'Leads',
//            tabBarIcon: ({color, size}) => (
//              <MaterialCommunityIcons name="account-group-outline" color={color} size={24} />
//              ),
//             })}
//          />
//           <Tab.Screen 
//          name="Business" 
//          component={BusinessProfileStack}
//          options={()=>({
//            tabBarLabel: 'Business',
//            tabBarIcon: ({color, size}) => (
//              <FontAwesomeIcons name="building" color={color} size={24} />
//              ),
//        })}
//          /> 
//      </Tab.Navigator>
//    )
//  }


// export default AppStack;


const HomeTabs=()=>(
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
         component={HomeScreen}
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
         component={Templates}
         options={()=>({
           tabBarLabel: 'Design',
          //  tabBarVisible: false,
           tabBarIcon: ({color, size}) => (
             <FeatherIcons name="layout" color={color} size={24} />
         ),
        })} 
         />
         <Tab.Screen 
         name="Grow" 
         component={AdsPackage}
         options={()=>({
           tabBarLabel: 'Grow',
           tabBarIcon: ({color, size}) => (
             <MaterialCommunityIcons name="rocket-launch" color={color} size={24} />
             ),        
            })} 
            />
         <Tab.Screen 
         name="Leads" 
         component={AllLeads}
         options={()=>({
           tabBarLabel: 'Leads',
           tabBarIcon: ({color, size}) => (
             <MaterialCommunityIcons name="account-group-outline" color={color} size={24} />
             ),
            })}
         />
          <Tab.Screen 
         name="Business" 
         component={BusinessDetails}
         options={()=>({
           tabBarLabel: 'Business',
           tabBarIcon: ({color, size}) => (
             <FontAwesomeIcons name="building" color={color} size={24} />
             ),
       })}
         /> 
     </Tab.Navigator>
)


function AppStack() {
  return (
    <Stack.Navigator
    screenOptions={{ 
              contentStyle: {backgroundColor: 'white'},
              animationTypeForReplace:"pop",
              animation:"slide_from_right",
           }}
    >
      <Stack.Screen name="Home" component={HomeTabs} options={{headerShown:false}} />
      <Stack.Screen name="TemplateEditor" component={TemplateEditor} options={{headerShown:true,title:'Edit Template'}}/>
  </Stack.Navigator>
  );
}

export default AppStack;