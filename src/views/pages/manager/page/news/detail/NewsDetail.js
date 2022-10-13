import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { appActions, newsActions } from "../../../../../../actions";

function NewsDetail(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleEditOnClick = () => {
    navigate(`/quan-ly/tin-tuc/edit/${id}`);
  };
  const news = useSelector((state) => state.newsReducer.news);
  useEffect(() => {
    dispatch(newsActions.getOne(id));
  }, []);
  const handleDeleteOnClick = () => {
    dispatch(
      appActions.openConfirmDialog(
        "Bạn có thực sự muốn xóa sản phẩm này khỏi trang web?",
        () => {
          dispatch(
            newsActions.deleteOne(id, () => {
              navigate("/quan-ly/tin-tuc");
            })
          );
        }
      )
    );
  };
  return (
    <>
      <div style={{ marginTop: "80px", position: "relative" }}>
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
        <div dangerouslySetInnerHTML={{ __html: news?.content || "" }}></div>
      </div>
    </>
  );
}

export default NewsDetail;
