import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userActions } from "../../../../../../actions";
import SingleUserForm from "../component/SingleUserForm";

function EditUser(props) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector((state) => state.userReducer.user);
  useEffect(() => {
    dispatch(userActions.getOne(id));
  }, []);
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(
      userActions.update(values, () => {
        navigate("/quan-ly/nguoi-dung");
      })
    );
  };
  return (
    <div>
      <h1 className="manager-page-title">Chỉnh sửa User</h1>
      <SingleUserForm user={user} onSubmit={onSubmit} />
    </div>
  );
}

export default EditUser;
