import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { userActions } from "../../../actions/user.actions";
import { usersServices } from "../../../services";
import axios from "axios";
import { Fragment } from "react/cjs/react.production.min";

function EmailVerification() {

    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();
    const navigate = useNavigate();
  //  const dispatch = useDispatch();

    useEffect(() => {
        usersServices.verifyEmail(param.id, param.token).then(
            (result) => {
                console.log(result);
                setValidUrl(true);
            },
            (error) => {
                console.log("errrrrrrr: ", error.toString());
                navigate('/404');
            }
        )

    }, []);

    return (
        <>
            {validUrl &&
                <div className="email-verification">
                    <h1 style={{ margin: "50px" }}>Email verified successfully!!!!</h1>
                    <div style={{ display: "flex", flexWrap: "nowrap", margin: "50px" }}>
                        <button style={{ marginRight: "20px" }} onClick={() => { navigate("/trang-chu") }}>Trang chủ</button>
                        <button onClick={() => { navigate("dang-nhap") }}>Đăng nhập</button>
                    </div>
                </div>}
        </>


    );
}

export default EmailVerification