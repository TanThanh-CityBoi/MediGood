import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Grid } from "@mui/material";
import { IoIosAdd } from "react-icons/io";
import { firebaseStorageServices } from "../../../../../../services";
import { productActions } from "../../../../../../actions/product.actions";
function SingleLessonForm({ product, onSubmit }) {
  console.log("product nè", product);
  const initialValues = {
    sku: "",
    name: "",
    avtURL: undefined,
    imgURLs: [],
    quantity: 0,
    importPrice: 0, // Giá nhập
    originPrice: 0, // Giá bán gốc
    price: 0, // Giá bán đã sale
    temperature: { minimum: 0, maximum: 100 }, // Nhiệt độ sử dụng
    color: "red",
    foods: [],
    origin: "", // Xuất xứ
    producer: "", //Nhà sản xuất
    concentrationPercent: 0, //  nồng độ cồn ( tính theo %)
    capacity: 0, // Dung tích (ml)
    vintage: "", // Năm sản xuất
    aboutProduct: "", // Một đoạn ngắn mô tả thông tin sản phẩm
    sugar: 0, // Hàm lượng đường
    experation: undefined, //Date.now(), //Date
    productType: "wine", // wine/combo/accessory
    isSpecialProduct: false,
    isNewProduct: false,
    ...product,
  };
  console.log("initial value nè", initialValues);

  const foodList = [
    "Phô mai",
    "Bánh ngọt",
    "Thịt bò",
    "Thịt gà",
    "Thịt lợn",
    "Thịt vịt",
    "Rau củ quả",
    "Hải sản",
    "Thịt thỏ",
    "Thịt cừu",
  ];

  const validationSchema = Yup.object({
    sku: Yup.string().required("Đây là trường bắt buộc"),
    name: Yup.string().required("Đây là trường bắt buộc"),
    // avtURL: Yup.string().required("Đây là trường bắt buộc"),
    quantity: Yup.number().min(0).required("Đây là trường bắt buộc"),
    importPrice: Yup.number().min(0).required("Đây là trường bắt buộc"),
    originPrice: Yup.number().min(0).required("Đây là trường bắt buộc"),
    price: Yup.number().min(0).required("Đây là trường bắt buộc"),
    // aboutProduct: Yup.string().required("Đây là trường bắt buộc"),
  });

  const handleChangeAvt = (e, setFieldValue, preUrl) => {
    if (e.target.files[0]) {
      if (e.target.files[0]["type"].split("/")[0] === "image") {
        firebaseStorageServices.uploadFileToFirebase(
          e.target.files[0],
          "product",
          null,
          (err) => console.log(err),
          (url) => {
            setFieldValue("avtURL", url);
            firebaseStorageServices.deleteFileOnFirebase(preUrl);
          }
        );
        console.log(e.target.files);
        setFieldValue("avtURL", URL.createObjectURL(e.target.files[0]));
      } else alert("Vui lòng tải ảnh lên để cập nhật ảnh đại diện");
    }
  };

  const handleAddImage = (e, imgURLs, setFieldValue) => {
    if (e.target.files[0]) {
      if (e.target.files[0]["type"].split("/")[0] === "image") {
        firebaseStorageServices.uploadFileToFirebase(
          e.target.files[0],
          "product-image",
          null,
          (err) => console.log(err),
          (url) => {
            const tempURLs = [...imgURLs, url];
            setFieldValue("imgURLs", tempURLs);
          }
        );
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
                <h1
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    textAlign: "center",
                    marginBottom: "24px",
                  }}
                >
                  Thông tin cơ bản
                </h1>
                <Grid container spacing={4}>
                  <Grid className="single-lesson-form" item xs={12} md={5}>
                    <div className="input-field">
                      <label htmlFor="sku">Mã sản phẩm (SKU)</label>
                      <Field name="sku" type="text" />
                      {errors.sku && touched.sku && <div>{errors.sku}</div>}
                    </div>

                    <div className="input-field">
                      <label htmlFor="name">Tên sản phẩm</label>
                      <Field name="name" type="text" />
                      {errors.name && touched.name && <div>{errors.name}</div>}
                    </div>

                    <div className="input-field">
                      <label htmlFor="aboutProduct ">Mô tả</label>
                      <textarea
                        value={values.aboutProduct}
                        onChange={handleChange}
                        name="aboutProduct"
                        id="aboutProduct"
                      />
                      {errors.aboutProduct && touched.aboutProduct && (
                        <div>{errors.aboutProduct}</div>
                      )}
                    </div>

                    <div className="input-field">
                      <label htmlFor="quantity">Số lượng</label>
                      <Field name="quantity" type="number" />
                      {errors.quantity && touched.quantity && (
                        <div>{errors.quantity}</div>
                      )}
                    </div>

                    <div className="input-field">
                      <label htmlFor="importPrice">Giá nhập vào</label>
                      <Field name="importPrice" type="number" />
                      {errors.importPrice && touched.importPrice && (
                        <div>{errors.importPrice}</div>
                      )}
                    </div>

                    <div className="input-field">
                      <label htmlFor="originPrice">
                        Giá bán trước khuyến mãi
                      </label>
                      <Field name="originPrice" type="number" />
                      {errors.originPrice && touched.originPrice && (
                        <div>{errors.originPrice}</div>
                      )}
                    </div>

                    <div className="input-field">
                      <label htmlFor="price">Giá bán sau khuyến mãi</label>
                      <Field name="price" type="number" />
                      {errors.price && touched.price && (
                        <div>{errors.price}</div>
                      )}
                    </div>

                    <div className="input-field">
                      <label htmlFor="productType"></label>
                      <label
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          marginRight: "12px",
                        }}
                      >
                        <Field type="radio" name="productType" value="wine" />
                        Rượu
                      </label>

                      <label
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          marginRight: "12px",
                        }}
                      >
                        <Field type="radio" name="productType" value="combo" />
                        Combo
                      </label>

                      <label
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          marginRight: "12px",
                        }}
                      >
                        <Field
                          type="radio"
                          name="productType"
                          value="accessary"
                        />
                        Phụ kiện
                      </label>

                      <label
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          marginRight: "12px",
                        }}
                      >
                        <Field type="radio" name="productType" value="gift" />
                        Hộp quà
                      </label>
                    </div>
                  </Grid>

                  <Grid className="lesson-video-views" item xs={12} md={6}>
                    <div className="input-field">
                      <label htmlFor="avtURL ">Ảnh đại diện</label>
                      <div style={{ width: "5px", height: "8px" }}></div>
                      <label htmlFor="avtURL">
                        <span
                          style={{ display: "inline-block" }}
                          className="lw-btn"
                        >
                          Tải ảnh lên
                        </span>
                      </label>
                      <div style={{ width: "5px", height: "8px" }}></div>
                      <input
                        id="avtURL"
                        style={{ display: "none" }}
                        type="file"
                        onChange={(e) =>
                          handleChangeAvt(e, setFieldValue, values.avtURL)
                        }
                      />
                      <img
                        src={values.avtURL || "ser"}
                        alt=""
                        height={"250px"}
                        width={"250px"}
                      />
                      {errors.avtURL && touched.avtURL && (
                        <div>{errors.avtURL}</div>
                      )}
                    </div>

                    <div className="input-field">
                      <div className="mistery-box">
                        <label htmlFor="imgURLs ">Album</label>
                      </div>

                      <div className="mistery-box">
                        <input
                          id="imgURLs"
                          style={{ display: "none" }}
                          type="file"
                          onChange={(e) =>
                            handleAddImage(e, values.imgURLs, setFieldValue)
                          }
                        />
                        {values.imgURLs.map((imgURL, index) => {
                          return (
                            <img
                              key={`img-link-${index}`}
                              style={{
                                objectFit: "cover",
                                marginRight: "12px",
                                display: "inline-block",
                              }}
                              src={imgURL}
                              alt=""
                              width={"100px"}
                              height={"100px"}
                            />
                          );
                        })}
                      </div>
                      <label htmlFor="imgURLs">
                        <div
                          style={{
                            color: "#C3C1C1",
                            border: "1px solid #C3C1C1",
                            width: "100px",
                            height: "100px",
                            display: "inline-flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          className="add-img-btn clickable-effect"
                        >
                          <IoIosAdd size={24} />
                          <span>Thêm ảnh</span>
                        </div>
                      </label>

                      {errors.imgURLs && touched.imgURLs && (
                        <div>{errors.imgURLs}</div>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </div>
              {values.productType == "wine" && (
                <div className="additional-infomation">
                  <h1
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      textAlign: "center",
                      marginBottom: "24px",
                      marginTop: "36px",
                    }}
                  >
                    Thông tin bổ sung
                  </h1>
                  <div className="input-field">
                    <label
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        marginRight: "12px",
                        fontWeight: "400",
                      }}
                    >
                      <Field
                        type="checkbox"
                        name="isNewProduct"
                        onChange={handleChange}
                      />
                      Là sản phẩm mới
                    </label>
                    <div className="mystery-box"></div>
                    <label
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        marginRight: "12px",
                        fontWeight: "400",
                      }}
                    >
                      <Field
                        type="checkbox"
                        name="isSpecialProduct"
                        onChange={handleChange}
                      />
                      Là sản phẩm đặc biệt
                    </label>
                  </div>

                  <div className="input-field">
                    <label htmlFor="foods ">Món ăn phù hợp</label>
                    <div className="mystery-box">
                      {foodList.map((item, index) => {
                        return (
                          <span
                            key={`food-item-${index}`}
                            style={{
                              display: "inline-block",
                              padding: "8px 12px",
                            }}
                            className={
                              values.foods.includes(item)
                                ? "food-toogle clickable-effect actived"
                                : "food-toogle clickable-effect"
                            }
                            onClick={() => {
                              let tempValue = [];
                              if (values.foods.includes(item)) {
                                tempValue = values.foods.filter(
                                  (e) => e != item
                                );
                              } else {
                                tempValue = [...values.foods, item];
                              }
                              setFieldValue("foods", tempValue);
                            }}
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="input-field">
                    <label htmlFor="color">Màu của rượu</label>
                    <Field as="select" name="color">
                      <option value="red">Vang đỏ</option>
                      <option value="white">Vang trắng</option>
                      <option value="pink">Vang hồng</option>
                    </Field>
                    {errors.color && touched.color && <div>{errors.color}</div>}
                  </div>

                  <div className="input-field">
                    <label htmlFor="temperature">Nhiệt độ sử dụng</label>
                    <div className="input-temporator">
                      <span style={{ fontSize: "1.4rem", fontWeight: "500" }}>
                        Từ{" "}
                      </span>
                      <Field
                        style={{ width: "200px", display: "inline" }}
                        name="temperature.minimum"
                      ></Field>{" "}
                      <span style={{ fontSize: "1.4rem", fontWeight: "500" }}>
                        °C{" "}
                      </span>
                      <div
                        style={{
                          display: "inline-block",
                          height: "10px",
                          width: "30px",
                        }}
                      ></div>
                      <span style={{ fontSize: "1.4rem", fontWeight: "500" }}>
                        {" "}
                        Đến{" "}
                      </span>
                      <Field
                        style={{ width: "200px", display: "inline" }}
                        name="temperature.maximum"
                      ></Field>
                      <span style={{ fontSize: "1.4rem", fontWeight: "500" }}>
                        °C
                      </span>
                    </div>
                  </div>

                  <Grid container spacing={4}>
                    <Grid item xs={6} md={4}>
                      <div className="input-field">
                        <label htmlFor="origin">Xuất sứ</label>
                        <Field name="origin" type="text" />
                        {errors.origin && touched.origin && (
                          <div>{errors.origin}</div>
                        )}
                      </div>
                    </Grid>

                    <Grid item xs={6} md={4}>
                      <div className="input-field">
                        <label htmlFor="producer">Nhà sản xuất</label>
                        <Field name="producer" type="text" />
                        {errors.producer && touched.producer && (
                          <div>{errors.producer}</div>
                        )}
                      </div>
                    </Grid>
                  </Grid>

                  <Grid container spacing={4}>
                    <Grid item xs={6} md={4}>
                      <div className="input-field">
                        <label htmlFor="concentrationPercent">
                          Nồng độ cồn (%)
                        </label>
                        <Field
                          name="concentrationPercent"
                          type="number"
                          max="100"
                          min="0"
                        />
                        {errors.concentrationPercent &&
                          touched.concentrationPercent && (
                            <div>{errors.concentrationPercent}</div>
                          )}
                      </div>
                    </Grid>

                    <Grid item xs={6} md={4}>
                      <div className="input-field">
                        <label htmlFor="capacity">Dung tích (ml)</label>
                        <Field name="capacity" type="number" min="0" />
                        {errors.capacity && touched.capacity && (
                          <div>{errors.capacity}</div>
                        )}
                      </div>
                    </Grid>

                    <Grid item xs={6} md={4}>
                      <div className="input-field">
                        <label htmlFor="sugar">Hàm lượng đường (%)</label>
                        <Field name="sugar" type="number" max="100" min="0" />
                        {errors.sugar && touched.sugar && (
                          <div>{errors.sugar}</div>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                  <div className="input-field">
                    <label htmlFor="vintage">Năm sản xuất</label>
                    <Field name="vintage" type="number" min="0" />
                    {errors.vintage && touched.vintage && (
                      <div>{errors.vintage}</div>
                    )}
                  </div>

                  <div className="input-field">
                    <label htmlFor="sugar">Hạn sử dụng</label>
                    <input
                      type="date"
                      id="experation"
                      name="experation"
                      value={values.experation}
                      onChange={handleChange}
                    ></input>
                    {errors.experation && (
                      <p className="input-error-validation">
                        {" "}
                        {errors.experation}{" "}
                      </p>
                    )}
                    {errors.sugar && touched.sugar && <div>{errors.sugar}</div>}
                  </div>
                </div>
              )}
              <button className="lw-btn" style={{ display: "inline-block" }}>
                Lưu
              </button>
              <button
                style={{
                  display: "inline-block",
                  marginLeft: "12px",
                  backgroundColor: "#a00",
                }}
                type="button"
                className="lw-btn"
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

export default SingleLessonForm;
