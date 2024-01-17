import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import type { Action, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from "@react-native-async-storage/async-storage"
import {PURGE} from "redux-persist"
export interface OnboardState {
    userLoggedIn: boolean | null,
    mobileNumber: number | null,
}

const initialState: OnboardState = {
    userLoggedIn: null,
    mobileNumber: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser:(state,actions)=>{
        state.userLoggedIn = true;
        state.mobileNumber = actions.payload;
        // console.warn('user loggedin');
    },
    logoutUser:(state)=>{
        state.userLoggedIn = false;
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
export const {loginUser, logoutUser} = authSlice.actions

export default authSlice.reducer