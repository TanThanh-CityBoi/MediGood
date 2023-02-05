import { toastContants } from "../constaint/toast.contants";

export const appActions = {
  openConfirmDialog,
  showSuccessToast,
  showFailToast,
  hideToast,
};

function openConfirmDialog(content, action) {
  return (dispatch) => {
    console.log("opem dialog");
    dispatch({
      type: "set",
      confirmActionModal: {
        open: true,
        content,
        action,
      },
    });
  };
}

function showSuccessToast(message) {
  return (dispatch) => {
    dispatch({
      type: toastContants.SHOW_TOAST,
      typeToast: "success",
      message,
    });
  };
}

function showFailToast(message) {
  return (dispatch) => {
    console.log('show fail toast here')
    dispatch({
      type: toastContants.SHOW_TOAST,
      typeToast: "fail",
      message,
    });
  };
}

function hideToast() {
  return (dispatch) => {
    dispatch({
      type: toastContants.HIDE_TOAST,
    });
  };
}
