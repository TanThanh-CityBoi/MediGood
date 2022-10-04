import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { receiptActions } from "../../../../../../actions/receipt.actions";
import SingleReceiptForm from "../component/SingleReceiptForm";

function NewReceipt(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(
      receiptActions.create(values, () => {
        navigate("/quan-ly/hoa-don");
      })
    );
  };
  return (
    <div>
      <h1 style={{ textAlign: "left" }} className="manager-page-title">
        Tạo đơn hàng
      </h1>

      <SingleReceiptForm onSubmit={onSubmit} />
    </div>
  );
}

export default NewReceipt;
