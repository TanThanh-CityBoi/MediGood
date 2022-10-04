import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { voucherActions } from "../../../../../../actions";
import SingleVoucherForm from "../component/SingleVoucherForm";

function NewVoucher(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(
      voucherActions.create(values, () => {
        navigate("/quan-ly/khuyen-mai");
      })
    );
  };
  return (
    <div>
      <h1 className="manager-page-title">Thêm Voucher</h1>
      <SingleVoucherForm onSubmit={onSubmit} />
    </div>
  );
}

export default NewVoucher;
