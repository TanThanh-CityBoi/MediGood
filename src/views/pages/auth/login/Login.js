import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { userActions } from "../../../../actions/user.actions";
import { Stack } from "@mui/material";
import "./Login.scss";
import ListOfLoginMethodModal from "./ListOfLoginMethodModal";
import LoginWithUserNameAndPasswordModal from "./LoginWithUserNameAndPasswordModal";

const Login = () => {
  // currentPage đại diện cho page đang hiển thị, 0: Login method, 1: LoginWithUserNameAndPassword
  const [currentPage, setPage] = useState(0);
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);

  function GoToLoginWithUsernameAndPasswordScreen() {
    setPage(1);
  }

  function BackToChooseLoginMethodScreen() {
    setPage(0);
  }

  function HandleSignInButtonOnClick(values) {
    dispatch(userActions.login(values.email, values.password));
  }

  if (userReducer.isLoggedIn) return <Navigate to="/trang-chu" />;


  return (
    <>
      <div className="login-page-wrapper">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "100vh",
          }}
        >
          {currentPage === 0 && (
            <ListOfLoginMethodModal
              GoToLoginWithUsernameAndPasswordScreen={
                GoToLoginWithUsernameAndPasswordScreen
              }
            />
          )}

          {currentPage === 1 && (
            <LoginWithUserNameAndPasswordModal
              HandleSignInButtonOnClick={HandleSignInButtonOnClick}
              BackToChooseLoginMethodScreen={BackToChooseLoginMethodScreen}
            />
          )}
        </Stack>
      </div>
    </>
  );
};

export default Login;
