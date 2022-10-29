import {combineReducers} from "@reduxjs/toolkit";
import books from "./slice";

const reducer = combineReducers({
    slice: books,
});

export default reducer;
