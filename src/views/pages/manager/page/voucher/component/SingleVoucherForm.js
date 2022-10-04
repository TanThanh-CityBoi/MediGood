import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Grid } from "@mui/material";
import { IoIosAdd } from "react-icons/io";
import { firebaseStorageServices } from "../../../../../../services";
import { voucherActions } from "../../../../../../actions/voucher.actions";
import SuneditorComponent from "../../../../../component/suneditor-component/SunEditorComponent";
import { useSelector } from "react-redux";
function SingleVoucherForm({ voucher, onSubmit }) {
  // {
  //   code: String, //Mã km
  //   description: String, //Mô tả
  //   amount: Number, // Số lượng km
  //   limit: Number, // Giới hạn ( Số tiền)
  //   type: Number, // 1: money, 2: percent
  //   isPublic: Boolean, // Có hiển thị public trong lúc chọn voucher hay k
  //   receipts: [{ type: Schema.Types.ObjectId, ref: "user" }], // danh sách user đã áp mã
  //   isEnable: Boolean, // Vô hiệu hóa/kích hoạt
  //   quantity: Number, // số lượt sử dụng còn lại
  //   exp: Date, // Ngày hết hạn
  //   condition: {
  //     // Điều kiện cho đơn hàng
  //     productCount: Number, // Số sản phẩm tối thiểu trong 1 lần mua
  //     minTotalPrice: Number, // Giá tối thiểu
  //     isFirstTime: Boolean, // Là km dành cho người mới
  //   },
  // },
  console.log("voucher nè", voucher);
  const initialValues = {
    name: "",
    avtURL: "",
    code: "",
    description: "",
    amount: undefined,
    receipts: [],
    type: 1,
    isPublic: true,
    isEnable: true,
    quantity: undefined,
    exp: undefined,
    condition: {
      productCount: 1,
      minTotalPrice: 0,
      isFirseTime: false,
    },
    ...voucher,
  };
  console.log("initial value nè", initialValues);

  const validationSchema = Yup.object({
    name: Yup.string().required("Đây là trường bắt buộc"),
    description: Yup.string().required("Đây là trường bắt buộc"),
    avtURL: Yup.string().required("Vui lòng tải ảnh lên cho bài viết của bạn"),
  });

  const initialValuesDescription =
    useSelector((state) => state.voucherReducer.voucher?.description) || "";

  const handleChangeAvt = (e, setFieldValue, preUrl) => {
    if (e.target.files[0]) {
      if (e.target.files[0]["type"].split("/")[0] === "image") {
        firebaseStorageServices.uploadFileToFirebase(
          e.target.files[0],
          "voucher",
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

  return (
    <div className="single-lesson-form-wrapper">
      <Formik
        enableReinitialize={true}
        initialValues={{ ...initialValues }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
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
                    <div className="input-field">
                      <label htmlFor="name">Tên voucher</label>
                      <Field name="name" type="text" />
                      {errors.name && touched.name && <div>{errors.name}</div>}
                    </div>

                    <div className="input-field">
                      <label htmlFor="code">Mã áp dụng</label>
                      <Field name="code" type="text" />
                      {errors.code && touched.code && <div>{errors.code}</div>}
                    </div>

                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <div className="input-field">
                          <label htmlFor="amount">Mức giảm</label>
                          <Field name="amount" type="number" />
                          {errors.amount && touched.amount && (
                            <div>{errors.amount}</div>
                          )}
                        </div>
                      </Grid>

                      <Grid item xs={6}>
                        <div className="input-field">
                          <label htmlFor="type">Đơn vị</label>
                          <Field as="select" name="type">
                            <option value={1}>Tiền tệ (VNĐ)</option>
                            <option value={2}>Phần trăm (%)</option>
                          </Field>
                          {errors.type && touched.type && (
                            <div>{errors.type}</div>
                          )}
                        </div>
                      </Grid>
                    </Grid>

                    <div className="input-field">
                      <label htmlFor="limit">Giới hạn (VNĐ)</label>
                      <Field name="limit" type="number" />
                      {errors.limit && touched.limit && (
                        <div>{errors.limit}</div>
                      )}
                    </div>

                    <div className="input-field">
                      <label htmlFor="quantity">
                        Số lượng{" "}
                        {values.receipts && values.receipts?.length != 0
                          ? `còn lại (Đã sử dụng: ${values.receipts?.length})`
                          : ""}
                      </label>
                      <Field name="quantity" type="number" />
                      {errors.quantity && touched.quantity && (
                        <div>{errors.quantity}</div>
                      )}
                    </div>

                    <div className="input-field">
                      <label htmlFor="exp">Hạn sử dụng</label>
                      <input
                        type="date"
                        id="exp"
                        value={values.exp}
                        name="exp"
                        onChange={handleChange}
                      ></input>
                      {errors.experation && (
                        <p className="input-error-validation">
                          {" "}
                          {errors.experation}{" "}
                        </p>
                      )}
                      {errors.exp && touched.exp && <div>{errors.exp}</div>}
                    </div>

                    <div className="input-field">
                      <label htmlFor="condition.productCount">
                        Số sản phẩm tối thiểu
                      </label>
                      <Field name="condition.productCount" type="number" />
                      {errors.condition?.productCount &&
                        touched.condition?.productCount && (
                          <div>{errors.condition?.productCount}</div>
                        )}
                    </div>

                    <div className="input-field">
                      <label htmlFor="condition.minTotalPrice">
                        Tổng giá trị hóa đơn tối thiểu (VNĐ)
                      </label>
                      <Field name="condition.minTotalPrice" type="number" />
                      {errors.condition?.minTotalPrice &&
                        touched.condition?.minTotalPrice && (
                          <div>{errors.condition?.minTotalPrice}</div>
                        )}
                    </div>

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
                          name="isPublic"
                          onChange={handleChange}
                        />
                        Voucher hiển thị công khai
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
                          name="isEnable"
                          onChange={handleChange}
                        />
                        Được phép sử dụng
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
                          name="isFirstTime"
                          onChange={handleChange}
                        />
                        Khuyến mãi dành cho đơn hàng đầu tiên
                      </label>
                    </div>
                  </Grid>

                  <Grid className="lesson-video-views" item xs={12} md={6}>
                    <div className="input-field">
                      <label htmlFor="avtURL ">Ảnh thumbnail</label>
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
                  </Grid>
                </Grid>
              </div>
              <div className="input-field">
                <label htmlFor="description">Mô tả</label>
                <SuneditorComponent
                  id={"description"}
                  initialContent={initialValuesDescription}
                  title={""}
                  contentOnChange={(descriptionHtml) => {
                    setFieldValue("description", descriptionHtml);
                  }}
                />
              </div>

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

export default SingleVoucherForm;
