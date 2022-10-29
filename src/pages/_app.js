import ReduxProvider from "reusable/AppWrappers/ReduxProvider";
import Theme from "reusable/AppWrappers/Theme";
import Loader from "reusable/Loader";
import "reusable/Form/Validations";
import "reusable/axios";
import "../styles/globals.css";

const MyApp = ({Component, pageProps}) => {

  return (
    <ReduxProvider>
      <Loader/>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </ReduxProvider>
  );
}

export default MyApp;
