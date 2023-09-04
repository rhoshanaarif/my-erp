import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../../utils/constants";
import { getAcademics  } from "../../services/api";

const namespace = "academics";
const initialState = {
    academicloading: 'initial',
  loadData: null,
  error: null,
};

export const fetchAcademics = createAsyncThunk(
    `${namespace}/getAcademics'`,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await getAcademics();
        console.log("getAcademics--> ", response);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

 
  const academicSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
      // ... other reducers ...
    },
    extraReducers: {
      
  
      [fetchAcademics.pending](state) {
        state.academicloading = API_STATUS.PENDING;
      },
      [fetchAcademics.fulfilled](state, action) {
        state.academicloading = API_STATUS.FULFILLED;
        state.loadData = action.payload;
      },
      [fetchAcademics.rejected](state) {
        state.academicloading = API_STATUS.REJECTED;
      },
     
    },
  });

export const academicSelector = (state) => state.academics;
export default academicSlice.reducer;
