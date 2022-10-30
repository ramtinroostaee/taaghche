import ReduxProvider from "reusable/AppWrappers/ReduxProvider";
import Theme from "reusable/AppWrappers/Theme";
import Loader from "reusable/Loader";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reusable/Form/Validations";
import "reusable/axios";
import "../styles/globals.css";

const MyApp = ({Component, pageProps}) => {

  return (
    <ReduxProvider>
      <Loader/>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        limit={2}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </ReduxProvider>
  );
}

export default MyApp;
