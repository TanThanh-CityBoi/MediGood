import { bannerConstants } from "../constaint";
import { bannerServices } from "../services";

export const bannerActions = {
  getAll,
  update,
  getOne,
};

function getAll(params) {
  return (dispatch) => {
    dispatch(request());

    bannerServices.getAll(params).then(
      (data) => dispatch(success(data["data"])),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: bannerConstants.GET_ALL_REQUEST };
  }
  function success(banners) {
    return { type: bannerConstants.GET_ALL_SUCCESS, banners };
  }
  function failure(error) {
    return { type: bannerConstants.GET_ALL_FAILURE, error };
  }
}

function getOne(id, callback, handleError) {
  return (dispatch) => {
    dispatch(request());

    bannerServices.getOne(id).then(
      (data) => {
        dispatch(success(data["data"]));
        if (callback instanceof Function) {
          callback(data["data"]);
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        if (handleError instanceof Function) {
          handleError(error);
        }
        console.log("get error", error.toString());
      }
    );
  };

  function request() {
    return { type: bannerConstants.GET_ONE_REQUEST };
  }
  function success(banner) {
    return { type: bannerConstants.GET_ONE_SUCCESS, banner };
  }
  function failure(error) {
    return { type: bannerConstants.GET_ONE_FAILURE, error };
  }
}

function update(values, callback) {
  return (dispatch) => {
    dispatch(request());

    bannerServices.update(values).then(
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
    return { type: bannerConstants.GET_ONE_REQUEST };
  }
  function success(banner) {
    return { type: bannerConstants.GET_ONE_SUCCESS, banner };
  }
  function failure(error) {
    return { type: bannerConstants.GET_ONE_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
