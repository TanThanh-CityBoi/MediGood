import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { appActions, voucherActions } from "../../../../../../actions";
import { numberUtils } from "../../../../../../utilities/number.util";
import "./VoucherDetail.scss";
function VoucherDetail(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleEditOnClick = () => {
    navigate(`/quan-ly/khuyen-mai/edit/${id}`);
  };
  const voucher = useSelector((state) => state.voucherReducer.voucher) || {};
  useEffect(() => {
    dispatch(voucherActions.getOne(id));
  }, []);
  const handleDeleteOnClick = () => {
    dispatch(
      appActions.openConfirmDialog(
        "Bạn có thực sự muốn xóa sản phẩm này khỏi trang web?",
        () => {
          dispatch(
            voucherActions.deleteOne(id, () => {
              navigate("/quan-ly/khuyen-mai");
            })
          );
        }
      )
    );
  };
  return (
    <>
      <div style={{ marginTop: "0px", position: "relative" }}>
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
        <div className="detail-voucher">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <img
                src={voucher.avtURL}
                alt="voucher thumbnail"
                height={"400px"}
              />
            </Grid>
            <Grid className="voucher-information" item xs={12} sm={6} md={6}>
              <h1>{voucher.name}</h1>
              <h2>Code: {voucher.code}</h2>
              <p>
                Giảm giá:{" "}
                {`${numberUtils.numberWithThousandSeperator(
                  voucher.amount || 0
                )} ${voucher.type === 1 ? "VNĐ" : "%"}`}
              </p>
              <p>
                Giới hạn:{" "}
                {`${numberUtils.numberWithThousandSeperator(
                  voucher.amount || 0
                )} VNĐ`}
              </p>
              <p>
                Còn lại:{" "}
                {`${voucher.quantity}/${
                  voucher.receipts?.length
                    ? voucher.quantity + voucher.receipts.length
                    : voucher.quantity
                } lượt sử dụng`}
              </p>

              {voucher.exp && <p>Hạn sử dụng: {`${voucher.exp}`}</p>}
              <p>
                Trạng thái:{" "}
                {`${voucher.isPublic ? "Công khai" : "Riêng tư"}, ${
                  voucher.isEnable ? "Đang kích hoạt" : "Tạm khóa"
                }, `}
              </p>
              <h2>Điều kiện sử dụng</h2>
              {voucher?.condition?.isFirstTime && (
                <p>{"Lần đầu sử dụng dịch vụ"}</p>
              )}
              {voucher?.condition?.productCount && (
                <p>
                  Số sản phẩm tối thiểu cho 1 hóa đơn:{" "}
                  {voucher.condition.productCount}
                </p>
              )}

              {voucher?.condition?.productCount && (
                <p>
                  Sử dụng cho đơn hàng có giá trị tối thiểu:{" "}
                  {numberUtils.numberWithThousandSeperator(
                    voucher?.condition?.productCount || 0
                  )}{" "}
                  VNĐ
                </p>
              )}
            </Grid>
          </Grid>
          <h2>Mô tả</h2>
          <p dangerouslySetInnerHTML={{ __html: voucher.description }}></p>
        </div>

        <div dangerouslySetInnerHTML={{ __html: voucher?.content || "" }}></div>
      </div>
    </>
  );
}

export default VoucherDetail;
