import { receiptConstants } from "../constaint";
const initialState = {
  isLoading: false,
  error: false,
  receipts: [],
  receipt: {},
  receiptProduct: [],
  deleteCount: 0,
};
export function receiptReducer(state = initialState, action) {
  switch (action.type) {
    case receiptConstants.GET_ALL_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case receiptConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        receipts: action.receipts,
        error: false,
      };
    case receiptConstants.GET_ALL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case receiptConstants.GET_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case receiptConstants.GET_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        receipt: action.receipt,
        error: false,
      };
    case receiptConstants.GET_ONE_FAILURE:
      return {
        ...state,
        isLoading: false,
        receipt: {},
        error: action.error,
      };

    case receiptConstants.DELETE_MANY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case receiptConstants.DELETE_MANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteCount: action.deleteCount,
        error: false,
      };
    case receiptConstants.DELETE_MANY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case receiptConstants.CREATE_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case receiptConstants.CREATE_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
      };
    case receiptConstants.CREATE_ONE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
