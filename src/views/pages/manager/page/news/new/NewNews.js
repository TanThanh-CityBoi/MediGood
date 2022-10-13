import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newsActions } from "../../../../../../actions";
import SingleNewsForm from "../component/SingleNewsForm";

function NewNews(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(
      newsActions.create(values, () => {
        navigate("/quan-ly/tin-tuc");
      })
    );
  };
  return (
    <div>
      <h1 className="manager-page-title">Thêm bài viết</h1>
      <SingleNewsForm onSubmit={onSubmit} />
    </div>
  );
}

export default NewNews;
