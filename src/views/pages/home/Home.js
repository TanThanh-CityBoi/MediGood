import "./Home.scss";
import { IoStar } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "react-horizontal-scrolling";
import { 
  Carousel, 
  Container, 
  Button, 
  Card, 
  Row, 
  Col 
} from "react-bootstrap";
import { ProductComponent } from "../../component/product-component/ProductComponent";
import SliderComponent from "../../component/SliderComponent/SliderComponent";
import { productServices } from "../../../services";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    productServices.getList().then((data) => {
      setProducts(data.data.sort((a, b) => a.price > b.price));
    });
  }, []);
  const banners = useSelector((state) => state.bannerReducer.banners) || [];
  return (
    <>
      <Container className="Home-page">
        {banners.length > 0 && banners[0].slides.length > 0 ? (
          <div className="carousel-wrapper" style={{ height: "90rem" }}>
            <SliderComponent slides={banners[0].slides} />
          </div>
        ) : (
          <Slider />
        )}
        <Slogan />
        <Product />
        <AboutUs />
        <CustomerReview />
        <Map />
      </Container>
    </>
  );

  function Slider() {
    return (
      <Row className="slider">
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://khn.org/wp-content/uploads/sites/2/2021/12/Muldrow__013.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <div className="carousel-content">
                <h1>Medi-Good</h1>
                <p>Chuyên gia cung cấp dược phẩm</p>
                <Button variant="light">MUA NGAY</Button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.rightathome.net/-/media/images/blog/2022/october/pharmacist-helping-senior-in-store.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <div className="carousel-content">
                <h1>Chuyên cung cấp các loại thuốc, sản phẩm y tế</h1>
                <p>Luôn đi kèm với sự uy tín và chất lượng, thương hiệu tạo nên sự khác biệt.</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://globalnews.ca/wp-content/uploads/2018/03/drugs.jpg?quality=85&strip=all"
              alt="Third slide"
            />

            <Carousel.Caption>
              <div className="carousel-content">
                <h1>Thuốc là bạn của mọi nhà</h1>
                <p>
                  Phải trải qua cả 1 quá trình dài, con người mới đạt được những thành tựu to lớn về dược học, thuốc.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Row>
    );
  }

  function Slogan() {
    return (
      <div className="slogan">
        <h3>Medicine</h3>
        <p className="para-1">
          "Medicine is one of the most civilized things in the world and one of the
          most natural things of the world that has been brought to the greatest
          perfection, and it offers a greater range for enjoyment and
          appreciation than, possibly, any other purely sensory thing.”
        </p>
        <p className="para-2">― Ernest Hemingway ―</p>
      </div>
    );
  }

  function Product() {
    return (
      <div className="product">
        <h3 style={{ marginBottom: "32px" }}>Sản phẩm nổi bật</h3>
        <div className="px-5 py-3" id="container">
          <HorizontalScroll>
            {Array.from({ length: products.length }).map((_, idx) => (
              <div key={idx} className="px-2">
                <ProductComponent product={products[idx]} />
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </div>
    );
  }

  function AboutUs() {
    return (
      <div className="about-us">
        <div className="baner-img"></div>
        <h3>Medi-Good</h3>
        <p className="para-1">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    );
  }

  function CustomerReview() {
    const review = [
      {
        name: "Trần Văn Minh",
        content: `Đây là một hạt giống tiềm năng cho khả năng phát triển
        ngành hàng thuốc ngoại ở Việt Nam, giá cả đi đôi với chất
        lượng, thái độ phục vụ chuyên nghiệp, phục vụ tận tình, 10
        điểm dành cho Medigood`,
        avt: "https://res.cloudinary.com/tanthanh0805/image/upload/v1640322386/moriiStore/N%C3%A0ng_th%C6%A1__13_jk1or9.jpg",
      },
      {
        name: "Nguyễn Hải Trúc",
        content: `Hết sức tuyệt vời, một trải nghiệm hoàn toàn hài lòng khi đến với cửa hàng này, nhân viên tư vấn nhiệt tình, phân loại sản phẩm suất xắc, sẽ quay lại ửng hộ, mua rượu thì chỉ có nhắc đến Medigood thôi.`,
        avt: "https://variety.com/wp-content/uploads/2022/04/Elle-Fanning-Plainville.jpg?w=681&h=383&crop=1",
      },

      {
        name: "Dương Thanh Tân",
        content: `Tất cả mọi thứ đều tốt, duy chỉ có rượu là tốt một cách quá đáng, hương vị được giữ nguyên bản, phụ kiện chuẩn gu, giá lại hợp lý, hàng bao chất lượng`,
        avt: "https://guardian.ng/wp-content/uploads/2021/12/Harmattan-children-1424x802.jpg",
      },
    ];

    return (
      <div className="customer-review">
        <h3>Đánh giá của khách hàng</h3>
        <Row xs={1} className="g-4 body-review">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card key={idx} className="">
              <Row className="body">
                <Col xs={12} md={3}>
                  <div className="card-img">
                    <Card.Img variant="left" src={review[idx].avt} />
                  </div>
                  <div
                    className="assess d-flex justify-content-center"
                    style={{ color: "yellow" }}
                  >
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <IoStar key={idx} style={{ padding: "2px" }} />
                    ))}
                  </div>
                </Col>
                <Col xs={12} md={9}>
                  <Card.Body>
                    <Card.Title className="card-title">
                      {review[idx].name}
                    </Card.Title>
                    <Card.Text className="card-text">
                      {review[idx].content}
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </Row>
      </div>
    );
  }

  function Map() {
    return (
      <div className="gg-map">
        <div className="map-img"></div>
      </div>
    );
  }
};

export default Home;
