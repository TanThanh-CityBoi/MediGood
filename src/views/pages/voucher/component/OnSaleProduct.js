import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../../../actions/product.actions";
import { ProductComponent } from "../../../component/product-component/ProductComponent";
import { PaginationCustom } from "../../../component/PaginationCustom";
import { Container } from "react-bootstrap";
import "./OnSaleProduct.scss";

function OnSaleProducts(props) {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.productReducer.products) || [];
  const isLoading = useSelector((state) => state.productReducer.isLoading);
  const [currentPage, setCurrentPage] = useState(1);
  const elementPerPage = 10;
  const [sortProduct, setSortProduct] = useState("name");
  useEffect(() => {
    dispatch(productActions.getListSpecialProduct());
  }, []);
  var products = [];

  list.forEach((element) => {
    if (element.price < element.originPrice) products.push(element);
  });

  switch (sortProduct) {
    case "name":
      products.sort(function (a, b) {
        return (
          a.name.toLowerCase().charCodeAt(0) -
          b.name.toLowerCase().charCodeAt(0)
        );
      });
      break;
    case "cheapest":
      products.sort(function (a, b) {
        return a.price - b.price;
      });
      break;
    case "mostExpensive":
      products.sort(function (a, b) {
        return b.price - a.price;
      });
      break;
    case "salest":
      products.sort(function (a, b) {
        return a.hasSold - b.hasSold;
      });
      break;
    case "newest":
      products.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      break;
    default:
      break;
  }

  const productsInPage = products.slice(
    (currentPage - 1) * elementPerPage,
    currentPage * elementPerPage
  );

  return isLoading ? (
    <h1 style={{ fontSize: "1.8rem", marginTop: "12rem" }}>
      Loading............
    </h1>
  ) : (
    <Container className="product-list-wrapper">
      <h1 className="title-on-sale">Sản phẩm đang khuyến mãi</h1>
      <Container className="product-list-header-wrapper">
        <div className="product-list-header">
          <div className="product-sort">
            <label>Sấp xếp theo: </label>
            <select
              onChange={(e) => {
                setSortProduct(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value={"name"}>Tên A-Z</option>
              <option value={"cheapest"}>Giá thấp nhất</option>
              <option value={"mostExpensive"}>Giá cao nhất</option>
              <option value={"sales"}>Bán chạy nhất</option>
              <option value={"newest"}>Mới nhất</option>
            </select>
          </div>

          <div className="result-filter">
            <p>
              Tìm được <b>{products.length}</b> sản phẩm
            </p>
          </div>
        </div>
      </Container>

      {products.length > 0 && (
        <Container className="product-list">
          {Array.from({ length: productsInPage.length }).map((_, idx) => (
            <div key={idx} className="py-3 px-3">
              <ProductComponent product={productsInPage[idx]} />
            </div>
          ))}
          <div className="product-list-footer">
            <PaginationCustom
              numberOfElement={products.length}
              elementPerPage={elementPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </Container>
      )}
    </Container>
  );
}

export { OnSaleProducts };
