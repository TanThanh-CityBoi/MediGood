import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productActions } from "../../../../../../actions/product.actions";
import SingleProductForm from "../component/SingleProductForm";

function NewProduct(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(
      productActions.create(values, () => {
        navigate("/quan-ly/san-pham");
      })
    );
  };
  return (
    <div>
      <h1 className="manager-page-title">Thêm sản phẩm</h1>
      <SingleProductForm onSubmit={onSubmit} />
    </div>
  );
}

export default NewProduct;
