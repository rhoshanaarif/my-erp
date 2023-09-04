import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../../utils/constants";
import {
  getDepartments,
  addDepartment,
  deleteDepartment,
  updateDepartment,
  updateDepartmentClasses,
} from "../../services/api";

const namespace = "departments";
const initialState = {
  departmentsloading: "initial",
  updatedepartmentloading: "initial",
  adddepartmentloading: "initial",
  deletedepartmentloading: "initial",
  updatedepartmentclassloading: "initial",
  loadData: null,
  error: null,
};

export const fetchDepartments = createAsyncThunk(
  `${namespace}/getDepartments'`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getDepartments();
      console.log("getDepartments--> ", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addDepartmentAsync = createAsyncThunk(
  `${namespace}/addDepartment`,
  async (department, { rejectWithValue }) => {
    try {
      const response = await addDepartment(department);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteDepartmentAsync = createAsyncThunk(
  `${namespace}/deleteDepartment`,
  async (classId, { rejectWithValue }) => {
    try {
      const response = await deleteDepartment(classId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateDepartmentAsync = createAsyncThunk(
  `${namespace}/updateDepartment`,
  async ({ _id, name }, { rejectWithValue }) => {
    try {
      console.log(name);
      const response = await updateDepartment(_id, name);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateDepartmentClassesAsync = createAsyncThunk(
  `${namespace}/updateDepartmentClasses`,
  async ({ deptId, classes }, { rejectWithValue }) => {
    try {
      const response = await updateDepartmentClasses(deptId, classes);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const departmentSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    // ... other reducers ...
  },
  extraReducers: {
    [fetchDepartments.pending](state) {
      state.departmentsloading = API_STATUS.PENDING;
    },
    [fetchDepartments.fulfilled](state, action) {
      state.departmentsloading = API_STATUS.FULFILLED;
      state.loadData = action.payload;
    },
    [fetchDepartments.rejected](state) {
      state.departmentsloading = API_STATUS.REJECTED;
    },
    [addDepartmentAsync.pending](state) {
      state.adddepartmentloading = API_STATUS.PENDING;
    },
    [addDepartmentAsync.fulfilled](state, action) {
      state.adddepartmentloading = API_STATUS.FULFILLED;
      state.loadData = action.payload;
    },
    [addDepartmentAsync.rejected](state) {
      state.adddepartmentloading = API_STATUS.REJECTED;
    },
    [deleteDepartmentAsync.pending](state) {
      state.deletedepartmentloading = API_STATUS.PENDING;
    },
    [deleteDepartmentAsync.fulfilled](state, action) {
      state.deletedepartmentloading = API_STATUS.FULFILLED;
      state.loadData = action.payload;
    },
    [deleteDepartmentAsync.rejected](state, action) {
      state.deletedepartmentloading = API_STATUS.REJECTED;
      state.error = action.payload;
    },
    [updateDepartmentAsync.pending](state) {
      state.updatedepartmentloading = API_STATUS.PENDING;
    },
    [updateDepartmentAsync.fulfilled](state, action) {
      state.updatedepartmentloading = API_STATUS.FULFILLED;
      state.loadData = action.payload;
    },
    [updateDepartmentAsync.rejected](state, action) {
      state.updatedepartmentloading = API_STATUS.REJECTED;
      state.error = action.payload;
    },
    [updateDepartmentClassesAsync.pending](state) {
      state.updatedepartmentclassloading = API_STATUS.PENDING;
    },
    [updateDepartmentClassesAsync.fulfilled](state, action) {
      state.updatedepartmentclassloading = API_STATUS.FULFILLED;
      state.loadData = action.payload;
    },
    [updateDepartmentClassesAsync.rejected](state, action) {
      state.updatedepartmentclassloading = API_STATUS.REJECTED;
      state.error = action.payload;
    },
  },
});

export const departmentSelector = (state) => state.departments;
export default departmentSlice.reducer;
