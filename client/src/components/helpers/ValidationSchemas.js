// import { useFormik } from "formik";
import * as yup from "yup";

export const questionValidationSchema = yup.object({
  questionText: yup.string().required("Please enter a valid question"),
  points: yup.number().integer().required("Please enter valid points").min(1),
  correctOption: yup.number().integer().required("Please choose valid option"),
});

export const optionValidationSchema = yup.object({
  optionText: yup.string().required("Enter option text"),
});

export const shortQuestionValidationSchema = yup.object({
  questionText: yup.string().required("Please enter a valid question"),
  points: yup.number().required("Please enter points").min(1),
  minChars: yup
    .number()
    .required("Please enter a minimum number characters")
    .min(1),
  maxChars: yup
    .number()
    .required("Please enter a maximum number characters")
    .min(1),
});
