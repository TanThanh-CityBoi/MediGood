import { voucherConstants } from "../constaint";
const initialState = {
  isLoading: false,
  error: false,
  vouchers: [],
  voucher: {},
  deleteCount: 0,
};
export function voucherReducer(state = initialState, action) {
  switch (action.type) {
    case voucherConstants.GET_ALL_REQUEST:
      return {
        isLoading: true,
        error: false,
      };
    case voucherConstants.GET_ALL_SUCCESS:
      return {
        isLoading: false,
        vouchers: action.vouchers,
        error: false,
      };
    case voucherConstants.GET_ALL_FAILURE:
      return {
        isLoading: false,
        error: action.error,
      };

    case voucherConstants.GET_ONE_REQUEST:
      return {
        isLoading: true,
        error: false,
      };
    case voucherConstants.GET_ONE_SUCCESS:
      return {
        isLoading: false,
        voucher: action.voucher,
        error: false,
      };
    case voucherConstants.GET_ONE_FAILURE:
      return {
        isLoading: false,
        error: action.error,
      };

    case voucherConstants.DELETE_MANY_REQUEST:
      return {
        isLoading: true,
        error: false,
      };
    case voucherConstants.DELETE_MANY_SUCCESS:
      return {
        isLoading: false,
        deleteCount: action.deleteCount,
        error: false,
      };
    case voucherConstants.DELETE_MANY_FAILURE:
      return {
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
