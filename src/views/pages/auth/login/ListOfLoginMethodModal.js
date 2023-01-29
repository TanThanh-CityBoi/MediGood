import React from "react";
import { Stack } from "@mui/material";
import { BsGoogle } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa"
import { Link } from "react-router-dom";
import { IoReturnUpBackSharp } from "react-icons/io5";

function ListOfLoginMethodModal(props) {
  return (
    <div className="list-of-login-method-modal">
      <Link to='/trang-chu' className="back-to-home"> <IoReturnUpBackSharp /></Link>
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
        <h1 className="modal-title">Đăng nhập vào Medigood</h1>

        <Stack
          sx={{
            width: "80%",
            maxWidth: "500px",
          }}
          spacing={2}
          direction="column"
          margin="24px"
        >
          <button
            onClick={props.GoToLoginWithUsernameAndPasswordScreen}
            className="email-login-btn"
          >
            Đăng nhập với email/ password
          </button>

          <div  className="google-facebook">
            <div className="google-login">
              <BsGoogle />
              <p className="full-width-text">Google</p>
            </div>

            <div className="facebook-login">
              <FaFacebookSquare />
              <p className="full-width-text">Facebook</p>
            </div>
          </div>
        </Stack>

        <p>
          Chưa có tài khoản?{" "}
          <Link to="/dang-ky">
            <strong>Đăng ký</strong>
          </Link>
        </p>
      </Stack>
    </div>
  );
}

export default ListOfLoginMethodModal;
