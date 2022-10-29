import {Button, FormControl, Icon, Input} from "@mui/material";
import {Field} from "formik";
import React from "react";

const MyUpload = ({label, name, accept, onChange, ...rest}) => (
  <Field name={name}>
    {({field, form}) => {
      const {value, ...restField} = field;

      return (
        <FormControl
          variant="outlined"
          className={
            "flex flex-col justify-center " +
            rest?.formcontrol?.className ?? ""
          }
        >
          <label htmlFor={name}>
            <Input
              accept={accept ?? "image/*"}
              className="hidden"
              id={name}
              type="file"
              {...restField}
              onChange={(event) => {
                const formikHandle = () =>
                  form.setFieldValue(name, event.target.files[0]);
                onChange ? onChange(event, formikHandle) : formikHandle();
              }}
              {...rest}
            />
            <Button
              className="rounded-8 py-10 w-full"
              variant="outlined"
              component="span"
            >
              <Icon color="action">cloud_upload</Icon>
              {label ?? ""}
            </Button>
          </label>
          <div>{value?.name}</div>
        </FormControl>
      );
    }}
  </Field>
);

export default MyUpload;
