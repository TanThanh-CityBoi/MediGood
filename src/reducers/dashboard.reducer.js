import { dashboardConstants } from "../constaint";
const initialState = {
  isLoading: false,
  error: false,
  generalData: {},
  timelyData: {},
};
export function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case dashboardConstants.GET_TIMELY_REPORT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case dashboardConstants.GET_TIMELY_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        timelyData: action.data,
        error: false,
      };
    case dashboardConstants.GET_TIMELY_REPORT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case dashboardConstants.GET_GENERAL_REPORT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case dashboardConstants.GET_GENERAL_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        generalData: action.data,
        error: false,
      };
    case dashboardConstants.GET_GENERAL_REPORT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
