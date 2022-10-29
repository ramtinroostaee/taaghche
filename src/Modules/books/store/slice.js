import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";
import {apiCallTry} from "reusable/axios";

export const GetBooks = createAsyncThunk(
  "books/Get",
  async (_, {getState}) => {
    const {sort, perPage, page, filters} = getState().books.slice;

    const url = `/api/wayBill?perPage=${perPage}&sort=${sort}&page=${page}${filters}`;

    const response = await apiCallTry(() => axios.get(url));
    return response.data;
  }
);

const initialState = {
  searchText: "",
  perPage: 10,
  sort: 25,
  page: 1,
  filters: "",
  data: [],
};

const books = createSlice({
  name: "books",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({payload: event.target.value || ""})
    },
    setPageConfig: (state, action) => {
      return {...state, ...action.payload};
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
      return state;
    },
    clearStore: () => _.cloneDeep(initialState),
  },
  extraReducers: {
    [GetBooks.fulfilled]: (state, action) => ({
      ...state,
      ...action.payload
    }),
  }
});

export const {
  setSearchText,
  setPageConfig,
  setPerPage,
  clearStore,
} = books.actions;

export default books.reducer;
