import axios from "axios";
import {toast} from "react-toastify";

/**
 * Axios HTTP Request defaults
 */

axios.defaults.baseURL = "https://get.taaghche.com";

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.common["Accept"] = "application/json";

export const apiCallTry = async (fu) => {
  try {
    return await fu();
  } catch (error) {
    if (error.response) {
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }
};
