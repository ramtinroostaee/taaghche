import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetBooks} from "Modules/books/store/slice";
import {createSelector} from "@reduxjs/toolkit";
import reducer from "Modules/books/store";
import withReducer from "reusable/redux/withReducer";
import BookCards from "Modules/books/components/BookCards";
import BookCard from "Modules/books/components/BookCard";

const selectMaker = (data) =>
  createSelector(
    ({books}) => books?.slice[data],
    (data) => data
  );

const Books = () => {
  const books = useSelector(selectMaker("bookList"))?.books ?? [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetBooks());
  }, []);

  return (
    <div className="w-full flex flex-col justify-center mt-16">
      {books?.map((e) => <BookCard key={e?.id} {...e} />)}
    </div>
  )
};

export default withReducer("books", reducer)(Books);
