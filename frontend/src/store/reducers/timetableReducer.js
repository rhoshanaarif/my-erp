import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../../utils/constants";
import { getTimeTables } from "../../services/api";

const namespace = "timetables";
const initialState = {
    timetablesloading: 'initial',
  loadData: null,
  error: null,
};

export const fetchTimeTables = createAsyncThunk(
    `${namespace}/getTimeTables'`,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await getTimeTables();
        console.log("getTimeTables--> ", response);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

 
  const timetableSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
      // ... other reducers ...
    },
    extraReducers: {
      
  
      [fetchTimeTables.pending](state) {
        state.timetablesloading = API_STATUS.PENDING;
      },
      [fetchTimeTables.fulfilled](state, action) {
        state.timetablesloading = API_STATUS.FULFILLED;
        state.loadData = action.payload;
      },
      [fetchTimeTables.rejected](state, action) {
        state.timetablesloading = API_STATUS.REJECTED;
        state.error = action.payload
      },
      
      
      
    },
  });

export const timetableSelector = (state) => state.timetables;
export default timetableSlice.reducer;
