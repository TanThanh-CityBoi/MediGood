import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Banner } from "../../component/BannerProduct";
import "./Search.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  bannerActions,
  newsActions,
  productActions,
  voucherActions,
} from "../../../actions";
import SliderComponent from "../../component/SliderComponent/SliderComponent";
import { useSearchParams } from "react-router-dom";
import { Breadcrumb } from "../../component/Breadcrumb";
import { ProductComponent } from "../../component/product-component/ProductComponent";
import { PaginationCustom } from "../../component/PaginationCustom";

const Search = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const elementPerPage = 8;
  const [searchParams, setSearchParams] = useSearchParams();

  var products = useSelector((state) => state.productReducer.products) || [];

  useEffect(() => {
    if (products.length === 0) {
      dispatch(productActions.getAll());
    }
  }, []);
  const dataBread = [
    {
      name: "Tìm kiếm",
      link: "/gio-hang",
    },
  ];
  
  console.log({products})
  products = products?.filter((item) =>
    item.name.toUpperCase().includes(searchParams.get("key").toUpperCase())
  );


  const productsInPage = products.slice(
    (currentPage - 1) * elementPerPage,
    currentPage * elementPerPage
  );

  const [category, setCategory] = useState(0);

  return (
    <Container className="search-wrapper">
      <Banner url="https://cdn-images.zety.com/pages/pharmacist_cover_letter_example_4.jpg" />

      <Breadcrumb
        style={{
          marginLeft: "-20px",
        }}
        data={dataBread}
      />
      <h1 className="search-title">
        Kết quả tìm kiếm cho {`"${searchParams.get("key")}"`}
      </h1>

      <div
        style={{
          marginTop: "12px",
        }}
        className="product-list-header"
      >
        <div className="product-sort">
          <label>Sắp xếp theo: </label>
          <select
            onChange={(e) => {
              // setSortProduct(e.target.value);
              // setCurrentPage(1);
            }}
          >
            <option value={"name"}>Tên A-Z</option>
            {category === 0 && (
              <option value={"cheapest"}>Giá thấp nhất</option>
            )}
            {category === 0 && (
              <option value={"mostExpensive"}>Giá cao nhất</option>
            )}
            {category === 0 && <option value={"sales"}>Bán chạy nhất</option>}
            <option value={"newest"}>Mới nhất</option>
            <option value={"oldest"}>Cũ nhất</option>
          </select>
        </div>

        <div className="result-filter">
          <p>
            Tìm được <b>{products.length}</b> kết quả
          </p>
        </div>
      </div>

      {productsInPage.length > 0 && (
        <Container className="product-list">
          <Row
            style={{
              width: "100%",
            }}
          >
            {Array.from({ length: productsInPage.length }).map((_, idx) => (
              <Col xs={6} sm={4} md={3} lg={2} key={idx} className="py-3">
                <ProductComponent product={productsInPage[idx]} />
              </Col>
            ))}
          </Row>
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
};

export default Search;
