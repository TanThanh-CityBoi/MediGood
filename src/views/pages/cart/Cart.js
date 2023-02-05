import { Col, Container, Row } from "react-bootstrap";
import { SuggestProduct } from '../../component/SuggestProduct';
import { Breadcrumb } from '../../component/Breadcrumb'
import { CartItem } from "./component/CartItem";
import './Cart.scss'
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../actions";
import { useNavigate } from "react-router-dom";

function Cast() {

    const dataBread = [
        {
            name: 'Giỏ hàng',
            link: '/gio-hang'
        }]

    const [rerender, setRerender] = useState(true);
    const total = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const products = useSelector(state => state.userReducer.productsInCart) || [];

    const handleDeleteCart = (id) => {
        console.log("item delete: ", id);
        dispatch(userActions.editCart({ product: id, quantity: 0 }));
        setRerender(!rerender);
    }

    var formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    useEffect(() => {
        dispatch(userActions.getProductsInCart());
    }, [isLoggedIn])

    total.current = 0;
    if (products.length > 0) {
        var price = 0
        products.forEach(element => {
            price += element.product.price * element.quantity;
        });
        total.current = price;
    }

    return (
        <Container className="cart-wrapper">
            <Breadcrumb data={dataBread} />

            <div className="cart-header">
                <h1>Giỏ hàng của bạn</h1>
                <p>(Có <b>{products.length}</b> sản phẩm trong giỏ hàng)</p>
            </div>

            <Row className="cart-body">
                <Col xs={12} xl={9} className="list-product">
                    {
                        products.length > 0 && products.map((val, idx) => (
                            <div key={idx}>
                                <CartItem product={val.product} quantity={val.quantity} handleDeleteCart={handleDeleteCart} />
                            </div>
                        ))
                    }
                </Col>

                <Col xs={12} xl={3} className="receipt-briefing">
                    <div>
                        <h1>TÓM TẮT ĐƠN HÀNG</h1>
                        <p>Chưa bao gồm phí vận chuyển</p>
                        <div className="total-price">
                            <p>Tổng tiền: </p>
                            <p>{formatter.format(total.current)}</p>
                        </div>
                        <hr></hr>


                        <div className="button-group">
                            <button className="btn-buy" onClick={()=> navigate('/thanh-toan')}>Tiến hành đặt hàng</button>
                            <button className="btn-to-store" onClick={() => navigate('/san-pham')}>Mua thêm sản phẩm</button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default Cast;