import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function LoginForm(props) {
  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Required"),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Password must be minimum eight characters, at least one letter and one number"
        ),
    }),
    onSubmit: (values) => {
      props.onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email && (
          <p className="input-error-validation"> {formik.errors.email} </p>
        )}
      </div>

      <div className="mb-3">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password && (
          <p className="input-error-validation"> {formik.errors.password} </p>
        )}
      </div>

      <button type="submit" className="submit-button"> Đăng nhập </button>
    </form>
  );
}

export default LoginForm;
