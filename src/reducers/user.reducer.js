import { userConstants } from "../constaint"
import { cookiesUtil } from "../utilities"

const currentUser = cookiesUtil.getCurrentUser()
const initialState = currentUser
  ? {
      loading: false,
      isLoggedIn: true,
      logedUser: currentUser,
      user: undefined,
      productsInCart: [],
      userReceipts: []
    }
  : { loading: false, isLoggedIn: false, productsInCart: [] }
// logedUser lưu thông tin user đang đăng nhập, user lưu thông tin user đc get one về
export function userReducer(state = initialState, action) {
  // console.log("dispatch from authentication.reducer");
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      }
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        logedUser: action.logedUser,
        error: false
      }
    case userConstants.LOGOUT:
      //   window.location.reload(true);
      return {}
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: "Unregconize username or password"
      }

    case userConstants.GET_ALL_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case userConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.users,
        error: false
      }
    case userConstants.GET_ALL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case userConstants.GET_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case userConstants.GET_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.user,
        error: false
      }
    case userConstants.GET_ONE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case userConstants.GET_CURRENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case userConstants.GET_CURRENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        logedUser: action.user,
        error: false
      }
    case userConstants.GET_CURRENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case userConstants.DELETE_MANY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case userConstants.DELETE_MANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteCount: action.deleteCount,
        error: false
      }
    case userConstants.DELETE_MANY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case userConstants.ADD_TO_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case userConstants.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false
      }
    case userConstants.ADD_TO_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case userConstants.EDIT_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case userConstants.EDIT_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        logedUser: action.user,
        error: false
      }
    case userConstants.EDIT_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case userConstants.GET_PRODUCTS_IN_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case userConstants.GET_PRODUCTS_IN_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productsInCart: action.products,
        error: false
      }
    case userConstants.GET_PRODUCTS_IN_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false
      }
    case userConstants.UPDATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case userConstants.GET_RECEIPTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case userConstants.GET_RECEIPTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userReceipts: action.receipts,
        error: false
      }
    case userConstants.GET_RECEIPTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}
