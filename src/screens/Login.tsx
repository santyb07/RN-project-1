import { StackNavigationProp } from '@react-navigation/stack'
import React,{ useContext, useState} from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { RootStackParamList } from '../navigation/appNavigation'
import { AuthContext } from '../context/AuthContext'
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'


interface LoginScreenProps{
    navigation: StackNavigationProp<RootStackParamList,"Login">,
  }

const Login = (props:LoginScreenProps) => {
  const [number,setChangeNumber]= useState<string>("");


  const onChanged =(text:string)=>{
    let mobile= text.replace(/[^0-9]/g, '');
    setChangeNumber(mobile);
    console.warn(number)
}

  return (
    <View style={styles.loginScreen}>
      <Text>
        Mobile Number
      </Text>
      <TextInput 
      style={styles.input}
      onChangeText={(text)=>onChanged(text)}
      autoFocus={true}
      value={number}
      keyboardType="numeric"
      placeholder=''

      />
        <Button title="Continue" />
    </View>
  )
}

const styles = StyleSheet.create({
  loginScreen:{
    flex:1,
    paddingHorizontal:20,
    // backgroundColor:'black'
    justifyContent:'center',
    gap:10
  },


  input: {
    height: 40,
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    color:'black'
  },
});

export default Login

