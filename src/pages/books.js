import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetBooks, setPageConfig} from "Modules/books/store/slice";
import {createSelector} from "@reduxjs/toolkit";
import reducer from "Modules/books/store";
import withReducer from "reusable/redux/withReducer";
import BookCard from "Modules/books/components/BookCard";
import {Button, Paper, Typography} from "@mui/material";
import {filters, sorts} from "Modules/books/arrays/sorts";
import {useOnScreen} from "reusable/hooks/useOnScreen";

const selectMaker = (data) =>
  createSelector(
    ({books}) => books?.slice[data],
    (data) => data
  );

const Books = () => {
  const books = useSelector(selectMaker("bookList"))?.books;
  const dispatch = useDispatch();
  const [filteredBooks, setFilteredBook] = useState();
  const lastElementRef = useRef();
  const [isOnScreen, setIsOnScreen] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    );
  }, []);

  useEffect(() => {
    dispatch(GetBooks());
  }, []);

  useEffect(() => {
    setFilteredBook(books);
  }, [books]);

  useEffect(() => {
    if (filteredBooks?.length) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => {
      observerRef.current.disconnect();
    };
  }, [filteredBooks]);

  useEffect(() => {
    if (isOnScreen) dispatch(GetBooks());
  }, [isOnScreen]);

  return (
    <div className="w-full sm:w -3/4 lg:px-32 mt-16">
      <div className="w-full flex flex-col justify-center">
        <Paper className="px-6 w-full flex flex-col" elevation={5}>
          <div className="flex justify-around flex-col sm:flex-row">
            <div>
              <Typography variant="h6" className="my-2">
                مرتب سازی:
              </Typography>
              <div className="flex flex-col items-start mr-8 sm:mr-0 sm:flex-row my-2">
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
              <div className="flex my-2 flex-col items-start mr-8 sm:mr-0 sm:flex-row">
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

        {filteredBooks?.map((e, i) => {
          let ref;
          if (filteredBooks.length === i + 1) {
            ref = lastElementRef;
          }
          return <BookCard key={e?.id} ref={ref} {...e} />
        })}
      </div>
    </div>
  )
};

export default withReducer("books", reducer)(Books);
