import { newsConstants } from "../constaint";
const initialState = {
  isLoading: false,
  error: false,
  newsList: [],
  news: {},
  deleteCount: 0,
};
export function newsReducer(state = initialState, action) {
  switch (action.type) {
    case newsConstants.GET_ALL_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case newsConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        newsList: action.newsList,
        error: false,
      };
    case newsConstants.GET_ALL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case newsConstants.GET_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case newsConstants.GET_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        news: action.news,
        error: false,
      };
    case newsConstants.GET_ONE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case newsConstants.DELETE_MANY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case newsConstants.DELETE_MANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteCount: action.deleteCount,
        error: false,
      };
    case newsConstants.DELETE_MANY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
