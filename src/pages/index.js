import {TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {useState} from "react";
export default function Home() {

  return (
    <div className="flex flex-col items-center p-2">
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
