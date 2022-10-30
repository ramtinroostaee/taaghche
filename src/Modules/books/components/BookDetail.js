import React from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  IconButton, Slide,
  Toolbar,
  Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BookDetail = ({
                      modalOpen,
                      handleClose,
                      title,
                      coverUri,
                      publisher,
                      rating,
                      description,
                      PhysicalPrice,
                      numberOfPages,
                      id,
                    }) => {
  return (<>
      <Dialog
        open={modalOpen}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={"md"}
        fullWidth
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <main className="py-6 px-4 sm:p-6 md:py-8 md:px-6">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row lg:max-w-5xl">
              <div
                className="sm:mb-6 md:mb-0 min-w-[200px] flex justify-center items-start mt-0 sm: mt-10">
                <img src={coverUri} alt="book cover"
                     className="max-w-[75%] sm:max-w-full rounded-lg sm:h-72"
                     loading="lazy"/>
              </div>
              <div className="m-4">
                <div
                  className="relative p-3 flex flex-col-reverse rounded-lg from-black/75 via-black/0 sm:bg-none">
                  <h1
                    className="mt-1 text-lg font-semibold md:text-2xl">
                    {title}
                  </h1>
                  {/*<p className="text-sm leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400">Entire*/}
                  {/*  house</p>*/}
                </div>
                <dl
                  className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
                  <dt className="sr-only">Reviews</dt>
                  <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
                    <svg width="24" height="24" fill="none" aria-hidden="true"
                         className="mr-1 stroke-current dark:stroke-indigo-500">
                      <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z" strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>
                    <span>{rating.toFixed(2)}</span>
                  </dd>
                  <dt className="sr-only">Location</dt>
                  <dd className="flex items-center">
                    <svg width="2" height="2" aria-hidden="true" fill="currentColor" className="mx-3 text-slate-300">
                      <circle cx="1" cy="1" r="1"/>
                    </svg>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round" className="mr-1 text-slate-400 dark:text-slate-500" aria-hidden="true">
                      <path
                        d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z"/>
                      <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                    </svg>
                    {publisher}
                  </dd>
                </dl>
                <dl
                  className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
                  <dt className="sr-only">Price</dt>
                  <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
                    <MonetizationOnIcon className="w-[24px] h-[24px] mr-1"/>
                    <span>{PhysicalPrice}</span>
                  </dd>
                  <dt className="sr-only">numberOfPages</dt>
                  <dd className="flex items-center">
                    <AutoStoriesIcon className="mx-3 text-slate-400"/>
                    {numberOfPages} صفحه
                  </dd>
                </dl>
                <p
                  className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
                  {description}
                </p>
              </div>
            </div>
          </main>
        </DialogContent>
        <DialogActions className="justify-center">
          <Button
            variant="contained"
            className="rounded-6 min-w-96"
            onClick={handleClose}
          >
            <CloseIcon/>
          </Button>
          <Button color="secondary">
            <a
              href={`https://taaghche.com/book/${id}`}
              target="_blank"
              rel="noreferrer noopener"
              className="mx-5 text-lg font-semibold"
            >
              جزییات بیشتر
            </a>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookDetail;