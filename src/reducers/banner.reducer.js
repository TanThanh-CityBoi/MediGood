import { bannerConstants } from "../constaint";
const initialState = {
  isLoading: false,
  error: false,
  banners: [],
  banner: {},
  deleteCount: 0,
};
export function bannerReducer(state = initialState, action) {
  switch (action.type) {
    case bannerConstants.GET_ALL_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case bannerConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        banners: action.banners,
        error: false,
      };
    case bannerConstants.GET_ALL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case bannerConstants.GET_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case bannerConstants.GET_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        banner: action.banner,
        error: false,
      };
    case bannerConstants.GET_ONE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case bannerConstants.DELETE_MANY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case bannerConstants.DELETE_MANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteCount: action.deleteCount,
        error: false,
      };
    case bannerConstants.DELETE_MANY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
