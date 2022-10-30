import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";
import {apiCallTry} from "reusable/axios";
import _ from "lodash";

export const GetBooks = createAsyncThunk(
  "books/Get",
  async (_, {getState}) => {
    const url = "/v2/everything?filters=%7B%22list%22:%5B%7B%22type%22:3,%22value%22:164%7D,%7B%22type%22:21,%22value%22:0%7D,%7B%22type%22:50,%22value%22:0%7D%5D%7D&offset=0-0-16-16&order=1";

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
  bookList: {books: []},
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
