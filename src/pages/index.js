import {TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {apiCallTry} from "reusable/axios";

export default function Home() {
  const [books, setBooks] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getBooks = async () => {
      const response = await apiCallTry(() => axios.get("/v2/everything?filters=%7B%22list%22:%5B%7B%22type%22:3,%22value%22:164%7D,%7B%22type%22:21,%22value%22:0%7D,%7B%22type%22:50,%22value%22:0%7D%5D%7D&offset=0-0-16-16&order=1"));
      if (response) setBooks(response.data);
    }

    getBooks();
  }, []);

  return (
    <div className="flex flex-col items-center p-2">

      <JalaliDatePicker/>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
    </div>
  );
}

function JalaliDatePicker() {
  const [value, setValue] = useState(new Date());

  return (
    <DatePicker
      mask="____/__/__"
      value={value}
      onChange={(newValue) => setValue(newValue)}
      renderInput={(params) => <TextField {...params} />}
    />
  );
}
