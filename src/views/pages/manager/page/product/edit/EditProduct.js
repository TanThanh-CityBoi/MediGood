import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productActions } from "../../../../../../actions";
import SingleProductForm from "../component/SingleProductForm";

function EditProduct(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(productActions.getOne(id));
  }, []);

  const product = useSelector((state) => state.productReducer.product);
  const onSubmit = (values) => {
    dispatch(
      productActions.update(values, () => {
        navigate(`/quan-ly/san-pham/${id}`);
      })
    );
  };
  return (
    <div>
      <h1 className="manager-page-title">Thêm sản phẩm</h1>
      <SingleProductForm product={product} onSubmit={onSubmit} />
    </div>
  );
}

export default EditProduct;
