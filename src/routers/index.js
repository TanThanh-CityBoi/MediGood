import { Route, Routes, Navigate } from "react-router-dom";
import routes from "../routes";
import React from "react";
import { useSelector } from "react-redux";
import ManagerContent from "../views/pages/manager/manager-layout/ManagerContent";
import CircularProgress from '@mui/material/CircularProgress';
const loading = (
  <div
    style={{
      display: "flex",
      height: "100vh",
      alignIten: "center",
      justifyContent: "center",
    }}
  >
    <h1 style={{ margin: "auto" }}>
      <CircularProgress color="success" />
    </h1>
  </div>
);

// Containers
const TheContent = React.lazy(() =>
  import("../views/layout-components/TheContent")
);

// Pages
const Login = React.lazy(() => import("../views/pages/auth/login/Login"));
const SignUp = React.lazy(() => import("../views/pages/auth/sign-up/SignUp"));
const Page404 = React.lazy(() => import("../views/pages/page404/Page404"));
const UpdateInfo = React.lazy(() =>
  import("../views/pages/auth/UpdateInfo/UpdateInfo")
);
const ForgotPassword = React.lazy(() =>
  import("../views/pages/auth/forgotPassword/ForgotPassword")
);
const EmailVerification = React.lazy(() =>
  import("../views/pages/emailVerification/EmailVerification")
);

const Routers = () => {
  const authentication = useSelector((state) => state.userReducer);
  // console.log({ authentication })
  return (
    // <React.Suspense fallback={loading}>
    <React.Suspense fallback={loading}>
      <Routes>
        <Route path="/dang-nhap" name="Đăng nhập" element={<Login />} />
        <Route path="/dang-ky" name="Đăng ký" element={<SignUp />} />
        <Route
          path="/quen-mat-khau"
          name="Quên mật khẩu"
          element={<ForgotPassword />}
        />
        <Route path="/404" name="Page 404" element={<Page404 />} />
        <Route
          path="/cap-nhat-thong-tin"
          name="Cập nhật thông tin người dùng"
          element={<UpdateInfo />}
        />
        <Route
          path="/xac-nhan-email/:id/:token"
          name="Xác nhận email"
          element={<EmailVerification />}
        />

        <Route path="/quan-ly" name="Trang chủ" element={<ManagerContent />}>
          {!authentication.isLoggedIn ||
            (authentication?.logedUser.role === "admin" &&
              routes.managerRoute.map((route, idx) => {
                return (
                  route.element && (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  )
                );
              }))}
        </Route>
        <Route path="/" name="Trang chủ" element={<TheContent />}>
          <Route index name="Trang chủ" element={<Navigate to="trang-chu" />} />

          {!authentication?.isLoggedIn &&
            routes.publicRoute.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                )
              );
            })}
          {authentication?.isLoggedIn &&
            routes.protectedRoute.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                )
              );
            })}

          {routes.commonRoute.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              )
            );
          })}
        </Route>

        <Route
          path="*"
          element={
            <Navigate
              to={authentication?.isLoggedIn ? "/trang-chu" : "/dang-nhap"}
            />
          }
        />
        {/* <Route path="*" element={<Navigate to="404" />}/> */}

        {/* <AuthGuard path="/" name="Trang chủ">
         <TheLayout></TheLayout>
        </AuthGuard> */}
      </Routes>
    </React.Suspense>
  );
};

export default Routers;
