import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../../../../../actions";
import SingleUserForm from "../component/SingleUserForm";

function NewUser(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(
      userActions.create(values, () => {
        navigate("/quan-ly/nguoi-dung");
      })
    );
  };
  return (
    <div>
      <h1 className="manager-page-title">Thêm User</h1>
      <SingleUserForm onSubmit={onSubmit} />
    </div>
  );
}

export default NewUser;
