import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
function SignUpForm(props) {
  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
    initialValues: {
      password: "",
      repassword: "",
      name: "",
      email: "",
      phone: "",
      birthday: "",
      gender: "nam"
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập họ và tên"),
      password: Yup.string()
        .required("Vui lòng nhập mật khẩu")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Mật khẩu tối thiểu 8 kí tự, bao gồm chữ cái và chữ số"
        ),
      email: Yup.string().email().required("Vui lòng nhập email"),
      repassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp"),
      phone: Yup.string().matches(
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Vui lòng nhập đúng số điện thoại"
      ),
      birthday: Yup.date()
        .max(new Date(), "Future date not allowed")
    }),
    onSubmit: (values) => {
      console.log(values)
      props.onSubmit(values);
    },
  });
  return (
    <div className="sign-up_form">
      <form onSubmit={formik.handleSubmit}>

        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="input-error-validation"> {formik.errors.email} </p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="name">Họ và tên</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="input-error-validation"> {formik.errors.name} </p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="phone"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="input-error-validation"> {formik.errors.phone} </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="birthday">Ngày sinh</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formik.values.birthday}
            onChange={formik.handleChange}
          />
          {formik.errors.birthday && formik.touched.birthday && (
            <p className="input-error-validation"> {formik.errors.birthday} </p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="input-error-validation"> {formik.errors.password} </p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="repassword">Nhập lại mật khẩu</label>
          <input
            type="password"
            id="repassword"
            name="repassword"
            value={formik.values.repassword}
            onChange={formik.handleChange}
          />
          {formik.errors.repassword && formik.touched.repassword && (
            <p className="input-error-validation"> {formik.errors.repassword} </p>
          )}
        </div>

        <button type="submit"> Đăng ký </button>
      </form>
    </div>
  );
}

export default SignUpForm;
