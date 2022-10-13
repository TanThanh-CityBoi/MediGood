import { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { userActions } from '../../../../actions';
import './ProductBrief.scss'

function ProductBrief(props) {
    const dispatch = useDispatch();

    const [currentImg, setCurrentImg] = useState({ val: props.product.avtURL, id: 0 });
    const handleImgClick = (val, id) => {
        setCurrentImg({ val: val, id: id });
    }
    var formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const originPrice = formatter.format(props.product.originPrice);
    const price = formatter.format(props.product.price);
    const discountPercent = Math.floor((props.product.originPrice - props.product.price) / props.product.originPrice * 100);

    const [quantity, setQuantity] = useState(1);
    const handleChangeQuantity = (number) => {
        if (parseInt(number) < 1) setQuantity(1);
        else if (isNaN(parseInt(number)) && isNaN(quantity)) setQuantity(1);
        else setQuantity(parseInt(number));
    }

    const handleAddToCart = (id, quantity) => {
        dispatch(userActions.addToCart({product: id, quantity: quantity}));
    }
    return (
        <Container className="product-briefing-wrapper">
            <Row>
                <Col xs={12} lg={6} className="product-img-group">
                    <div className='img-list'>
                        <img
                            onClick={() => handleImgClick(props.product.avtURL, 0)}
                            src={props.product.avtURL}
                            alt='product-img'
                            className={currentImg.id === 0 ? "img-active" : ""}
                        ></img>
                        {props.product.imgURLs.map((val, idx) => (
                            <img
                                key={idx}
                                onClick={() => handleImgClick(val, idx + 1)}
                                src={val}
                                alt='product-img'
                                className={idx + 1 === currentImg.id ? "img-active" : ""}
                            ></img>
                        ))}
                    </div>
                    <div className='current-img'>
                        <img src={currentImg.val} alt='product-img'></img>
                    </div>
                </Col>
                <Col xs={12} lg={6} className="product-briefing">
                    <Container>

                        <div className='product-code'>
                            <p>Mã sản phẩm: {props.product.sku}</p>
                        </div>
                        <div className='product-name'>
                            <p>{props.product.name}</p>
                        </div>
                        <div className='product-discount'>
                            {props.product.price < props.product.originPrice &&
                                <>
                                    <p> {originPrice}</p>
                                    <span>-{discountPercent}%</span>
                                </>}
                        </div>
                        <div className='sell-price'>
                            <p>{price}</p>
                        </div>
                        <div className='product-count'>
                            <h3>Số lượng</h3>
                            <div>
                                <button onClick={() => handleChangeQuantity(quantity - 1)}>-</button>
                                <input type={'number'} value={quantity} onChange={(e) => handleChangeQuantity(e.target.value)} />
                                <button onClick={() => handleChangeQuantity(quantity + 1)}>+</button>
                            </div>
                        </div>
                        <div className='buy-btn-group'>
                            <button className='btn-add-to-cast' onClick={() => handleAddToCart(props.product._id, quantity)}>Thêm vào giỏ hàng</button>
                            <br></br>
                            <button className='btn-buy'>Đặt hàng</button>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}
export { ProductBrief }