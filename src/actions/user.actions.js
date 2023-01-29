import { appActions } from ".";
import { userConstants } from "../constaint";
import { usersServices } from "../services";
import { cookiesUtil } from "../utilities";

export const userActions = {
  login,
  logout,
  register,
  getAll,
  getOne,
  getCurrent,
  delete: _delete,
  update,
  create,
  deleteMany,
  addToCart,
  editCart,
  getProductsInCart,
  getUserReceipt,
};

/// này là hàm login
function login(email, password, callback) {
  return (dispatch) => {
    dispatch(request());
    usersServices.login(email, password).then(
      (user) => {
        console.log("login successfully", user);
        cookiesUtil.setAccessToken(user.token);
        cookiesUtil.setCurrentUser({ ...user.user, address: [] });

        dispatch(success(user.user));
        if (callback) {
          callback();
        }
      },
      (error) => {

        dispatch(appActions.showFailToast('Đăng nhập không thành công, vui lòng thử lại.'));
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.LOGIN_REQUEST };
  }
  function success(logedUser) {
    return { type: userConstants.LOGIN_SUCCESS, logedUser };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error};
  }
}

function create(values, callback) {
  return (dispatch) => {
    dispatch(request());

    usersServices.create(values).then(
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
    return { type: userConstants.GET_ONE_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GET_ONE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GET_ONE_FAILURE, error };
  }
}

function logout(callback) {
  return (dispatch) => {
    usersServices.logout();
    cookiesUtil.remove("_JWT__");
    cookiesUtil.remove("_USR__");
    dispatch(success());
    if (callback instanceof Function) {
      callback();
    }
  };
  function success() {
    return { type: userConstants.LOGOUT };
  }
}

function register(user, callback) {
  return (dispatch) => {
    // dispatch(request(user));

    usersServices.register(user).then(
      (data) => {
        // dispatch(success());
        // history.push('/login');
        // dispatch(alertActions.success('Registration successful'));
        dispatch(appActions.showSuccessToast("Đăng ký thành công"));
        if (callback instanceof Function) {
          callback();
        }
      },
      (error) => {
        // dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
        dispatch(appActions.showFailToast("Đăng ký thất bại"));
      }
    );
  };

  /*   function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  } */
}

function getOne(id) {
  return (dispatch) => {
    dispatch(request());

    usersServices.getOne(id).then(
      (data) => dispatch(success(data["data"])),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GET_ONE_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GET_ONE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GET_ONE_FAILURE, error };
  }
}

function getCurrent() {
  return (dispatch) => {
    dispatch(request());

    usersServices.getCurrent().then(
      (data) => dispatch(success(data["data"][0])),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GET_CURRENT_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GET_CURRENT_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GET_CURRENT_FAILURE, error };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    usersServices.getAll().then(
      (users) => dispatch(success(users["data"])),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GET_ALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GET_ALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GET_ALL_FAILURE, error };
  }
}

function update(values, callback) {
  return (dispatch) => {
    dispatch(request());

    usersServices.update(values).then(
      () => {
        dispatch(success());
        dispatch(userActions.getCurrent());
        if (callback) {
          callback();
        }
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.UPDATE_REQUEST };
  }
  function success() {
    return { type: userConstants.UPDATE_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    usersServices.delete(id).then(
      () => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}

function deleteMany(values) {
  return (dispatch) => {
    dispatch(request(values));

    usersServices.deleteMany(values).then(
      (data) => dispatch(success(data["data"])),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_MANY_REQUEST, id };
  }
  function success(deleteCount) {
    return { type: userConstants.DELETE_MANY_SUCCESS, deleteCount };
  }
  function failure(error) {
    return { type: userConstants.DELETE_MANY_FAILURE, error };
  }
}

function addToCart(value) {
  return (dispatch) => {
    if (!cookiesUtil.getAccessToken()) {
      if (cookiesUtil.getProductCart()) {
        var productExist = -1;
        const cart = cookiesUtil.getProductCart();

        cart.forEach((element, idx) => {
          if (element.product === value.product) {
            productExist = idx;
          }
        });
        if (productExist > -1) {
          const newCart = [
            ...cart.slice(0, productExist),
            {
              product: value.product,
              quantity: value.quantity + cart[productExist].quantity,
            },
            ...cart.slice(productExist + 1),
          ];
          cookiesUtil.setProductCart(JSON.stringify(newCart));
          dispatch(
            appActions.showSuccessToast(
              "Thêm sản phẩm vào giỏ hàng thành công! Sản phẩm đã tồn tại."
            )
          );
        } else {
          const newCart = [...cart];
          newCart.push(value);
          cookiesUtil.setProductCart(JSON.stringify(newCart));
          dispatch(appActions.showSuccessToast("Thêm vào giỏ hàng thành công"));
        }
      } else {
        cookiesUtil.setProductCart(JSON.stringify([value]));
        dispatch(appActions.showSuccessToast("Thêm vào giỏ hàng thành công"));
      }
    } else {
      dispatch(request());
      usersServices.addToCart(value).then(
        () => {
          dispatch(success());
          dispatch(appActions.showSuccessToast("Thêm vào giỏ hàng thành công"));
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(appActions.showFailToast('Đã có lỗi xảy ra, vui lòng kiểm tra lại'));
        }
      );
    }
  };

  function request() {
    return { type: userConstants.ADD_TO_CART_REQUEST };
  }
  function success() {
    return { type: userConstants.ADD_TO_CART_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.ADD_TO_CART_FAILURE, error };
  }
}

function editCart(value) {
  return (dispatch) => {
    if (!cookiesUtil.getAccessToken()) {
      if (cookiesUtil.getProductCart()) {
        var productExist = -1;
        const cart = cookiesUtil.getProductCart();
        console.log("pre cart: ", cart);

        cart.forEach((element, idx) => {
          if (element.product === value.product) {
            productExist = idx;
          }
        });
        if (productExist > -1) {
          if (value.quantity > 0) {
            const newCart = [
              ...cart.slice(0, productExist),
              value,
              ...cart.slice(productExist + 1),
            ];
            cookiesUtil.setProductCart(JSON.stringify(newCart));
            dispatch(userActions.getProductsInCart());
            // alert("edit cart successfully, quantity: " + value.quantity);
          } else {
            const newCart = [
              ...cart.slice(0, productExist),
              ...cart.slice(productExist + 1),
            ];
            cookiesUtil.setProductCart(JSON.stringify(newCart));
            dispatch(userActions.getProductsInCart());
            dispatch(appActions.showSuccessToast("Xóa thành công"));
          }
        }
      }
    } else {
      dispatch(request);
      usersServices.editCart(value).then(
        (data) => {
          dispatch(success(data.user));
          dispatch(userActions.getProductsInCart());
          //alert("edit user cart succesfully: quantity " + value.quantity);
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(
            appActions.showSuccessToast("Đã xảy ra lỗi:" + error.toString())
          );
        }
      );
    }
  };

  function request() {
    return { type: userConstants.EDIT_CART_REQUEST };
  }
  function success(user) {
    return { type: userConstants.EDIT_CART_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.EDIT_CART_FAILURE, error };
  }
}

function getProductsInCart() {
  return (dispatch) => {
    dispatch(request());

    if (!cookiesUtil.getAccessToken()) {
      if (
        cookiesUtil.getProductCart() &&
        cookiesUtil.getProductCart().length > 0
      ) {
        const cart = cookiesUtil.getProductCart();
        usersServices.getProductsInCart(cart).then(
          (data) => {
            dispatch(success(data["data"]));
            console.log("response data get prduct incart: ", data);
          },
          (error) => {
            dispatch(failure(error));
          }
        );
      } else {
        dispatch(success([]));
      }
    } else {
      usersServices.getCurrent().then(
        (data) => {
          if (data["data"][0].cart && data["data"][0].cart.length > 0) {
            const cart = data["data"][0].cart;
            usersServices.getProductsInCart(cart).then(
              (data) => {
                dispatch(success(data["data"]));
                console.log("response data get prduct incart: ", data);
              },
              (error) => {
                dispatch(failure(error));
              }
            );
          } else {
            dispatch(success([]));
          }
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: userConstants.GET_PRODUCTS_IN_CART_REQUEST };
  }
  function success(products) {
    return { type: userConstants.GET_PRODUCTS_IN_CART_SUCCESS, products };
  }
  function failure(error) {
    return { type: userConstants.GET_PRODUCTS_IN_CART_FAILURE, error };
  }
}

function getUserReceipt() {
  return (dispatch) => {
    dispatch(request());
    usersServices.getUserReceipt().then(
      (data) => {
        dispatch(success(data["data"]));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: userConstants.GET_RECEIPTS_REQUEST };
  }
  function success(receipts) {
    return { type: userConstants.GET_RECEIPTS_SUCCESS, receipts };
  }
  function failure(error) {
    return { type: userConstants.GET_RECEIPTS_FAILURE, error };
  }
}
