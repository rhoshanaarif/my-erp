import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../../utils/constants";
import { getUserRoles  } from "../../services/api";

const namespace = "userroles";
const initialState = {
   userroleloading: 'initial',
  loadData: null,
  error: null,
};

export const fetchUserRoles = createAsyncThunk(
    `${namespace}/getUserRoles'`,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await getUserRoles();
        console.log("getUserRoles--> ", response);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

 
  const userroleSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
      // ... other reducers ...
    },
    extraReducers: {
      
  
      [fetchUserRoles.pending](state) {
        state.userroleloading = API_STATUS.PENDING;
      },
      [fetchUserRoles.fulfilled](state, action) {
        state.userroleloading = API_STATUS.FULFILLED;
        state.loadData = action.payload;
      },
      [fetchUserRoles.rejected](state) {
        state.userroleloading = API_STATUS.REJECTED;
      },
     
    },
  });

export const userroleSelector = (state) => state.userroles;
export default userroleSlice.reducer;
