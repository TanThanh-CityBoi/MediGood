import { Modal, Box } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import subVn from "sub-vn";
import { Formik, Form, Field } from "formik";
import { appActions, userActions } from "../../../../actions";
import { GrClose } from "react-icons/gr";
import "./AddAddressModal.scss";
import { useDispatch, useSelector } from "react-redux";

function AddAddressModal(props) {
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      props.setOpen(false);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60rem",
    bgcolor: "#FFFFFF",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const renderOptionList = (options) => {
    return options.map((option, idx) => (
      <option key={idx} value={JSON.stringify(option)}>
        {option.name}
      </option>
    ));
  };
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userReducer.logedUser) || [];
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const [province, setProvince] = useState({});
  const [district, setDistrict] = useState({});
  const [ward, setWard] = useState({});
  const [addressError, setAddressError] = useState("");

  const handleSubmit = (values) => {
    if (!province.code || !district.code || !ward.code) {
      setAddressError("Invalid transfer address");
      return;
    }
    const newAddress = {
      ...values,
      province: province,
      district: district,
      ward: ward,
    };
    console.log("new address values: ", newAddress);
    if (isLoggedIn) {
      userInfo.address.push(newAddress);
      dispatch(userActions.update(userInfo));
      handleClose();
    } else {
      dispatch(appActions.showFailToast("Vui lòng đăng nhập"));
    }
  };
  const paymentSchema = Yup.object().shape({
    name: Yup.string().required("Enter your name"),
    phone: Yup.string()
      .required("Enter your phone number")
      .matches(
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Invalid phone number"
      ),
  });
  return (
    <div className="edit-modal-wrapper">
      <Modal
        open={props.isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style} className="box-modal">
          <div className="addAddress-form-group">
            <div className="exit-btn">
              <button onClick={handleClose}>
                <GrClose />
              </button>
            </div>
            <Formik
              initialValues={{
                name: "",
                phone: "",
                description: "",
              }}
              validationSchema={paymentSchema}
              onSubmit={(values) => {
                dispatch(
                  appActions.openConfirmDialog("Xác nhận thêm", () =>
                    handleSubmit(values)
                  )
                );
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-item">
                    <label>Họ và tên</label>
                    <Field name="name" type="text" />
                    {errors.name && touched.name && (
                      <p className="input-error-validation"> {errors.name} </p>
                    )}
                  </div>

                  <div className="form-item">
                    <label>SĐT</label>
                    <Field name="phone" type="text" />
                    {errors.phone && touched.phone && (
                      <p className="input-error-validation"> {errors.phone} </p>
                    )}
                  </div>

                  <div className="address-group">
                    <div className="input-field">
                      <label htmlFor="province">Tỉnh/ Thành phố</label>
                      <select
                        value={JSON.stringify(province)}
                        onChange={(e) => {
                          if (e.target.value)
                            setProvince(JSON.parse(e.target.value));
                        }}
                        name="province"
                      >
                        <option value={undefined}>---Tỉnh/Thành phố---</option>
                        {renderOptionList(subVn.getProvinces())}
                      </select>
                    </div>

                    <div className="input-field">
                      <label htmlFor="district">Quận/ Huyện</label>
                      <select
                        value={JSON.stringify(district)}
                        onChange={(e) => {
                          if (e.target.value)
                            setDistrict(JSON.parse(e.target.value));
                        }}
                        name="district"
                      >
                        <option value={undefined}>---Quận/ Huyện---</option>
                        {renderOptionList(
                          subVn.getDistrictsByProvinceCode(province?.code)
                        )}
                      </select>
                    </div>

                    <div className="input-field">
                      <label htmlFor="ward">Phường/ Xã</label>
                      <select
                        value={JSON.stringify(ward)}
                        onChange={(e) => {
                          if (
                            province.code &&
                            district.code &&
                            JSON.parse(e.target.value).code
                          ) {
                            setAddressError("");
                          }
                          if (e.target.value)
                            setWard(JSON.parse(e.target.value));
                        }}
                        name="ward"
                      >
                        <option value={undefined}>---Phường/ Xã---</option>
                        {renderOptionList(
                          subVn.getWardsByDistrictCode(district?.code)
                        )}
                      </select>
                    </div>
                  </div>
                  {addressError && touched.phone && (
                    <p className="input-error-validation"> {addressError} </p>
                  )}
                  <div className="form-item">
                    <label>Địa chỉ cụ thể</label>
                    <Field name="description" type="text" />
                  </div>

                  <div className="btn-submit">
                    <button type="submit">Thêm địa chỉ</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export { AddAddressModal };
