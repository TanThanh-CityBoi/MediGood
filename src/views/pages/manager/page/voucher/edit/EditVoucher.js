import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { voucherActions } from "../../../../../../actions";
import SingleVoucherForm from "../component/SingleVoucherForm";

function EditVoucher(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(voucherActions.getOne(id));
  }, []);

  const voucher = useSelector((state) => state.voucherReducer.voucher);
  const onSubmit = (values) => {
    dispatch(
      voucherActions.update(values, () => {
        navigate(`/quan-ly/khuyen-mai/${id}`);
      })
    );
  };
  return (
    <div>
      <h1 className="manager-page-title">Chỉnh sửa Voucher</h1>
      <SingleVoucherForm voucher={voucher} onSubmit={onSubmit} />
    </div>
  );
}

export default EditVoucher;
