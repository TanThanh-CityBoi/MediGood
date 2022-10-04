import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { userActions } from "../../actions/user.actions";
import { appActions, bannerActions } from "../../actions";
import {
  Nav,
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
  Row,
} from "react-bootstrap";
import {
  MdPhoneInTalk,
  MdOutlineReceiptLong,
  MdLogout,
  MdLogin,
} from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";

import "./TheHeader.scss";

const TheHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const [searchKey, setSearchKey] = useState("");
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const currentUser = useSelector((state) => state.userReducer.logedUser) || {};
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(userActions.getCurrent());
    }
  }, []);

  useEffect(() => {
    dispatch(bannerActions.getAll());
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    console.log(searchKey);
    navigate(`/tim-kiem?key=${searchKey}`);
  }
  function HandleLogOutOnClick() {
    console.log("Click", appActions);
    dispatch(
      appActions.openConfirmDialog("Bạn có muốn đăng xuất ?", () =>
        dispatch(
          userActions.logout(() => {
            navigate("/dang-nhap");
          })
        )
      )
    );
  }
  const [visible, setVisible] = useState(true);
  const position = useRef();
  position.current = window.pageYOffset;

  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;
      if (moving < 100 && visible) return;

      if (position.current > moving + 20) {
        setVisible(true);
        position.current = moving;
      }
      if (position.current < moving - 20) {
        setVisible(false);
        position.current = moving;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    setVisible(true);

    //--Đóng navbar khi chuyển trang--//
    var navbar = document.getElementById("navbarScroll");
    var btn = document.getElementById("navbarScroll-control-btn");
    if (navbar.classList.contains("show")) {
      btn.click();
    }
  }, [param]);
  const cls = visible ? "header-visible" : "header-hidden";

  return (
    <div className={"header-wrapper " + cls} tabIndex={100}>
      <Container className="header">
        <div className="nav-1">
          <div className="nav-1a">
            <p>
              <MdPhoneInTalk /> 0334.696.473
            </p>
          </div>

          <div className="nav-1b">
            <Nav as="ul">
              <Nav.Item as="li">
                <NavLink to={`/tra-cuu-don-hang`}>
                  <MdOutlineReceiptLong />
                  Tra cứu đơn hàng
                </NavLink>
              </Nav.Item>
              {isLoggedIn ? (
                <>
                  <Nav.Item as="li">
                    <NavLink to={`/thong-tin-tai-khoan`}>
                      <FaUserCircle />
                      {currentUser?.email}
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Nav.Link
                      onClick={() => {
                        HandleLogOutOnClick();
                      }}
                    >
                      <MdLogout />
                      Đăng xuất
                    </Nav.Link>
                  </Nav.Item>
                </>
              ) : (
                <Nav.Item as="li">
                  <Nav.Link
                    onClick={() => {
                      navigate("/dang-nhap");
                    }}
                  >
                    <MdLogin />
                    Đăng Nhập
                  </Nav.Link>
                </Nav.Item>
              )}
              <Nav.Item as="li">
                <NavLink to={`/gio-hang`}>
                  <BsCartCheck />
                  Giỏ hàng
                </NavLink>
              </Nav.Item>
            </Nav>
          </div>
        </div>

        <Row className="nav-2 mx-0">
          <Container className="nav-2-navigate-group">
            <Navbar bg="light" expand="xxl" className="nav-2-navbar-expand">
              <Navbar.Brand href="/" className="nav-2-navbar-brand mx-0">
                <h1>Luxy Wine</h1>
              </Navbar.Brand>
              <Navbar.Toggle
                id="navbarScroll-control-btn"
                aria-controls="navbarScroll"
                className="ms-4"
                style={{ height: "4rem", width: "4rem" }}
              />
              <Navbar.Collapse id="navbarScroll" className={"jj"}>
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <NavLink to={`/trang-chu`} role="button" className="nav-link">
                    Trang chủ
                  </NavLink>
                  <NavLink to={`/san-pham`} role="button" className="nav-link">
                    Rượu
                  </NavLink>
                  <NavLink
                    to={`/san-pham-dac-biet`}
                    role="button"
                    className="nav-link"
                  >
                    Combo
                  </NavLink>
                  <NavLink to={`/phu-kien`} role="button" className="nav-link">
                    Phụ kiện
                  </NavLink>
                  <NavLink to={`/khuyen-mai`} role="button" className="nav-link">
                    Khuyến mãi
                  </NavLink>
                  <NavLink to={`/tin-tuc`} role="button" className="nav-link">
                    Tin tức
                  </NavLink>
                </Nav>
                <div className="form-wrapper">
                  <Form
                    onSubmit={(e) => {
                      handleSearch(e);
                    }}
                    className="form-search d-flex"
                  >
                    <FormControl
                      name="search"
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                      type="search"
                      placeholder="Tìm kiếm..."
                      aria-label="Search"
                      className="ms-3"
                    />
                    <Button type="submit" className="btn-search">
                      <GoSearch />
                    </Button>
                  </Form>
                </div>
              </Navbar.Collapse>
            </Navbar>
          </Container>
        </Row>
      </Container>
    </div>
  );
};

export default React.memo(TheHeader);
