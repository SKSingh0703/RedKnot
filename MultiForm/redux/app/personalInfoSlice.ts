import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface PersonalInfoState {
  name:string,
  email:string,
  addressLine1:string,
  addressLine2:string,
  city:string,
  state:string,
  zipcode:string,
}

const initialState: PersonalInfoState = {
    name: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipcode: '',
}

export const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<PersonalInfoState>) => {
        return { ...state, ...action.payload };
    }
},
})

export const { setPersonalInfo } = personalInfoSlice.actions
export default personalInfoSlice.reducer