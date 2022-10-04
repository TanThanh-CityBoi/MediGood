import { Container, Row, Col } from 'react-bootstrap'
import { ProfileBanner } from './component/ProfileBanner';
import { UserInfo } from './component/UserInfo';
import { Breadcrumb } from '../../component/Breadcrumb'
import { TransactionTable } from './component/TransactionTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import clsx from "clsx";
import './Profile.scss'
import { userActions } from '../../../actions';


function Profile() {
    const dispatch = useDispatch();
    const userReceipts = useSelector(state => state.userReducer.userReceipts) || []
    const dataBread = [
        {
            name: 'Trang cá nhân',
            link: '/thong-tin-tai-khoan'
        }]

    var [filter, setFilter] = useState("");
    var changeFilter = (e) => {
        setFilter(e.target.value);
    };

    var formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    const columnDocs = [
        // {field: , headerName: , width: }
        { field: "stt", headerName: "STT", width: 80 },
        { field: "receiptcode", headerName: "ID đơn hàng", width: 150 },
        { field: "sosp", headerName: "Số sản phẩm", width: 150 },
        { field: "totalprice", headerName: "Tổng giá trị", width: 150 },
        {
            field: "trangthai",
            headerName: "Trạng thái",
            width: 150,
            cellClassName: (params) => {
                if (params.value == null) {
                    return "";
                }
                return clsx("super-app", {
                    receipt_status_0: params.value === "Đã hủy",
                    receipt_status_1: params.value === "Chờ xác nhận",
                    receipt_status_2: params.value === "Đã xác nhận",
                    receipt_status_3: params.value === "Đang giao",
                    receipt_status_4: params.value === "Đã nhận hàng",
                    receipt_status_5: params.value === "Không nhận hàng",
                });
            }
        },
        { field: "ngaytao", headerName: "Ngày tạo", width: 150 },
    ];

    const receiptStatus = ["Đã hủy", "Chờ xác nhận", "Đã xác nhận", "Đang giao", "Đã nhận hàng", "Không nhận hàng"];
    const rowDocs = [];
    userReceipts?.forEach((value, _index) => {
        const time = new Date(value.createdAt);
        var sosp = 0;
        value.cart.forEach((val, idx) => {
            sosp += val.quantity;
        });
        //0: bị hủy, 1: chờ xác nhận, 2: đã xác nhận, 3: đang giao. 4: đã nhận hàng, 6: boom hàng

        rowDocs.push({
            id: value._id,
            stt: _index + 1,
            receiptcode: value.shippingCode,
            sosp: sosp,
            totalprice: formatter.format(value.totalPrice),
            trangthai: receiptStatus[value.status],
            ngaytao:
                time.getDate() +
                "-" +
                (time.getMonth() + 1) +
                "-" +
                time.getFullYear() +
                " __ " +
                time.getHours() +
                ":" +
                time.getMinutes(),
        });
    });

    useEffect(() => {
        dispatch(userActions.getUserReceipt());
    }, [])

    return (
        <Container className='profile-wrapper'>
            <Breadcrumb data={dataBread} />

            <ProfileBanner />
            <Row className='profile-row'>
                <Col xs={12} md={5} className='profile-col_left'>
                    <UserInfo />
                </Col>
                <Col xs={12} md={7} className='profile-col_right'>
                    <div className='transaction-history'>
                        <h1>Lịch sử mua hàng</h1>
                        <TransactionTable
                            columnDocs={columnDocs}
                            rowDocs={rowDocs}
                            filter={filter}
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default Profile;