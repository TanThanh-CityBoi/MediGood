import React, { useEffect, useState } from "react";
import subVn from "sub-vn";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Grid } from "@mui/material";
import { IoIosAdd } from "react-icons/io";
import { firebaseStorageServices } from "../../../../../../services";
import { userActions } from "../../../../../../actions/user.actions";
import SuneditorComponent from "../../../../../component/suneditor-component/SunEditorComponent";
import { useSelector } from "react-redux";
function SingleUserForm({ user, onSubmit }) {
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();

  console.log({ province, district, ward });
  // {
  //   email: {
  //     type: String,
  //     required: true,
  //   },
  //   password: {
  //     type: String,
  //     required: true,
  //   },
  //   name: String,
  //   phone: String,
  //   role: String,
  //   emailVerified: Boolean,
  //   address: [
  //     {
  //       district: String, // Quận
  //       province: String, // Tỉnh/TP
  //       ward: String, // Phường
  //       description: String, // Địa chỉ cụ thể
  //     },
  //   ],
  //   avatar: String,
  //   birthday: Date,
  //   cart: [
  //     {
  //       count: Number,
  //       productId: { type: Schema.Types.ObjectId, ref: "product" },
  //     },
  //   ],
  //   receipts: [{ type: Schema.Types.ObjectId, ref: "receipt" }], // lấy lịch sử mua hàng
  // }

  const renderOptionList = (options) => {
    return options.map((option, idx) => (
      <option key={idx} value={JSON.stringify(option)}>
        {option.name}
      </option>
    ));
  };

  console.log("user nè", user);
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    gender: 1,
    role: "user",
    description: "",
    avatar: "",
    ...user,
  };

  useEffect(() => console.log("with no values"));
  useEffect(() => console.log("with blank values", []));
  const validationSchema = Yup.object({
    email: Yup.string().required("Đây là trường bắt buộc"),
    password: Yup.string().required("Đây là trường bắt buộc"),
    name: Yup.string().required("Đây là trường bắt buộc"),
    phone: Yup.string().required("Đây là trường bắt buộc"),
    role: Yup.string().required("Đây là trường bắt buộc"),
  });

  const initialValuesDescription =
    useSelector((state) => state.userReducer.user?.description) || "";

  const handleChangeAvt = (e, setFieldValue, preUrl) => {
    if (e.target.files[0]) {
      if (e.target.files[0]["type"].split("/")[0] === "image") {
        firebaseStorageServices.uploadFileToFirebase(
          e.target.files[0],
          "user",
          null,
          (err) => console.log(err),
          (url) => {
            setFieldValue("avatar", url);
            firebaseStorageServices.deleteFileOnFirebase(preUrl);
          }
        );
        console.log(e.target.files);
        setFieldValue("avatar", URL.createObjectURL(e.target.files[0]));
      } else alert("Vui lòng tải ảnh lên để cập nhật ảnh đại diện");
    }
  };

  return (
    <div className="single-lesson-form-wrapper">
      <Formik
        enableReinitialize={true}
        initialValues={{ ...initialValues }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const address = [
            {
              district,
              province,
              ward,
              description: values.description,
              name: values.name,
              phone: values.phone,
            },
          ];
          values.address = address;
          delete values.description;

          console.log(values, "submit");
          onSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => {
          console.log({ values });
          return (
            <Form style={{ paddingBottom: "36px" }}>
              <div className="common-infomation-wrapper">
                <Grid container spacing={4}>
                  <Grid className="single-lesson-form" item xs={12} md={5}>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <div className="input-field">
                          <label htmlFor="name">Tên người dùng</label>
                          <Field name="name" type="text" />
                          {errors.name && touched.name && (
                            <div>{errors.name}</div>
                          )}
                        </div>
                      </Grid>

                      <Grid item xs={4}>
                        <div className="input-field">
                          <label htmlFor="gender">Giới tính</label>
                          <Field
                            style={{ maxWidth: "88px" }}
                            as="select"
                            name="gender"
                          >
                            <option value={1}>Nam</option>
                            <option value={2}>Nữ</option>
                            <option value={3}>Khác</option>
                          </Field>
                          {errors.gender && touched.gender && (
                            <div>{errors.gender}</div>
                          )}
                        </div>
                      </Grid>
                    </Grid>

                    <div className="input-field">
                      <label htmlFor="phone">Số điện thoại</label>
                      <Field name="phone" type="phone" />
                      {errors.phone && touched.phone && (
                        <div>{errors.phone}</div>
                      )}
                    </div>

                    <div className="input-field">
                      <label htmlFor="email">Email</label>
                      <Field name="email" type="email" />
                      {errors.email && touched.email && (
                        <div>{errors.email}</div>
                      )}
                    </div>
                    {!user && (
                      <div className="">
                        <div className="input-field">
                          <label htmlFor="password">Mật khẩu</label>
                          <Field name="password" type="password" />
                          {errors.password && touched.password && (
                            <div>{errors.password}</div>
                          )}
                        </div>

                        <div className="input-field">
                          <label htmlFor="password">Xác nhận mật khẩu</label>
                          <Field name="confirmPassword" type="password" />
                          {errors.confirmPassword &&
                            touched.confirmPassword && (
                              <div>{errors.confirmPassword}</div>
                            )}
                        </div>
                      </div>
                    )}
                    <div className="input-field">
                      <label htmlFor="role">Vai trò</label>
                      <Field as="select" name="role">
                        <option value={"user"}>Người dùng</option>
                        <option value={"admin"}>Quản trị viên</option>
                      </Field>
                      {errors.role && touched.role && <div>{errors.role}</div>}
                    </div>

                    <div className="input-field">
                      <label htmlFor="description">Đường, số nhà</label>
                      <Field name="description" type="text" />
                    </div>
                  </Grid>

                  <Grid className="lesson-video-views" item xs={12} md={6}>
                    <div className="input-field">
                      <label htmlFor="avatar ">Ảnh thumbnail</label>
                      <div style={{ width: "5px", height: "8px" }}></div>
                      <label htmlFor="avatar">
                        <span
                          style={{ display: "inline-block" }}
                          className="lw-btn"
                        >
                          Tải ảnh lên
                        </span>
                      </label>
                      <div style={{ width: "5px", height: "8px" }}></div>
                      <input
                        id="avatar"
                        style={{ display: "none" }}
                        type="file"
                        onChange={(e) =>
                          handleChangeAvt(e, setFieldValue, values.avatar)
                        }
                      />
                      <img
                        src={values.avatar || "ser"}
                        alt=""
                        height={"250px"}
                        width={"250px"}
                      />
                      {errors.avatar && touched.avatar && (
                        <div>{errors.avatar}</div>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </div>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <div className="input-field">
                    <label htmlFor="province">Tỉnh/ Thành phố</label>
                    <select
                      value={JSON.stringify(province)}
                      onChange={(e) => {
                        if (e.target.value)
                          setProvince(JSON.parse(e.target.value));
                      }}
                      as="select"
                      name="province"
                    >
                      <option value={undefined}>
                        ---Chọn Tỉnh/Thành phố---
                      </option>
                      {renderOptionList(subVn.getProvinces())}
                    </select>
                  </div>
                </Grid>

                <Grid item xs={4}>
                  <div className="input-field">
                    <label htmlFor="district">Quận/ Huyện</label>
                    <Field
                      value={JSON.stringify(district)}
                      onChange={(e) => {
                        if (e.target.value)
                          setDistrict(JSON.parse(e.target.value));
                      }}
                      as="select"
                      name="district"
                    >
                      <option value={undefined}>---Chọn Quận/ Huyện---</option>
                      {renderOptionList(
                        subVn.getDistrictsByProvinceCode(province?.code)
                      )}
                    </Field>
                  </div>
                </Grid>

                <Grid item xs={4}>
                  <div className="input-field">
                    <label htmlFor="ward">Phường/ Xã</label>
                    <Field
                      value={JSON.stringify(ward)}
                      onChange={(e) => {
                        if (e.target.value) setWard(JSON.parse(e.target.value));
                      }}
                      as="select"
                      name="ward"
                    >
                      <option value={undefined}>---Chọn Phường/ Xã---</option>
                      {renderOptionList(
                        subVn.getWardsByDistrictCode(district?.code)
                      )}
                    </Field>
                  </div>
                </Grid>
              </Grid>

              <button
                className="lw-btn"
                type="submit"
                style={{ display: "inline-block" }}
              >
                Lưu
              </button>
              <button
                className="lw-btn"
                style={{
                  display: "inline-block",
                  marginLeft: "12px",
                  backgroundColor: "#a00",
                }}
                type="button"
              >
                Hủy
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default SingleUserForm;
