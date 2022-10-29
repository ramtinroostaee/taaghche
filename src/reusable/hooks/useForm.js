import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { Form, Formik } from "formik";
import { Button } from "@material-ui/core";
import { createValidationInit } from "../Form/FormCreate";

const useForm = ({ inputData, onRefChange, onSubmit, ref = useRef() }) => {
  const [initialValues, setInitialValues] = useState();
  const [validationSchema, setValidationSchema] = useState();
  const [data, setData] = useState([]);

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

  const RefChange = useCallback((node) => {
    if (typeof onRefChange === "function") {
      onRefChange(node);
    }

    if (node !== null) {
      ref.current = node;
    }
  }, []);

  const FormWrap = useMemo(
    () =>
      ({ children, className }) =>
        (
          <Formik
            innerRef={RefChange}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              onSubmit(values);
            }}
          >
            <Form className={className}>
              {children}

              <Button className="hidden" type="submit" id="hiddenSubmit">
                hidden submit button for enter events
              </Button>
            </Form>
          </Formik>
        ),
    [validationSchema, initialValues, onSubmit, RefChange]
  );

  useEffect(() => {
    if (!initialValues && ref?.current?.resetForm) {
      ref?.current?.resetForm({ values: {} });
    }
  }, [initialValues]);

  return {
    FormWrap,
    ref,
    data,
  };
};

export default useForm;
