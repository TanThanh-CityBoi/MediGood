import { toastContants } from "../constaint/toast.contants";

const initialState = {
    message: '',
    typeToast: '',
    isShow: false,
};

export const toast = (state = initialState, action) => {
    switch (action.type) {
        case toastContants.SHOW_TOAST:
            return {
                ...state,
                message: action.message,
                typeToast: action.typeToast,
                isShow: true,
            }
        case toastContants.HIDE_TOAST:
            return {
                ...state,
                isShow: false,
            }
        default:
            return state;
    }
}
