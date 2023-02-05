import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { productServices } from "../../services";
import SliderProduct from "./SliderProducts";
import "./SuggestProduct.scss";

function SuggestProduct({ productId }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    productServices
      .getListRecommendProduct({ id: productId, quantity: 8 })
      .then((data) => {
        setProducts(data.listProduct);
      });
  }, []);

  return (
    <div className="suggest-product-wrapper">
      <Container>
        <h1>Đề xuất cho bạn</h1>
      </Container>
      <div className="slider-product">
        <SliderProduct products={products} />
      </div>
    </div>
  );
}

export { SuggestProduct };
