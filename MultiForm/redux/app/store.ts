import { configureStore } from '@reduxjs/toolkit'
import personalInfoReducer from './personalInfoSlice'
import educationReducer from './educationSlice'
import projectsReducer from './projectsSlice'

export const store = configureStore({
  reducer: {
    personalInfo : personalInfoReducer,
    education : educationReducer,
    projects:projectsReducer
  },
}) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch