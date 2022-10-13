import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { usersServices } from "../../../../services/users.services";
import { Stack } from "@mui/material";
import "./SignUp.scss";
import SignUpForm from "./SignUpForm";
import { userActions } from "../../../../actions";

const SignUp = () => {
  const navigate = useNavigate();

  function goBackBtnOnClick() {
    navigate(-1);
  }
  const dispatch = useDispatch();

  function SignUpOnClick(value) {
    dispatch(userActions.register(value));
  }

  return (
    <>
      <div className="sign-up-page-wrapper">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "100vh",
          }}
        >
          <div className="sign-up-form-modal">
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                backgroundColor: "#fff",
                maxWidth: "800px",
                padding: "18px",
                borderRadius: "10px",
              }}
            >
              <h1 className="modal-title">ĐĂNG KÝ TÀI KHOẢN</h1>

              <Stack
                sx={{
                  width: "80%",
                  maxWidth: "500px",
                }}
                spacing={2}
                direction="column"
                margin="24px"
              >
                <SignUpForm onSubmit={SignUpOnClick} />
              </Stack>

              <p>
                Đã có tài khoản?
                <Link to="/dang-nhap">
                  <strong> Đăng nhập</strong>
                </Link>
              </p>
            </Stack>
          </div>
        </Stack>
      </div>
    </>
  );
};

export default SignUp;
