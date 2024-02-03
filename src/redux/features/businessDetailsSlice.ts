import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import type { Action, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from "@react-native-async-storage/async-storage"
import {PURGE} from "redux-persist"
export interface businessDetailsProps{
        businessName:string | null,
        email:string | null,
        location:string | null,
        logo:string | null,
        mobileNumber1:string | null,
        mobileNumber2:string | null,
        website:string | null
}

const initialState: businessDetailsProps= {
    businessName:'',
    email:'',
    location:'',
    logo:'',
    mobileNumber1:'',
    mobileNumber2:'',
    website:'',
}

export const businessDetailsSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    addBusinessDetails:(state,action)=>{
        state.businessName =action.payload.businessName;
        state.email =action.payload.email;
        state.logo=action.payload.logo;
        state.mobileNumber1 =action.payload.mobileNumber1;
        state.mobileNumber2 =action.payload.mobileNumber2;
        state.website =action.payload.website;
        state.location =action.payload.location;
    },
    clearBusinessDetails:(state)=>{
        state.businessName ='';
        state.email ='';
        state.mobileNumber1 ='';
        state.mobileNumber2 ='';
        state.website ='';
        state.location ='';
        // console.warn('user loggedin');
    },
  },
  extraReducers:builder=>{
    builder.addCase(PURGE,()=>{
      AsyncStorage.removeItem('persist:root');
      return initialState;
    })
  }

})

// Action creators are generated for each case reducer function
export const {addBusinessDetails, clearBusinessDetails} = businessDetailsSlice.actions

export default businessDetailsSlice.reducer