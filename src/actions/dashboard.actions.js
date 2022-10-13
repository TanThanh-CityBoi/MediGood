import { dashboardConstants } from "../constaint";
import { dashboardService } from "../services";

export const dashboardActions = {
  getTimelyReport,
  getGeneralReport,
};

function getTimelyReport(params) {
  return (dispatch) => {
    dispatch(request());

    dashboardService.getTimelyReport(params).then(
      (data) => dispatch(success(data["data"])),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: dashboardConstants.GET_TIMELY_REPORT_REQUEST };
  }
  function success(data) {
    return { type: dashboardConstants.GET_TIMELY_REPORT_SUCCESS, data };
  }
  function failure(error) {
    return { type: dashboardConstants.GET_TIMELY_REPORT_FAILURE, error };
  }
}

function getGeneralReport(values, callback) {
  return (dispatch) => {
    dispatch(request());

    dashboardService.getGeneralReport(values).then(
      (data) => {
        dispatch(success(data["data"]));
        if (callback instanceof Function) {
          callback(data.data);
        }
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: dashboardConstants.GET_GENERAL_REPORT_REQUEST };
  }
  function success(data) {
    return { type: dashboardConstants.GET_GENERAL_REPORT_SUCCESS, data };
  }
  function failure(error) {
    return { type: dashboardConstants.GET_GENERAL_REPORT_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
