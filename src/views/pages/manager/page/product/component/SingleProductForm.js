import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Grid } from "@mui/material";
import { IoIosAdd } from "react-icons/io";
import { firebaseStorageServices } from "../../../../../../services";
import { productActions } from "../../../../../../actions/product.actions";
import SuneditorComponent from "../../../../../component/suneditor-component/SunEditorComponent";

function SingleLessonForm({ product, onSubmit }) {
  const InputFields = [
    {
      label: "Mã sản phẩm",
      type: "text",
      name: "productCode",
      initialValue: "",
    },
    {
      label: "Tên sản phẩm",
      type: "text",
      name: "name",
      initialValue: "",
    },
    {
      label: "Số lượng",
      type: "number",
      name: "quantity",
      initialValue: 0,
    },
    {
      label: "Giá nhập",
      type: "number",
      name: "importPrice",
      initialValue: 0,
    },
    {
      label: "Giá bán gốc",
      type: "number",
      name: "originPrice",
      initialValue: 0,
    },
    {
      label: "Giá bán chính thức",
      type: "number",
      name: "price",
      initialValue: 0,
    },
    {
      label: "Danh mục",
      type: "select",
      options: [
        {
          value: "thuoc-than-kinh",
          label: "Thuốc thần kinh"
        },
        {
          value: "thuoc-xuong-khop",
          label: "Thuốc xương khớp"
        },
        {
          value: "thuoc-ho-hap",
          label: "Thuốc hô hấp"
        },
        {
          value: "thuoc-tieu-hoa",
          label: "Thuốc tiêu hóa"
        },
        {
          value: "thuoc-tuan-hoan",
          label: "Thuốc tuần hoàn"
        },
        {
          value: "khac",
          label: "Khác"
        },
      ],
      name: "category",
      initialValue: "",
    },
    {
      label: "Xuất sứ",
      type: "text",
      name: "origin",
      initialValue: "",
    },
    {
      label: "Nhà sản xuất",
      type: "text",
      name: "producer",
      initialValue: "",
    },

    {
      label: "Độ tuổi sử dụng tối thiểu",
      type: "number",
      name: "minAge",
      initialValue: 0,
    },
    {
      label: "Độ tuổi sử dụng tối đa",
      type: "number",
      name: "maxAge",
      initialValue: 100,
    },
    {
      label: "Dạng bào chế",
      type: "select",
      options: [
        {
          value: "dung-dich",
          label: "Dung dịch"
        },
        {
          value: "vien-nen",
          label: "Viên nén"
        },
        {
          value: "vien-nan",
          label: "Viên nan"
        },
        {
          value: "sui",
          label: "Dạng sủi"
        },
        {
          value: "khac",
          label: "Khác"
        },
      ],
      name: "dosageForm",
      initialValue: "dung-dich",
    },

    {
      label: "Lưu ý",
      type: "textarea",
      name: "note",
      initialValue: "",
    },
    {
      label: "Về sản phẩm",
      type: "html",
      name: "aboutProduct",
      initialValue: "",
    },

    {
      label: "Hạn sử dụng",
      type: "date",
      name: "experation",
      initialValue: "",
    },
    {
      label: "Số lượng đã bán",
      type: "number",
      name: "hasSold",
      initialValue: "",
    },
  ];
  console.log("product nè", product);
  const initialValues = {
    thumbnailUrl: undefined,
    imgUrls: [],
    productCode: "",
    name: "",
    quantity: 0,
    importPrice: 0, // Giá nhập
    originPrice: 0, // Giá bán gốc
    price: 0, // Giá bán đã sale

    category: "thuoc-than-kinh",
    origin: "", // Xuất xứ
    producer: "", //Nhà sản xuất
    age: "5-12", // Độ tuổi sử dụng
    minAge: product?.age ? product.age[0] : 0,
    maxAge: product?.age ? product.age[1] : 0,
    dosageForm: "dung-dich", // Một đoạn ngắn mô tả thông tin sản phẩm
    note: "", // Một đoạn ngắn mô tả thông tin sản phẩm
    aboutProduct: "html code",
    experation: undefined, //Date.now(), //Date
    hasSold: 100,
    ...product,
  };
  console.log("initial value nè", initialValues);
  console.log({product})
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
    productCode: Yup.string().required("Đây là trường bắt buộc"),
    name: Yup.string().required("Đây là trường bắt buộc"),
    quantity: Yup.number().min(0).required("Đây là trường bắt buộc"),
    importPrice: Yup.number().min(0).required("Đây là trường bắt buộc"),
    originPrice: Yup.number().min(0).required("Đây là trường bắt buộc"),
    price: Yup.number().min(0).required("Đây là trường bắt buộc"),
    maxAge: Yup.number().when('minAge', (minAge) => {
      if (minAge) {
          return Yup.number()
              .min(minAge, 'Yêu cầu tuổi lớn hơn')
              .typeError('Vui lòng nhập giá trị')
      }
  }),
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
            setFieldValue("thumbnailUrl", url);
            firebaseStorageServices.deleteFileOnFirebase(preUrl);
          }
        );
        console.log(e.target.files);
        setFieldValue("thumbnailUrl", URL.createObjectURL(e.target.files[0]));
      } else alert("Vui lòng tải ảnh lên để cập nhật ảnh đại diện");
    }
  };

  const handleAddImage = (e, imgUrls, setFieldValue) => {
    if (e.target.files[0]) {
      if (e.target.files[0]["type"].split("/")[0] === "image") {
        firebaseStorageServices.uploadFileToFirebase(
          e.target.files[0],
          "product-image",
          null,
          (err) => console.log(err),
          (url) => {
            const tempUrls = [...imgUrls, url];
            setFieldValue("imgUrls", tempUrls);
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
          values.age = [values.minAge, values.maxAge];
          delete values["minAge"];
          delete values["maxAge"];
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
                    {InputFields?.map((item) => {
                      if (item.type == "select")
                        return (
                          <div key={item.name} className="input-field">
                            <label htmlFor={item.name}>{item.label}</label>
                            <Field as="select" name={item.name}>
                              {item.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Field>
                            {errors[item.name] && touched[item.name] && (
                              <div>{errors[item.name]}</div>
                            )}
                          </div>
                        );

                      if (item.type == "html")
                        return (
                          <div className="input-field">
                            <label htmlFor="content">{item.label}</label>
                            <SuneditorComponent
                              id={item.name}
                              initialContent={values[item.name]}
                              title={""}
                              contentOnChange={(contentHtml) => {
                                setFieldValue(item.name, contentHtml);
                              }}
                            />
                          </div>
                        );

                      if (item.type == "date")
                        return (
                          <div className="input-field">
                            <label htmlFor="sugar">{item.label}</label>
                            <input
                              type="date"
                              id={item.name}
                              name={item.name}
                              value={values[item.name]}
                              onChange={handleChange}
                            ></input>
                            {errors[item.name] && (
                              <p className="input-error-validation">
                                {" "}
                                {errors[item.name]}{" "}
                              </p>
                            )}
                          </div>
                        );
                      return (
                        <div className="input-field">
                          <label htmlFor="productCode">{item.label}</label>
                          <Field name={item.name} type={item.type} />
                          {errors[item.name] && touched[item.name] && (
                            <div>{errors[item.name]}</div>
                          )}
                        </div>
                      );
                    })}
                  </Grid>

                  <Grid className="lesson-video-views" item xs={12} md={6}>
                    <div className="input-field">
                      <label htmlFor="thumbnailUrl ">Ảnh đại diện</label>
                      <div style={{ width: "5px", height: "8px" }}></div>
                      <label htmlFor="thumbnailUrl">
                        <span
                          style={{ display: "inline-block" }}
                          className="lw-btn"
                        >
                          Tải ảnh lên
                        </span>
                      </label>
                      <div style={{ width: "5px", height: "8px" }}></div>
                      <input
                        id="thumbnailUrl"
                        style={{ display: "none" }}
                        type="file"
                        onChange={(e) =>
                          handleChangeAvt(e, setFieldValue, values.thumbnailUrl)
                        }
                      />
                      <img
                        src={values.thumbnailUrl || "ser"}
                        alt=""
                        height={"250px"}
                        width={"250px"}
                      />
                      {errors.thumbnailUrl && touched.thumbnailUrl && (
                        <div>{errors.thumbnailUrl}</div>
                      )}
                    </div>

                    <div className="input-field">
                      <div className="mistery-box">
                        <label htmlFor="imgUrls ">Album</label>
                      </div>

                      <div className="mistery-box">
                        <input
                          id="imgUrls"
                          style={{ display: "none" }}
                          type="file"
                          onChange={(e) =>
                            handleAddImage(e, values.imgUrls, setFieldValue)
                          }
                        />
                        {values.imgUrls?.map((imgUrl, index) => {
                          return (
                            <img
                              key={`img-link-${index}`}
                              style={{
                                objectFit: "cover",
                                marginRight: "12px",
                                display: "inline-block",
                              }}
                              src={imgUrl}
                              alt=""
                              width={"100px"}
                              height={"100px"}
                            />
                          );
                        })}
                      </div>
                      <label htmlFor="imgUrls">
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

                      {errors.imgUrls && touched.imgUrls && (
                        <div>{errors.imgUrls}</div>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </div>

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
