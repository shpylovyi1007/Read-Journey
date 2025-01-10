"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";
import css from "./Filters.module.css";

interface FormValues {
  title: string;
  author: string;
}

const initialValues: FormValues = {
  title: "",
  author: "",
};

const handleSubmit = (
  values: FormValues,
  actions: FormikHelpers<FormValues>
) => {
  console.log(values);
  actions.resetForm();
};

export default function Filters() {
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <h2 className={css.title}>Filters:</h2>
          <div className={css.fieldWrapper}>
            <Field
              className={css.input}
              name="title"
              placeholder="Book title:"
            />
            <Field
              className={css.input}
              name="author"
              placeholder="The author:"
            />
          </div>
          <button className={css.button} type="submit">
            To apply
          </button>
        </Form>
      </Formik>
    </div>
  );
}
