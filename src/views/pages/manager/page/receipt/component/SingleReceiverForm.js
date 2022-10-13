import React, { useState } from "react";
import subVn from "sub-vn";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Grid } from "@mui/material";
import { IoIosAdd } from "react-icons/io";
import { firebaseStorageServices } from "../../../../../../services";
import { receiptActions } from "../../../../../../actions/receipt.actions";
import SuneditorComponent from "../../../../../component/suneditor-component/SunEditorComponent";
function SingleReceiverForm({ submitText, receiverInfo, onSubmit, onCancel }) {
  const [province, setProvince] = useState(receiverInfo.province);
  const [district, setDistrict] = useState(receiverInfo.district);
  const [ward, setWard] = useState(receiverInfo.ward);
  const initialValues = {
    name: receiverInfo.name,
    phone: receiverInfo.phone,
    description: receiverInfo.description,
    note: receiverInfo.note,
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object({
    name: Yup.string().required("Đây là trường bắt buộc"),
    phone: Yup.string().required("Đây là trường bắt buộc"),
  });

  const renderOptionList = (options) => {
    return options.map((option, idx) => (
      <option key={idx} value={JSON.stringify(option)}>
        {option.name}
      </option>
    ));
  };

  return (
    <div className="single-lesson-form-wrapper">
      <Formik
        enableReinitialize={true}
        initialValues={{ ...initialValues }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          onSubmit({ ...values, province, district, ward });
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
          console.log({ errors });
          return (
            <Form style={{}}>
              <div className="input-field">
                <label htmlFor="name">Tên người dùng</label>
                <Field name="name" type="text" />
                {errors.name && touched.name && <div>{errors.name}</div>}
              </div>

              <div className="input-field">
                <label htmlFor="phone">Số điện thoại</label>
                <Field name="phone" type="phone" />
                {errors.phone && touched.phone && <div>{errors.phone}</div>}
              </div>

              <div className="input-field">
                <label htmlFor="description">Đường, số nhà</label>
                <Field name="description" type="text" />
                {errors.description && touched.description && (
                  <div>{errors.description}</div>
                )}
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
              <div className="input-field">
                <label htmlFor="note">Ghi chú</label>
                <Field as="textarea" name="note" type="text" />
                {errors.note && touched.note && <div>{errors.note}</div>}
              </div>

              <button
                className="lw-btn"
                type="submit"
                style={{ display: "inline-block" }}
              >
                {submitText ? submitText : "Tiếp tục"}
              </button>
              <button
                className="lw-btn"
                onClick={() => {
                  console.log(onCancel);
                  onCancel();
                }}
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

export default SingleReceiverForm;
