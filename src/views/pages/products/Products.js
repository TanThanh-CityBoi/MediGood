import "./Products.scss";
import React, { useEffect } from "react";
import { bannerActions } from "../../../actions";
import { ProductList } from "./component/ProductList";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Banner } from "../../component/BannerProduct";
import { FilterComponent } from "./component/FilterComponent";
import { SuggestProduct } from "../../component/SuggestProduct";
import SliderComponent from "../../component/SliderComponent/SliderComponent";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products) || [];
  const banners = useSelector((state) => state.bannerReducer.banners);
  useEffect(() => {
    if (banners.length === 0) dispatch(bannerActions.getAll());
  }, []);

  return (
    <Container className="products-wrapper">
      {banners.length > 0 && banners[1].slides.length > 0 ? (
        <SliderComponent slides={banners[1].slides} />
      ) : (
        <Banner url="https://cdn-images.zety.com/pages/pharmacist_cover_letter_example_4.jpg" />
      )}
      <div className="product-list-group">
        <Row className="product-list-group_row">
          <Col xs={12} xxl={3} className="product__filter-group">
            <FilterComponent />
          </Col>
          <Col xs={12} xxl={9} className="product__list-group">
            <ProductList products={products} />
          </Col>
        </Row>
      </div>

      <div className="suggest-product">
        <SuggestProduct />
      </div>
    </Container>
  );
};

export default Products;
