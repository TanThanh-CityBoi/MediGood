import * as React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { GrNext } from "react-icons/gr";
import "./Breadcrumb.scss";

function Breadcrumb(props) {
  return (
    <div style={{ marginLeft: "-2rem" }} className="bread-crum-wrapper">
      <AiOutlineHome />
      <Link to="/trang-chu">Trang chủ</Link>

      {props.data.map((val, idx) => (
        <Link to={val.link} key={idx}>
          <GrNext /> {val.name}
        </Link>
      ))}
    </div>
  );
}
export { Breadcrumb };
