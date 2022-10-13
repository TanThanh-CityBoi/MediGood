import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { ProductComponent } from "../../../component/product-component/ProductComponent";
import { PaginationCustom } from "../../../component/PaginationCustom";
import "./SpecialProductList.scss";

function SpecialProductList(props) {
  const products = props.products;
  const [currentPage, setCurrentPage] = useState(1);
  const elementPerPage = 10;
  const [sortProduct, setSortProduct] = useState("name");
  const isLoading = useSelector((state) => state.productReducer.isLoading);

  if (products.length > 0) {
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
  }
  const productsInPage = products.slice(
    (currentPage - 1) * elementPerPage,
    currentPage * elementPerPage
  );

  return isLoading ? (
    <h1 style={{ marginTop: "12rem" }}>Loading............</h1>
  ) : (
    <Container className="product-list-wrapper">
      <Container className="product-list-header-wrapper">
        <div className="product-list-header">
          <div className="product-sort">
            <label>Sắp xếp theo: </label>
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

export { SpecialProductList };
