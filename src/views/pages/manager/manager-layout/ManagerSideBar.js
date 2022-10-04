import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFillGiftFill } from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiNews, BiUserCircle } from "react-icons/bi";
import { GiKnightBanner } from "react-icons/gi";
import { FaProductHunt } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import "./ManagerSideBar.scss";
function TheNavigation() {
  const menuList = [
    {
      name: "Dashboard",
      icon: <AiOutlineDashboard />,
      link: "/quan-ly/dashboard",
    },
    {
      name: "Quản lý sản phẩm",
      icon: <FaProductHunt />,
      link: "/quan-ly/san-pham",
    },
    {
      name: "Quản lý hóa đơn",
      icon: <RiBillLine />,
      link: "/quan-ly/hoa-don",
    },
    {
      name: "Quản lý khuyến mãi",
      icon: <BsFillGiftFill />,
      link: "/quan-ly/khuyen-mai",
    },
    {
      name: "Quản lý tin tức",
      icon: <BiNews />,
      link: "/quan-ly/tin-tuc",
    },
    {
      name: "Quản lý Banner",
      icon: <GiKnightBanner />,
      link: "/quan-ly/banner",
    },
    {
      name: "Quản lý người dùng",
      icon: <BiUserCircle />,
      link: "/quan-ly/nguoi-dung",
    },
  ];
  const navigate = useNavigate();
  return (
    <>
      <div className="manager-side-bar-wrapper">
        <div className="mystery-box"></div>
        <div className="fixed-position-content">
          <div className="branding-heading">
            <h1
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/trang-chu");
              }}
            >
              Luxy Wine manager
            </h1>
          </div>
          <List className="manager-side-bar">
            {menuList.map((item, index) => (
              <NavLink
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "#3c3c3c" } : undefined
                }
                to={item.link}
                key={index}
              >
                <ListItem className="manager-nav-item" sx={{ gutters: "24px" }}>
                  <ListItemIcon className="manager-nav-leading">
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    className="manager-nav-content"
                    primary={item.name}
                  />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </div>
      </div>
    </>
  );
}
export default React.memo(TheNavigation);
