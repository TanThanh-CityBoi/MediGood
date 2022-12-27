import { voucherConstants } from "../constaint";
import { voucherServices } from "../services";

export const voucherActions = {
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

    voucherServices.getAll(params).then(
      (data) => dispatch(success(data["data"])),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: voucherConstants.GET_ALL_REQUEST };
  }
  function success(vouchers) {
    return { type: voucherConstants.GET_ALL_SUCCESS, vouchers };
  }
  function failure(error) {
    return { type: voucherConstants.GET_ALL_FAILURE, error };
  }
}

function getOne(id) {
  return (dispatch) => {
    dispatch(request());

    voucherServices.getOne(id).then(
      (data) => dispatch(success(data["data"])),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: voucherConstants.GET_ONE_REQUEST };
  }
  function success(voucher) {
    return { type: voucherConstants.GET_ONE_SUCCESS, voucher };
  }
  function failure(error) {
    return { type: voucherConstants.GET_ONE_FAILURE, error };
  }
}

function create(values, callback) {
  return (dispatch) => {
    dispatch(request());

    voucherServices.create(values).then(
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
    return { type: voucherConstants.GET_ONE_REQUEST };
  }
  function success(voucher) {
    return { type: voucherConstants.GET_ONE_SUCCESS, voucher };
  }
  function failure(error) {
    return { type: voucherConstants.GET_ONE_FAILURE, error };
  }
}

function update(values, callback) {
  return (dispatch) => {
    dispatch(request());

    voucherServices.update(values).then(
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
    return { type: voucherConstants.GET_ONE_REQUEST };
  }
  function success(voucher) {
    return { type: voucherConstants.GET_ONE_SUCCESS, voucher };
  }
  function failure(error) {
    return { type: voucherConstants.GET_ONE_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteOne(id, callback) {
  return (dispatch) => {
    dispatch(request(id));

    voucherServices.deleteOne(id).then(
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
    return { type: voucherConstants.DELETE_ONE_REQUEST, id };
  }
  function success(id) {
    return { type: voucherConstants.DELETE_ONE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: voucherConstants.DELETE_ONE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteMany(values) {
  return (dispatch) => {
    dispatch(request(values));

    voucherServices.deleteMany(values).then(
      (data) => dispatch(success(data["data"])),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: voucherConstants.DELETE_MANY_REQUEST, id };
  }
  function success(deleteCount) {
    return { type: voucherConstants.DELETE_MANY_SUCCESS, deleteCount };
  }
  function failure(error) {
    return { type: voucherConstants.DELETE_MANY_FAILURE, error };
  }
}
