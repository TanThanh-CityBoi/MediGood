import { useDispatch, useSelector } from "react-redux";
import { appActions, userActions } from "../../../../actions";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import "./UserInfo.scss";

function UserInfo() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.logedUser) || {};
  const inputList = [
    {
      name: "name",
      title: "Họ và tên",
      type: "text",
    },
    {
      name: "gender",
      title: "Giới tính",
      type: "select",
    },
    {
      name: "birthday",
      title: "Ngày sinh",
      type: "date",
    },
    {
      name: "phone",
      title: "Số điện thoại",
      type: "text",
    },
  ];

  function isShallowEqual(obj1, obj2) {
    for (let prop in obj1) {
      if (obj1[prop] !== obj2[prop]) return false;
    }

    for (let prop in obj2) {
      if (obj2[prop] !== obj1[prop]) return false;
    }

    return true;
  }

  const afterUpdate = () => {
    dispatch(appActions.showSuccessToast("Cập nhật thành công"));
  };

  const handleSubmit = (values) => {
    const newInfo = {
      ...currentUser,
      ...values,
    };
    console.log("new: ", newInfo);
    dispatch(userActions.update(newInfo, () => afterUpdate()));
  };

  const maxDate =
    new Date().getFullYear() -
    18 +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getDate();

  const userSchema = Yup.object().shape({
    name: Yup.string().required("Enter your name"),
    phone: Yup.string()
      .required("Enter your phone number")
      .matches(
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Invalid phone number"
      ),
    birthday: Yup.date().max(new Date(maxDate), "Your age must be than 18"),
  });
  const initialValues = {
    name: currentUser?.name,
    gender: currentUser?.gender,
    birthday: currentUser.birthday?.split("T")[0],
    phone: currentUser?.phone,
  };

  return (
    <div className="user-info__wrapper">
      <h1>Hồ sơ của tôi</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={(values) => {
          if (isShallowEqual(values, initialValues)) {
            dispatch(appActions.showFailToast("Thông tin không thay đổi"));

            return;
          }
          dispatch(
            appActions.openConfirmDialog("Lưu thay đổi?", () =>
              handleSubmit(values)
            )
          );
        }}
      >
        {({ errors, touched, resetForm }) => (
          <Form className="form-info">
            <div className="info-item">
              <label htmlFor={"info-item__email"}>Email</label>
              <input
                value={currentUser?.email}
                id={"info-item__email"}
                disabled={true}
              />
            </div>
            {inputList.map((val, idx) => (
              <div key={idx} className="info-item">
                <label htmlFor={"info-item__" + val.name}>{val.title}</label>
                {val.type !== "select" ? (
                  <Field
                    name={val.name}
                    type={val.type}
                    id={"info-item__" + val.name}
                  />
                ) : (
                  <Field name="gender" as="select">
                    <option value={1}>Nam</option>
                    <option value={2}>Nữ</option>
                    <option value={3}>Khác</option>
                  </Field>
                )}
                {errors[val.name] && touched[val.name] && (
                  <p className="input-error-validation"> {errors[val.name]} </p>
                )}
              </div>
            ))}
            <div className="save-reset-password__btn-group">
              <button className="btn-save" type="submit">
                Lưu thông tin
              </button>
              <button onClick={resetForm} type="button">
                Bỏ thay đổi
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export { UserInfo };
