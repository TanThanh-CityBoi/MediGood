import React from "react";
import BackToPageButton from "../../../component/BackToPageButton";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Grid } from "@mui/material";
import { firebaseStorageServices } from "../../../../../../services";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bannerActions } from "../../../../../../actions";
import { useSelector } from "react-redux";

const handleChangeSlideImage = (e, setFieldValue, preUrl, index) => {
  if (e.target.files[0]) {
    if (e.target.files[0]["type"].split("/")[0] === "image") {
      firebaseStorageServices.uploadFileToFirebase(
        e.target.files[0],
        "product",
        null,
        (err) => console.log(err),
        (url) => {
          setFieldValue(`slides.${index}.imgURL`, url);
          firebaseStorageServices.deleteFileOnFirebase(preUrl);
        }
      );
      console.log(e.target.files);
      setFieldValue(
        `slides.${index}.imgURL`,
        URL.createObjectURL(e.target.files[0])
      );
    } else alert("Vui lòng tải ảnh lên để cập nhật ảnh đại diện");
  }
};

const bannerName = ["Trang chủ", "Thuốc", "Combo", "Phụ kiện", "Khuyến mãi"];
function EditBanner(props) {
  const navigate = useNavigate();

  const onSubmit = (values) => {
    dispatch(
      bannerActions.update(values, () => {
        navigate("/quan-ly/banner");
      })
    );
  };

  const initialValues = {
    slides: [
      {
        title: "",
        description: "",
        path: "",
        imgURL: "",
      },
    ],
  };
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(bannerActions.getOne(id));
  }, []);
  const banner = useSelector((state) => state.bannerReducer.banner) || {};
  console.log({ banner });
  return (
    <div className="edit-banner-wrapper">
      <BackToPageButton content={"Danh sách banner"} />
      <h1
        style={{
          textTransform: "uppercase",
          fontSize: "24px",
          marginTop: "24px",
        }}
      >
        BANNER {bannerName[banner.type]}
      </h1>
      <Formik
        initialValues={{ ...initialValues, ...banner }}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <FieldArray name="slides">
              {({ insert, remove, push }) => (
                <div>
                  {values.slides.length > 0 &&
                    values.slides.map((slide, index) => (
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <div
                            style={{
                              alignItems: "center",
                            }}
                            className="display-flex"
                          >
                            <h1
                              style={{
                                display: "inline-block",
                                fontSize: "18px",
                                fontWeight: "600",
                                marginTop: "20px",
                                marginBottom: "18px",
                                marginRight: "24px",
                              }}
                              className=""
                            >
                              Slide {index + 1}
                            </h1>
                            <span
                              onClick={() => remove(index)}
                              className="icon-button"
                            >
                              <AiOutlineDelete size={18} />
                            </span>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <div className="input-field">
                            <label htmlFor={`slides.${index}.title`}>
                              Tiêu đề của slide
                            </label>
                            <Field
                              name={`slides.${index}.title`}
                              placeholder="Nhập tiêu đề (nếu có)"
                              type="text"
                            />
                            <ErrorMessage
                              name={`slides.${index}.title`}
                              component="div"
                              className="field-error"
                            />
                          </div>

                          <div className="input-field">
                            <label htmlFor={`slides.${index}.path`}>
                              Đường dẫn khi click vào button
                            </label>
                            <Field
                              name={`slides.${index}.path`}
                              placeholder="/trang-chu nếu muốn chuyển hướng đến trang chủ"
                              type="text"
                            />
                            <ErrorMessage
                              name={`slides.${index}.path`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} md={7}>
                          <div className="input-field">
                            <label htmlFor={`slides.${index}.description`}>
                              Mô tả cho slide
                            </label>
                            <Field
                              as="textarea"
                              name={`slides.${index}.description`}
                              placeholder="Mô tả, hiện phía trên slide"
                              type="text"
                            />
                            <ErrorMessage
                              name={`slides.${index}.description`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12}>
                          <div className="input-field">
                            <label htmlFor={`slides.${index}.imgURL`}>
                              Ảnh đại diện
                            </label>
                            <div style={{ width: "5px", height: "8px" }}></div>
                            <label htmlFor={`slides.${index}.imgURL`}>
                              <span
                                style={{ display: "inline-block" }}
                                className="lw-btn"
                              >
                                Tải ảnh lên
                              </span>
                            </label>
                            <div style={{ width: "5px", height: "8px" }}></div>
                            <input
                              id={`slides.${index}.imgURL`}
                              style={{ display: "none" }}
                              type="file"
                              onChange={(e) =>
                                handleChangeSlideImage(
                                  e,
                                  setFieldValue,
                                  slide.imgURL,
                                  index
                                )
                              }
                            />
                            <img
                              src={slide.imgURL || "ser"}
                              alt=""
                              width={"100%"}
                            />
                            {/* {errors.slides[index].imgURL &&
                              touched.slides[index].imgURL && (
                                <div>{errors.slides[index].imgURL.avtURL}</div>
                              )} */}
                          </div>
                        </Grid>
                      </Grid>
                    ))}
                  <button
                    className="lw-btn"
                    style={{
                      backgroundColor: "#0B3459",
                      margin: "24px 0",
                    }}
                    type="button"
                    onClick={() =>
                      push({
                        title: "",
                        path: "",
                        imgURL: "",
                        description: "",
                      })
                    }
                  >
                    Thêm slide mới
                  </button>
                </div>
              )}
            </FieldArray>

            <div className="display-flex">
              <span
                style={{
                  marginRight: "24px",
                  backgroundColor: "#C00303",
                }}
                className="lw-btn"
              >
                Hủy
              </span>
              <button className="lw-btn" type="submit">
                Lưu
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditBanner;
