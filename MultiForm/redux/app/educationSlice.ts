import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface EducationState {
  studying: boolean;
  institution: string;
}

const initialState: EducationState = {
  studying: false,
  institution: '',
};

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    setEducation: (state, action: PayloadAction<EducationState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setEducation } = educationSlice.actions;
export default educationSlice.reducer;
