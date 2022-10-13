import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Banner } from "../../component/BannerProduct";
import { SuggestProduct } from "../../component/SuggestProduct";
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
  const banners = useSelector((state) => state.bannerReducer.banners) || [];
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const elementPerPage = 8;
  const [searchParams, setSearchParams] = useSearchParams();

  var products = useSelector((state) => state.productReducer.products) || [];

  const newsList = useSelector((state) => state.newsReducer.newsList) || [];
  const vouchers = useSelector((state) => state.newsReducer.vouchers) || [];
  useEffect(() => {
    if (banners.length === 0) {
      dispatch(bannerActions.getAll());
    }
    if (products.length === 0) {
      dispatch(productActions.getAll());
    }
    if (newsList.length === 0) {
      dispatch(newsActions.getAll());
    }

    if (vouchers.length === 0) {
      dispatch(voucherActions.getAll());
    }
  }, []);
  const dataBread = [
    {
      name: "Tìm kiếm",
      link: "/gio-hang",
    },
  ];

  products = products?.filter((item) =>
    item.name.includes(searchParams.get("key"))
  );

  const productsInPage = products.slice(
    (currentPage - 1) * elementPerPage,
    currentPage * elementPerPage
  );

  const newsInPage = newsList?.slice(
    (currentPage - 1) * elementPerPage,
    currentPage * elementPerPage
  );

  const vouchersInPage = vouchers?.slice(
    (currentPage - 1) * elementPerPage,
    currentPage * elementPerPage
  );

  const [currentTab, setCurrentTab] = useState(1);
  const [category, setCategory] = useState(0);

  return (
    <Container className="search-wrapper">
      {banners.length > 0 && banners[3].slides.length > 0 ? (
        <SliderComponent slides={banners[3].slides} />
      ) : (
        <Banner url="https://res.cloudinary.com/tanthanh0805/image/upload/v1645178807/LuxyWine/Banner_fxehr3.png" />
      )}
      <Breadcrumb
        style={{
          marginLeft: "-20px",
        }}
        data={dataBread}
      />
      <h1 className="search-title">
        Kết quả tìm kiếm cho {`"${searchParams.get("key")}"`}
      </h1>
      <span
        style={{
          display: "inline-block",
          marginRight: "12px",
        }}
        onClick={() => setCategory(0)}
        className={category === 0 ? "lw-btn" : "lw-outline-btn"}
      >
        Sản phẩm
      </span>

      <span
        style={{
          display: "inline-block",
          marginRight: "12px",
        }}
        onClick={() => setCategory(1)}
        className={category === 1 ? "lw-btn" : "lw-outline-btn"}
      >
        Tin tức
      </span>

      <span
        style={{
          display: "inline-block",
          marginRight: "12px",
        }}
        onClick={() => setCategory(2)}
        className={category === 2 ? "lw-btn" : "lw-outline-btn"}
      >
        Voucher
      </span>

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
            Tìm được <b>{100}</b> kết quả
          </p>
        </div>
      </div>

      {category === 0 && productsInPage.length > 0 && (
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
