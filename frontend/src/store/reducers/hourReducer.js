import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../../utils/constants";
import { deleteHour, getHourList, updateHour, submitHour } from "../../services/api"; // You'll need to replace these with your actual API functions

const namespace = "hours";
const initialState = {
  hoursLoading: "initial",
  submitHourLoading: "initial",
  updateHourLoading: "initial",
  deleteHourLoading: 'initial',
  hourData: null,
  submitHourData: null,
  updatedHourData: null,
  error: null,
};

export const getHours = createAsyncThunk(
  `${namespace}/getHourList`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getHourList();
      console.log("getHours--> ", response); // Replace 'getHourList' with your actual API function call
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createHour = createAsyncThunk(
    `${namespace}/submitHour`,
    async (hourData, { rejectWithValue }) => {
      try {
        const response = await submitHour(hourData);
        console.log("submittedHour--->", response)
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const updateHourAction = createAsyncThunk(
  `${namespace}/updateHour`,
  async ({ hourId, hourData }, { rejectWithValue }) => {
    try {
        console.log(hourId)
      const response = await updateHour(hourId, hourData);
      console.log("updatedHour--->", response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteHourAction = createAsyncThunk(
  `${namespace}/deleteHour`,
  async (hourId, { rejectWithValue }) => {
    try {
      const response = await deleteHour(hourId);
      console.log("deletedHour--->", response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const hourSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: {
    [getHours.pending](state) {
      state.hoursLoading = API_STATUS.PENDING;
      state.error = null;
    },
    [getHours.fulfilled](state, action) {
      state.hoursLoading = API_STATUS.FULFILLED;
      state.error = null;
      state.hourData = action.payload;
    },
    [getHours.rejected](state, action) {
      state.hoursLoading = API_STATUS.REJECTED;
      state.error = action.payload;
    },
    [createHour.pending](state) {
        state.submitHourLoading = API_STATUS.PENDING;
        state.error = null;
      },
      [createHour.fulfilled](state, action) {
        state.submitHourLoading = API_STATUS.FULFILLED;
        state.submitHourData = action.payload;
        state.error = null;
      },
      [createHour.rejected](state, action) {
        state.submitHourLoading = API_STATUS.REJECTED;
        state.error = action.payload;
      },
    [updateHourAction.pending](state) {
      state.updateHourLoading = API_STATUS.PENDING;
      state.error = null;
    },
    [updateHourAction.fulfilled](state, action) {
      state.updateHourLoading = API_STATUS.FULFILLED;
      state.updatedHourData = action.payload;
      state.error = null;
    },
    [updateHourAction.rejected](state, action) {
      state.updateHourLoading = API_STATUS.REJECTED;
      state.error = action.payload;
    },
    [deleteHourAction.pending](state) {
      state.deleteHourLoading = API_STATUS.PENDING;
      state.error = null;
    },
    [deleteHourAction.fulfilled](state, action) {
      state.deleteHourLoading = API_STATUS.FULFILLED;
      state.error = null;
    },
    [deleteHourAction.rejected](state, action) {
      state.deleteHourLoading = API_STATUS.REJECTED;
      state.error = action.payload;
    },
  },
});

export const hourSelector = (state) => state.hours;
export default hourSlice.reducer;
