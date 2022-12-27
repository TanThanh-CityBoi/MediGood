import { productConstants } from "../constaint";
const initialState = {
  isLoading: false,
  error: false,
  products: [],
  product: {},
  deleteCount: 0,
};
export function productReducer(state = initialState, action) {
  switch (action.type) {
    case productConstants.GET_ALL_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case productConstants.GET_ALL_SUCCESS:
      console.log(action.products, action);
      return {
        ...state,
        isLoading: false,
        products: action.products,
        error: false,
      };
    case productConstants.GET_ALL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

      case productConstants.GET_LIST_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: false,
        };
      case productConstants.GET_LIST_SUCCESS:
        console.log(action.products, action);
        return {
          ...state,
          isLoading: false,
          products: action.products,
          error: false,
        };
      case productConstants.GET_LIST_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.error,
        };

    case productConstants.GET_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case productConstants.GET_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.product,
        error: false,
      };
    case productConstants.GET_ONE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case productConstants.DELETE_MANY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case productConstants.DELETE_MANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteCount: action.deleteCount,
        error: false,
      };
    case productConstants.DELETE_MANY_FAILURE:
      return {
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
