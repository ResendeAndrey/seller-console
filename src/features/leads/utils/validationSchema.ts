/*
  This file control the validation schema for leads update slideover
*/

import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  status: yup.string().required("Status is required")
});
