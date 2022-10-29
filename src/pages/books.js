import {useEffect} from "react";
import {hideLoader, showLoader} from "reusable/Loader/LoaderSlice";
import {useDispatch} from "react-redux";

const Books = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoader());
    console.log("hi")
    setTimeout(() => dispatch(hideLoader()), 3000);
  }, []);

  return (
    <div>
      Hi
    </div>
  )
};

export default Books;
