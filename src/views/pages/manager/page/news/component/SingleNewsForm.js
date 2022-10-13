import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Grid } from "@mui/material";
import { IoIosAdd } from "react-icons/io";
import { firebaseStorageServices } from "../../../../../../services";
import { newsActions } from "../../../../../../actions/news.actions";
import SuneditorComponent from "../../../../../component/suneditor-component/SunEditorComponent";
function SingleNewsForm({ news, onSubmit }) {
  console.log("news nè", news);
  const initialValues = {
    avtUrl: "",
    title: "",
    description: "",
    views: 0,
    content: "",
    ...news,
  };
  console.log("initial value nè", initialValues);

  const validationSchema = Yup.object({
    title: Yup.string().required("Đây là trường bắt buộc"),
    description: Yup.string().required("Đây là trường bắt buộc"),
    content: Yup.string().required("Đây là trường bắt buộc"),
    avtUrl: Yup.string().required("Vui lòng tải ảnh lên cho bài viết của bạn"),
    views: Yup.number().min(0).required("Đây là trường bắt buộc"),
  });

  const handleChangeAvt = (e, setFieldValue, preUrl) => {
    if (e.target.files[0]) {
      if (e.target.files[0]["type"].split("/")[0] === "image") {
        firebaseStorageServices.uploadFileToFirebase(
          e.target.files[0],
          "news",
          null,
          (err) => console.log(err),
          (url) => {
            setFieldValue("avtUrl", url);
            firebaseStorageServices.deleteFileOnFirebase(preUrl);
          }
        );
        console.log(e.target.files);
        setFieldValue("avtUrl", URL.createObjectURL(e.target.files[0]));
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
          console.log(values);
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
                    <div className="input-field">
                      <label htmlFor="title">Tiêu đề bài viết</label>
                      <Field name="title" type="text" />
                      {errors.title && touched.title && (
                        <div>{errors.title}</div>
                      )}
                    </div>

                    <div className="input-field">
                      <label htmlFor="description ">Mô tả</label>
                      <textarea
                        value={values.description}
                        onChange={handleChange}
                        name="description"
                        id="description"
                      />
                      {errors.description && touched.description && (
                        <div>{errors.description}</div>
                      )}
                    </div>

                    <div className="input-field">
                      <label htmlFor="views">Số lượng</label>
                      <Field name="views" type="number" />
                      {errors.views && touched.views && (
                        <div>{errors.views}</div>
                      )}
                    </div>
                  </Grid>

                  <Grid className="lesson-video-views" item xs={12} md={6}>
                    <div className="input-field">
                      <label htmlFor="avtUrl ">Ảnh thumbnail</label>
                      <div style={{ width: "5px", height: "8px" }}></div>
                      <label htmlFor="avtUrl">
                        <span
                          style={{ display: "inline-block" }}
                          className="lw-btn"
                        >
                          Tải ảnh lên
                        </span>
                      </label>
                      <div style={{ width: "5px", height: "8px" }}></div>
                      <input
                        id="avtUrl"
                        style={{ display: "none" }}
                        type="file"
                        onChange={(e) =>
                          handleChangeAvt(e, setFieldValue, values.avtUrl)
                        }
                      />
                      <img
                        src={values.avtUrl || "ser"}
                        alt=""
                        height={"250px"}
                        width={"250px"}
                      />
                      {errors.avtUrl && touched.avtUrl && (
                        <div>{errors.avtUrl}</div>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className="input-field">
                <label htmlFor="content">Nội dung</label>
                <SuneditorComponent
                  id={"content"}
                  initialContent={values.content}
                  title={""}
                  contentOnChange={(contentHtml) => {
                    setFieldValue("content", contentHtml);
                  }}
                />
              </div>

              <button className="lw-btn" style={{ display: "inline-block" }}>
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

export default SingleNewsForm;
