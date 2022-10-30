import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetBooks} from "Modules/books/store/slice";
import {createSelector} from "@reduxjs/toolkit";
import reducer from "Modules/books/store";
import withReducer from "reusable/redux/withReducer";
import BookCard from "Modules/books/components/BookCard";
import {Button, Paper, Typography} from "@mui/material";
import {filters, sorts} from "Modules/books/arrays/sorts";

const selectMaker = (data) =>
  createSelector(
    ({books}) => books?.slice[data],
    (data) => data
  );

const Books = () => {
  const books = useSelector(selectMaker("bookList"))?.books;
  const dispatch = useDispatch();
  const [filteredBooks, setFilteredBook] = useState();

  useEffect(() => {
    dispatch(GetBooks());
  }, []);

  useEffect(() => {
    setFilteredBook(books);
    books.forEach((e) => console.log(e.type))
  }, [books]);

  return (
    <div className="w-full sm:w -3/4 lg:px-32 mt-16">
      <div className="w-full flex flex-col justify-center">
        <Paper className="px-6 w-full flex flex-col" elevation={5}>
          <div className="flex justify-around">
            <div>
              <Typography variant="h6" className="my-2">
                مرتب سازی:
              </Typography>
              <div className="flex my-2">
                {sorts?.map((e) =>
                  <Button key={e.name} variant="contained" className="rounded-6 min-w-96 m-2 font-semibold"
                          onClick={() => e.sort(books, setFilteredBook)}>
                    {e.name}
                  </Button>)}
              </div>
            </div>
            <div>
              <Typography variant="h6" className="my-2">
                فیلتر بر اساس:
              </Typography>
              <div className="flex my-2">
                {filters?.map((e) =>
                  <Button key={e.name} variant="contained" className="rounded-6 min-w-96 m-2 font-semibold"
                          onClick={() => e.sort(books, setFilteredBook)}>
                    {e.name}
                  </Button>)}
              </div>
            </div>
          </div>
          <Button className="text-red-600 font-semibold mx-auto" onClick={() => setFilteredBook(books)}>حذف فیلتر
            ها</Button>
        </Paper>

        {filteredBooks?.map((e) => <BookCard key={e?.id} {...e} />)}
      </div>
    </div>
  )
};

export default withReducer("books", reducer)(Books);
