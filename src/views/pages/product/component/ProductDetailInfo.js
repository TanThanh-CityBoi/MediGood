import { Col, Row } from "react-bootstrap";
import { BsFillCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import './ProductDetailInfo.scss'

function ProductDetailInfo(props) {
    return (
        <Row className="product-detail-info-wrapper">
            <Col xs={12} lg={3} className='left-grid'>
                <div className="left-grid-wrapper">
                    <div>
                        <h1>Danh Mục</h1>
                        <p className="category">{props.product.category}</p>
                    </div>

                    <div>
                        <h1>Xuất xứ</h1>
                        <p className="other-product-info">{props.product.origin}</p>
                    </div>

                    <div>
                        <h1>Nhà sản xuất</h1>
                        <p className="other-product-info">{props.product.producer}</p>
                    </div>

                    <div>
                        <h1>Độ Tuổi</h1>
                        <p className="other-product-info">{props.product.age[0]} - {props.product.age[1]}</p>
                    </div>

                    <div>
                        <h1>Quy cách</h1>
                        <p className="other-product-info">{props.product.dosageForm}</p>
                    </div>

                    <div>
                        <h1>Lưu ý</h1>
                        <p className="other-product-info">{props.product.note}</p>
                    </div>
                </div>
            </Col>

            <Col xs={12} lg={9} className='right-grid'>
                <div dangerouslySetInnerHTML={{ __html: props.product.aboutProduct }}></div>
            </Col>
        </Row>
    )
}

export { ProductDetailInfo }