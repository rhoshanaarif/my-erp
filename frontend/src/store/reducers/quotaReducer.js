import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../../utils/constants";
import { getQuotas  } from "../../services/api";

const namespace = "quotas";
const initialState = {
    quotaloading: 'initial',
  loadData: null,
  error: null,
};

export const fetchQuotas = createAsyncThunk(
    `${namespace}/getQuotas'`,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await getQuotas();
        console.log("getQuotas--> ", response);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

 
  const quotaSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
      // ... other reducers ...
    },
    extraReducers: {
      
  
      [fetchQuotas.pending](state) {
        state.quotaloading = API_STATUS.PENDING;
      },
      [fetchQuotas.fulfilled](state, action) {
        state.quotaloading = API_STATUS.FULFILLED;
        state.loadData = action.payload;
      },
      [fetchQuotas.rejected](state) {
        state.quotaloading = API_STATUS.REJECTED;
      },
     
    },
  });

export const quotaSelector = (state) => state.quotas;
export default quotaSlice.reducer;
