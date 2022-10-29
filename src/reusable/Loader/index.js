import React, {useEffect} from "react";
import {BallTriangle} from "react-loader-spinner";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {hideLoader, showLoader} from "reusable/Loader/LoaderSlice";

const Loader = () => {
  const isLoading = useSelector(({loader}) => loader?.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.interceptors.request.use(
      (req) => {
        dispatch(showLoader());
        return req;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        dispatch(hideLoader());
        console.log(response);
        return response;
      },
      (err) => {
        dispatch(hideLoader());
        return Promise.reject(err);
      }
    );
  }, []);

  return (
    <>
      <div
        className={`w-screen h-screen bg-gray-50 fixed z-1301 opacity-25 ${
          isLoading ? "visible" : "invisible"
        }`}
      />
      <BallTriangle
        wrapperClass="fixed top-1/2 right-1/2 z-1301"
        height="100"
        width="100"
        color="grey"
        ariaLabel="loading"
        visible={isLoading}
      />
    </>
  );
};

export default Loader;
