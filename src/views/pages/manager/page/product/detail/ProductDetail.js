import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { appActions } from "../../../../../../actions/app.actions";
import { productActions } from "../../../../../../actions/product.actions";
import Product from "../../../../product/Product";

function ProductDetail(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleEditOnClick = () => {
    navigate(`/quan-ly/san-pham/edit/${id}`);
  };

  const handleDeleteOnClick = () => {
    dispatch(
      appActions.openConfirmDialog(
        "Bạn có thực sự muốn xóa sản phẩm này khỏi trang web?",
        () => {
          dispatch(
            productActions.deleteOne(id, () => {
              navigate("/quan-ly/san-pham");
            })
          );
        }
      )
    );
  };
  return (
    <>
      <div style={{ marginTop: "-110px", position: "relative" }}>
        <div className="top-right-fixed display-flex">
          <span onClick={handleEditOnClick} className="lw-btn">
            Chỉnh sửa
          </span>
          <span
            onClick={handleDeleteOnClick}
            style={{ backgroundColor: "#FF0000" }}
            className="lw-btn"
          >
            Xóa
          </span>
        </div>
        <Product />
      </div>
    </>
  );
}

export default ProductDetail;
