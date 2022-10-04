import { Container } from "react-bootstrap";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { appActions, receiptActions } from "../../../actions";
import { ShipmentDetail } from "./component/ShipmentDetail";
import { ShipmentDetailWithLogin } from "./component/ShipmentDetailWithLogin";
import { ReceiptBrefing } from "./component/ReceiptBrefing";
import "./Payment.scss";
import { useDispatch, useSelector } from "react-redux";
import { cookiesUtil } from "../../../utilities";
import { useNavigate } from "react-router-dom";

function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const products =
    useSelector((state) => state.userReducer.productsInCart) || [];
  const userInfo = useSelector((state) => state.userReducer.logedUser) || {};
  const [currentAddress, setCurrentAddress] = useState(0);

  const [province, setProvince] = useState({});
  const [district, setDistrict] = useState({});
  const [ward, setWard] = useState({});
  const [addressError, setAddressError] = useState("");

  const [payMethod, setPayMethod] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [voucher, setVoucher] = useState();

  const address = {
    province: province,
    setProvince: setProvince,
    district: district,
    setDistrict: setDistrict,
    ward: ward,
    setWard: setWard,
    addressError: addressError,
    setAddressError: setAddressError,
  };
  const afterPayment = () => {
    dispatch(appActions.showSuccessToast("Đặt hàng thành công"));
    if (!isLoggedIn) {
      cookiesUtil.removeProductCart();
    }
    navigate("/gio-hang");
  };

  const getTotalImportPrice = (products) => {
    var importPrice = 0;
    console.log("products: ", products);
    products.forEach((element) => {
      importPrice += element.product.importPrice * element.quantity;
    });
    return importPrice;
  };

  const handleSubmit = (values) => {
    if ((!province.code || !district.code || !ward.code) && !isLoggedIn) {
      setAddressError("Invalid transfer address");
      return;
    }
    if (products.length < 1) {
      dispatch(appActions.showFailToast("Giỏ hàng không có sản phẩm"));
      return;
    }
    if (isLoggedIn && userInfo?.address.length < 1) {
      dispatch(appActions.showSuccessToast("Vui lòng thêm địa chỉ giao hàng"));

      return;
    }
    const totalImport = getTotalImportPrice(products);
    console.log("import: ", totalImport);

    const receipt = isLoggedIn
      ? {
          creater: userInfo._id, // ID người tạo, nullable
          receiver: {
            name: userInfo.address[currentAddress].name,
            phone: userInfo.address[currentAddress].phone, // required
            province: userInfo.address[currentAddress].province,
            district: userInfo.address[currentAddress].district,
            ward: userInfo.address[currentAddress].ward,
            description: userInfo.address[currentAddress].description,
            note: values.note,
          }, // Tên và địa chỉ người nhận hàng.
          voucher: values.voucher, // Object id của voucher.
          cart: products,
          totalPrice: totalPrice,
          profit: totalPrice - totalImport,
          status: 1, //0: bị hủy, 1: chờ xác nhận, 2: đã xác nhận, 3: đang giao. 4: đã nhận hàng, 6: boom hàng
          payMethod: payMethod,
        }
      : {
          creater: null, // ID người tạo, nullable
          receiver: {
            name: values.fullname,
            phone: values.phone, // required
            province: province,
            district: district,
            ward: ward,
            description: values.description,
            note: values.note,
          }, // Tên và địa chỉ người nhận hàng.
          voucher: values.voucher, // Object id của voucher.
          cart: products,
          totalPrice: totalPrice - totalImport,
          profit: totalPrice,
          status: 1, //0: bị hủy, 1: chờ xác nhận, 2: đã xác nhận, 3: đang giao. 4: đã nhận hàng, 6: boom hàng
          payMethod: payMethod,
        };
    console.log("receipt: ", receipt);
    dispatch(receiptActions.create(receipt, afterPayment()));
  };

  const paymentSchema = Yup.object().shape({
    fullname: Yup.string().required("Enter your name"),
    phone: Yup.string()
      .required("Enter your phone number")
      .matches(
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Invalid phone number"
      ),
  });

  return (
    <Container className="payment-wrapper">
      <Container>
        <h1 className="payment-title">Đơn hàng của bạn</h1>
      </Container>

      <Formik
        initialValues={
          isLoggedIn
            ? {
                note: "",
              }
            : {
                fullname: "",
                phone: "",
                description: "",
                note: "",
              }
        }
        validationSchema={!isLoggedIn && paymentSchema}
        onSubmit={(values) => {
          dispatch(
            appActions.openConfirmDialog("Xác nhận thanh toán", () =>
              handleSubmit({ ...values, voucher })
            )
          );
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {isLoggedIn ? (
              <ShipmentDetailWithLogin
                payMethod={payMethod}
                setPayMethod={setPayMethod}
                currentAddress={currentAddress}
                setCurrentAddress={setCurrentAddress}
              />
            ) : (
              <ShipmentDetail
                address={address}
                payMethod={payMethod}
                setPayMethod={setPayMethod}
                errors={errors}
                touched={touched}
              />
            )}
            <hr />
            <ReceiptBrefing
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              setVoucher={setVoucher}
              productCount={products.reduce((pre, current) => {
                return current.quantity + pre;
              }, 0)}
            />
          </Form>
        )}
      </Formik>
    </Container>
  );
}
export default Payment;
