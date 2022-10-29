import React, { useEffect, useState, useCallback } from "react";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Field, useField } from "formik";
import { apiCallTry } from "../../axios";
import axios from "axios";

const MyAutocomplete2 = ({
  url,
  autocomplete,
  textfield,
  label,
  name,
  options,
}) => {
  const [data, setData] = useState({ data: [], links: [], meta: [] });
  const [typedtext, setTypedtext] = useState("");
  const [page, setPage] = useState(1);
  const [autocompleteValue, setAutocompleteValue] = useState("");

  const getData = useCallback(async () => {
    if (url) {
      let the = url?.base + "?";
      the += typedtext !== "" ? url?.typedtext + "=" + typedtext : "";
      the += "&page=" + page;

      const response = await apiCallTry(() => axios.get(the));

      if (response) {
        setData(response?.data);
      }
    }
  }, [url, page, typedtext]);

  useEffect(() => {
    const withDelay = setTimeout(() => {
      getData();
    }, 300);

    return () => clearTimeout(withDelay);
  }, [getData]);

  const [field] = useField({ name: name });

  useEffect(() => {
    if (!field.value && autocompleteValue) {
      setAutocompleteValue("");
      setTypedtext("");
    }
  }, [field]);

  return (
    <Field name={name}>
      {({ field, form }) => {
        const { onBlur, value } = field;
        const { getRequestValue, ...restAutocomplete } = autocomplete;
        const theOptions = options ?? data.data;

        return (
          <Autocomplete
            disableListWrap
            openOnFocus
            fullWidth
            blurOnSelect
            autoHighlight
            size="small"
            options={theOptions}
            filterOptions={(x) => x}
            onChange={(_, newValue) => {
              newValue === null && setTypedtext("");
              form.setFieldValue(name, getRequestValue(newValue) ?? "");
              setAutocompleteValue(restAutocomplete.getOptionLabel(newValue));
            }}
            onBlur={(e) =>
              e.target.value !== autocompleteValue &&
              setTypedtext(autocompleteValue)
            }
            value={theOptions.find((e) => getRequestValue(e) === value) ?? null}
            {...restAutocomplete}
            renderInput={(params) => (
              <TextField
                id={name}
                name={name}
                label={label}
                helperText={form.touched[name] && form.errors[name]}
                error={form.touched[name] && Boolean(form.errors[name])}
                variant="outlined"
                fullWidth
                onChange={(e) => setTypedtext(e.target.value)}
                onBlur={onBlur}
                {...params}
                {...textfield}
              />
            )}
          />
        );
      }}
    </Field>
  );
};
export default MyAutocomplete2;
