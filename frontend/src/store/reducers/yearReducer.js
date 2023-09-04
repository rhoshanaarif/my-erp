import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../../utils/constants";
import { getYears  } from "../../services/api";

const namespace = "years";
const initialState = {
    yearloading: 'initial',
  loadData: null,
  error: null,
};

export const fetchYears = createAsyncThunk(
    `${namespace}/getYears'`,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await getYears();
        console.log("getYears--> ", response);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

 
  const yearSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
      // ... other reducers ...
    },
    extraReducers: {
      
  
      [fetchYears.pending](state) {
        state.yearloading = API_STATUS.PENDING;
      },
      [fetchYears.fulfilled](state, action) {
        state.yearloading = API_STATUS.FULFILLED;
        state.loadData = action.payload;
      },
      [fetchYears.rejected](state) {
        state.yearloading = API_STATUS.REJECTED;
      },
     
    },
  });

export const yearSelector = (state) => state.years;
export default yearSlice.reducer;
