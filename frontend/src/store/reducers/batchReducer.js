import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../../utils/constants";
import { getBatches  } from "../../services/api";

const namespace = "batches";
const initialState = {
    batchloading: 'initial',
  loadData: null,
  error: null,
};

export const fetchBatches = createAsyncThunk(
    `${namespace}/getBatches'`,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await getBatches();
        console.log("getBatches--> ", response);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

 
  const batchSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
      // ... other reducers ...
    },
    extraReducers: {
      
  
      [fetchBatches.pending](state) {
        state.batchloading = API_STATUS.PENDING;
      },
      [fetchBatches.fulfilled](state, action) {
        state.batchloading = API_STATUS.FULFILLED;
        state.loadData = action.payload;
      },
      [fetchBatches.rejected](state) {
        state.batchloading = API_STATUS.REJECTED;
      },
     
    },
  });

export const batchSelector = (state) => state.batches;
export default batchSlice.reducer;
