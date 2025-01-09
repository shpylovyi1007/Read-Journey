import { Field, Form, Formik } from "formik";

const initialValues = {
  title: "",
  author: "",
};

const handleSubmit = (action, values) => {
  console.log(values);
  action.resetForm();
};

export default function Filters() {
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <h2>Filters:</h2>
          <Field placeholder="Book title:" />
          <Field placeholder="The author:" />
        </Form>
      </Formik>
    </div>
  );
}
