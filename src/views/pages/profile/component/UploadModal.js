import React, { useState } from "react";
import { Button, Modal, Box, Avatar } from "@mui/material";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { appActions, userActions } from "../../../../actions";
import "./UploadModal.scss";

import { firebaseStorageServices } from "../../../../services/firebaseStorage.services";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50rem",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

function UploadModal(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.logedUser) || {};
  const [open, setOpen] = React.useState(false);
  const [upProg, setUpProg] = useState(0);
  const [imgUrl, setImgUrl] = useState(props.avatar);
  const [file, setFile] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setFile(null);
      setImgUrl(props.avatar);
      setOpen(false);
    }
  };

  const handleChange = (e) => {
    const fileSelected = e.target.files[0];
    if (typeof fileSelected === "undefined") {
      setImgUrl(props.avatar);
      setFile(null);
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
      };
      if (fileSelected.type.match(/image.*/)) {
        setFile(e.target.files[0]);
        reader.readAsDataURL(fileSelected);
      } else {
        alert("fail", "Tệp được chọn phải là tệp hình ảnh!");
      }
    }
  };

  const handleSnapshot = (snapshot) => {
    const prog =
      Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUpProg(prog);
  };
  const handleError = (error) => {
    dispatch(appActions.showFailToast(error));
  };
  const handleSuccess = () => {
    dispatch(appActions.showSuccessToast("Đổi avatar thành công"));
  };
  const handleUrlRespone = (URL) => {
    console.log("urllllllllll", URL);
    const newInfo = {
      ...currentUser,
      avatar: URL,
    };

    dispatch(userActions.update(newInfo, handleSuccess));
  };
  const handleUpload = () => {
    firebaseStorageServices.uploadFileToFirebase(
      file,
      "file",
      handleSnapshot,
      handleError,
      handleUrlRespone
    );
  };

  return (
    <>
      <Button className="btn-changeAvt" onClick={() => handleOpen()}>
        {" "}
        <MdOutlinePhotoCamera></MdOutlinePhotoCamera>{" "}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={"upload-avatar__modal"}
      >
        <Box sx={style} className="modal-box">
          <div className="exit-btn">
            <button onClick={handleClose}>
              <GrClose />
            </button>
          </div>
          <h1>Uploaded: {upProg}%</h1>
          <div id="modal-modal-description" className="preview-img__box">
            <Avatar
              alt="Remy Sharp"
              src={imgUrl}
              sx={{ width: 350, height: 350 }}
            />
          </div>
          <div id="modal-modal-description" className="input-img__group">
            <input type="file" onChange={handleChange} />
            <button onClick={() => handleUpload()} className="btn-submit">
              Cập nhật
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
export { UploadModal };
