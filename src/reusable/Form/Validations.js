import * as Yup from "yup";
import {
  isShebaValid,
  phoneNumberValidator,
  verifyIranianNationalId,
} from "@persian-tools/persian-tools";

Yup.addMethod(Yup.string, "correctSheba", function (message) {
  return this.test("test-name", message, function (value) {
    const { path, createError } = this;
    // [value] - value of the property being tested
    // [path]  - property name,
    // ...
    // return someCondition || conditionTwo || createError(...);

    if (value) {
      return isShebaValid("IR" + value);
    }
    return createError(message);
  });
});

Yup.addMethod(Yup.number, "correctNationalId", function (message) {
  return this.test("test-name", message, function (value) {
    const { path, createError } = this;
    // [value] - value of the property being tested
    // [path]  - property name,
    // ...
    // return someCondition || conditionTwo || createError(...);

    if (value === undefined) {
      return true;
    }

    if (value) {
      return verifyIranianNationalId(value);
    }
    return createError(message);
  });
});

Yup.addMethod(Yup.number, "correctMobile", function (message) {
  return this.test("mobile", message, function (value) {
    const { path, createError } = this;
    // [value] - value of the property being tested
    // [path]  - property name,
    // ...
    // return someCondition || conditionTwo || createError(...);

    if (value === undefined) {
      return true;
    }

    if (value) {
      return phoneNumberValidator(String(value));
    }
    return createError(message);
  });
});