import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../../utils/constants";
import { getUserTypes  } from "../../services/api";

const namespace = "usertypes";
const initialState = {
   usertypeloading: 'initial',
  loadData: null,
  error: null,
};

export const fetchUserTypes = createAsyncThunk(
    `${namespace}/getUserTypes'`,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await getUserTypes();
        console.log("getUserTypes--> ", response);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

 
  const usertypeSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
      // ... other reducers ...
    },
    extraReducers: {
      
  
      [fetchUserTypes.pending](state) {
        state.usertypeloading = API_STATUS.PENDING;
      },
      [fetchUserTypes.fulfilled](state, action) {
        state.usertypeloading = API_STATUS.FULFILLED;
        state.loadData = action.payload;
      },
      [fetchUserTypes.rejected](state) {
        state.usertypeloading = API_STATUS.REJECTED;
      },
     
    },
  });

export const usertypeSelector = (state) => state.usertypes;
export default usertypeSlice.reducer;
