import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../../utils/constants";
import { getSubjects } from "../../services/api";

const namespace = "subjects";
const initialState = {
    subjectsloading: 'initial',
  loadData: null,
  error: null,
};

export const fetchSubjects = createAsyncThunk(
    `${namespace}/getSubjects'`,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await getSubjects();
        console.log("getSubjects--> ", response);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

 
  const subjectSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
      // ... other reducers ...
    },
    extraReducers: {
      
  
      [fetchSubjects.pending](state) {
        state.subjectsloading = API_STATUS.PENDING;
      },
      [fetchSubjects.fulfilled](state, action) {
        state.subjectsloading = API_STATUS.FULFILLED;
        state.loadData = action.payload;
      },
      [fetchSubjects.rejected](state, action) {
        state.subjectsloading = API_STATUS.REJECTED;
        state.error = action.payload
      },
      
      
      
    },
  });

export const subjectSelector = (state) => state.subjects;
export default subjectSlice.reducer;
