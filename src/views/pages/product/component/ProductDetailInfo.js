import { Col, Row } from "react-bootstrap";
import { BsFillCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import './ProductDetailInfo.scss'

function ProductDetailInfo(props) {
    const foodlist = useSelector(state => state.foodReducer.foods);

    return (
        <Row className="product-detail-info-wrapper">
            <Col xs={12} lg={3} className='left-grid'>
                <div className="left-grid-wrapper">
                    <div>
                        <h1>NHIỆT ĐỘ SỬ DỤNG</h1>
                        <p className="temperature">{props.product.temperature.minimum}-{props.product.temperature.maximum}&deg;C</p>
                    </div>

                    <div>
                        <h1>MÀU SẮC </h1>
                        <p className="product-color"><BsFillCircleFill className={"product-color-" + props.product.color} /> {props.product.color}</p>
                    </div>

                    <div>
                        <h1>SỬ DỤNG KÈM THEO</h1>
                        {props.product.foods.map((val, idx) => (
                            <p className="food-product" key={idx}>
                                <img src={'/Foods/' + (foodlist.indexOf(val) + 1) + '.svg'}></img>
                                {val}
                            </p>
                        ))}
                    </div>
                </div>
            </Col>

            <Col xs={12} lg={9} className='right-grid'>
                <div className="list-item">
                    <div className="information-item">
                        <h5>Xuất xứ:</h5>
                        <p>{props.product.origin}</p>
                    </div>
                    <div className="information-item">
                        <h5>Nhà sản xuất: </h5>
                        <p>{props.product.producer}</p>
                    </div>
                    <div className="information-item">
                        <h5>Vintage: </h5>
                        <p>{props.product.vintage}</p>
                    </div>
                    <div className="information-item">
                        <h5>Nồng độ cồn: </h5>
                        <p>{props.product.concentrationPercent}%</p>
                    </div>
                    <div className="information-item">
                        <h5>Dung tích: </h5>
                        <p>{props.product.capacity}ml</p>
                    </div>
                </div>

                <div className="description-item">
                    <h5>Mô tả: </h5>
                    <p>{props.product.aboutProduct}</p>
                </div>
            </Col>
        </Row>
    )
}

export { ProductDetailInfo }