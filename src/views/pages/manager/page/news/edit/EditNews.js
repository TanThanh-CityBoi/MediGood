import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { newsActions } from "../../../../../../actions";
import SingleNewsForm from "../component/SingleNewsForm";

function EditNews(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(newsActions.getOne(id));
  }, []);

  const news = useSelector((state) => state.newsReducer.news);
  const onSubmit = (values) => {
    dispatch(
      newsActions.update(values, () => {
        navigate(`/quan-ly/tin-tuc/${id}`);
      })
    );
  };
  return (
    <div>
      <h1 className="manager-page-title">Chỉnh sửa bài viết</h1>
      <SingleNewsForm news={news} onSubmit={onSubmit} />
    </div>
  );
}

export default EditNews;
