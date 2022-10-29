import React from "react";
import {Rating} from "@mui/material";

const BookCard = ({coverUri, authors, title, price, rating}) => {
  return (
    <div className="flex flex-col md:flex-row font-sans max-w-[1000px] my-4 mx-16">
      <div className="flex justify-center items-center w-48 relative">
        <img src={coverUri} alt="book covers" className="w-36 h-36 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
             loading="lazy" />
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
            <Rating name="half-rating" defaultValue={rating} precision={0.1} />
          </div>
        </div>
        <p className="text-sm text-slate-700">
          {authors?.map((author => author?.firstName + " " + author?.lastName + "،"))}
        </p>
      </div>
    </div>
  );
};

export default BookCard;