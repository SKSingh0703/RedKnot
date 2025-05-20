import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

type Project = {
  name: string;
  description: string;
};

type Projects = Project[];

interface ProjectsState {
  projects: Projects;
}

const initialState: ProjectsState = {
  projects: [
    {
      name: '',
      description: ''
    }
  ]
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectName: (
      state,
      action: PayloadAction<{ index: number; name: string }>
    ) => {
      const { index, name } = action.payload;
      if (state.projects[index]) {
        state.projects[index].name = name;
      }
    },
    setProjectDescription: (
      state,
      action: PayloadAction<{ index: number; description: string }>
    ) => {
      const { index, description } = action.payload;
      if (state.projects[index]) {
        state.projects[index].description = description;
      }
    },
    setAllFields: (state, action: PayloadAction<Projects>) => {
      state.projects = action.payload;
    }
  }
});

export const {
  setProjectName,
  setProjectDescription,
  setAllFields
} = projectsSlice.actions;

export default projectsSlice.reducer;
