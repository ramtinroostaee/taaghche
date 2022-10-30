import React, {forwardRef, useCallback, useState} from "react";
import {Paper, Rating} from "@mui/material";
import BookDetail from "Modules/books/components/BookDetail";

const BookCard = forwardRef((props, ref) => {
  const {coverUri, authors, title, price, rating} = props;
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <Paper ref={ref} onClick={() => setModalOpen(true)} elevation={5}
             className="flex flex-col md:flex-row font-sans w-full my-4 cursor-pointer">
        <div className="flex justify-center items-center w-48 relative">
          <img src={coverUri} alt="book cover"
               className="w-36 h-36 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
               loading="lazy"/>
        </div>
        <div className="flex-auto p-6">
          <div className="flex flex-wrap">
            <h1 className="flex-auto text-lg font-semibold text-slate-900">
              {title}
            </h1>
            <div className="text-lg font-semibold text-slate-500">
              {price}
            </div>
            {/*<div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">*/}
            {/*  موجود*/}
            {/*</div>*/}
          </div>
          <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
            <div className="space-x-2 flex text-sm">
              <Rating name="half-rating" readOnly defaultValue={rating} precision={0.1}/>
            </div>
          </div>
          <p className="text-sm text-slate-700">
            {authors?.map((author => author?.firstName + " " + author?.lastName + "،"))}
          </p>
        </div>
      </Paper>

      <BookDetail handleClose={handleClose} modalOpen={modalOpen} {...props} />

    </>
  );
});

export default BookCard;
