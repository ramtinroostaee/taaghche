import { Formik, Form } from "formik";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import TextField from "./Components/MyTextField";
import MuiDatePicker from "./Components/MuiDatePicker";
import Autocomplete from "./Components/TheAutocomplete";
import Select from "./Components/MySelect";
import Upload from "./Components/MyUpload";
import Checkbox from "./Components/MyCheckbox";
import RadioGroup from "./Components/MyRadioGroup";
import * as yup from "yup";
import { Button, Grid } from "@mui/material";

export const Components = {
  MuiDatePicker,
  TextField,
  Autocomplete,
  Select,
  Upload,
  Checkbox,
  RadioGroup,
};

export const mapCreateElement = ({ type, grid = {}, ...element }) => {
  const TheComponent = Components[type];
  return (
    <Grid item {...grid} key={element.name}>
      <TheComponent {...element} />
    </Grid>
  );
};

export const createValidationInit = (inputData, ref) => {
  const initialValuess = {};
  const validationSchemas = {};
  const v = {};
  inputData.map((e) => {
    if (ref?.current?.values)
      v[e.name] = ref?.current?.values[e.name] ?? e.init ?? "";

    initialValuess[e.name] = e.init ?? "";
    validationSchemas[e.name] = e.validation;
  });
  if (ref?.current?.resetForm) ref?.current?.resetForm({ values: v });

  return { initialValuess, validationSchemas: yup.object(validationSchemas) };
};

const FormCreate = forwardRef(
  ({ inputData, onRefChange, onSubmit, grid = {} }, ref) => {
    const [oonSubmit, setOonSubmit] = useState();
    const [initialValues, setInitialValues] = useState();
    const [validationSchema, setValidationSchema] = useState();
    const [data, setData] = useState(inputData);

    useEffect(() => {
      if (inputData) {
        const { initialValuess, validationSchemas } = createValidationInit(
          inputData,
          ref
        );

        setInitialValues(initialValuess);
        setValidationSchema(validationSchemas);
        setData(
          inputData.map((e) => {
            const { validation, init, ...rest } = e;
            return rest;
          })
        );
      } else setInitialValues();
    }, [inputData]);

    useEffect(() => setOonSubmit(() => onSubmit), [onSubmit]);

    const RefChange = useCallback((node) => {
      if (typeof onRefChange === "function") {
        onRefChange(node);
      }

      if (node !== null) {
        ref.current = node;
      }
    }, []);

    const form = useMemo(() => {
      return (
        initialValues && (
          <Formik
            innerRef={RefChange}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              oonSubmit(values);
            }}
          >
            <Form className="w-full">
              <Grid container {...grid}>
                {data.map(mapCreateElement)}
              </Grid>

              <Button
                className="hidden"
                type="submit"
                id="hidden_submit_button_for_enter_events"
              >
                hidden submit button for enter events
              </Button>
            </Form>
          </Formik>
        )
      );
    }, [validationSchema, initialValues, data, oonSubmit]);

    useEffect(() => {
      if (form === undefined && ref?.current?.resetForm) {
        ref?.current?.resetForm({ values: {} });
      }
    }, [form]);

    return <>{form}</>;
  }
);

export default FormCreate;

export const typeOnlyNumber = (event) => {
  if (event.code === "KeyC" || event.code === "KeyV" || event.code === "KeyA") {
    if (!event.ctrlKey) {
      event.preventDefault();
    }
  } else if (
    !(
      event.key === "Backspace" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowLeft" ||
      event.key === "Enter" ||
      event.key === "Tab" ||
      /\d/.test(event.key)
    )
  ) {
    event.preventDefault();
  }
};
