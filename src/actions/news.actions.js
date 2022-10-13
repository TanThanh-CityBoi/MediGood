import { newsConstants } from "../constaint";
import { newsServices } from "../services";

export const newsActions = {
  getAll,
  create,
  update,
  getOne,
  deleteOne,
  deleteMany,
};

function getAll(params) {
  return (dispatch) => {
    dispatch(request());

    newsServices.getAll(params).then(
      (data) => dispatch(success(data["data"])),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: newsConstants.GET_ALL_REQUEST };
  }
  function success(newsList) {
    return { type: newsConstants.GET_ALL_SUCCESS, newsList };
  }
  function failure(error) {
    return { type: newsConstants.GET_ALL_FAILURE, error };
  }
}

function getOne(id, callback, handleError) {
  return (dispatch) => {
    dispatch(request());

    newsServices.getOne(id).then(
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
    return { type: newsConstants.GET_ONE_REQUEST };
  }
  function success(news) {
    return { type: newsConstants.GET_ONE_SUCCESS, news };
  }
  function failure(error) {
    return { type: newsConstants.GET_ONE_FAILURE, error };
  }
}

function create(values, callback) {
  return (dispatch) => {
    dispatch(request());

    newsServices.create(values).then(
      (data) => {
        dispatch(success(data["data"]));
        if (callback instanceof Function) {
          callback(data["data"]);
        }
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: newsConstants.GET_ONE_REQUEST };
  }
  function success(news) {
    return { type: newsConstants.GET_ONE_SUCCESS, news };
  }
  function failure(error) {
    return { type: newsConstants.GET_ONE_FAILURE, error };
  }
}

function update(values, callback) {
  return (dispatch) => {
    dispatch(request());

    newsServices.update(values).then(
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
    return { type: newsConstants.GET_ONE_REQUEST };
  }
  function success(news) {
    return { type: newsConstants.GET_ONE_SUCCESS, news };
  }
  function failure(error) {
    return { type: newsConstants.GET_ONE_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteOne(id, callback) {
  return (dispatch) => {
    dispatch(request(id));

    newsServices.deleteOne(id).then(
      () => {
        dispatch(success(id));
        if (callback instanceof Function) {
          callback(id);
        }
      },
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: newsConstants.DELETE_ONE_REQUEST, id };
  }
  function success(id) {
    return { type: newsConstants.DELETE_ONE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: newsConstants.DELETE_ONE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteMany(values) {
  return (dispatch) => {
    dispatch(request(values));

    newsServices.deleteMany(values).then(
      (data) => dispatch(success(data["data"])),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: newsConstants.DELETE_MANY_REQUEST, id };
  }
  function success(deleteCount) {
    return { type: newsConstants.DELETE_MANY_SUCCESS, deleteCount };
  }
  function failure(error) {
    return { type: newsConstants.DELETE_MANY_FAILURE, error };
  }
}
