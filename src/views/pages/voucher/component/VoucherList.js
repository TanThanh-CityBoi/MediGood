import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'
import { VoucherCard } from './VoucherCard'
import { PaginationCustom } from '../../../component/PaginationCustom'
import './VoucherList.scss'
import { voucherActions } from '../../../../actions'

function VoucherList() {

    const dispatch = useDispatch();
    const vouchers = useSelector(state => state.voucherReducer.vouchers) || []
    const isLoading = useSelector(state => state.voucherReducer.isLoading)
    const [currentPage, setCurrentPage] = useState(1);
    const elementPerPage = 2;
    useEffect(() => {
        dispatch(voucherActions.getAll());
    }, [])

    const vouchersInPage = vouchers.slice((currentPage - 1) * elementPerPage, currentPage * elementPerPage)

    return (
        isLoading ? <h1 style={{ marginTop: "12rem" }}>Loading............</h1> :
            <Container className='voucher-list__wrapper'>
                <Container className='voucher-list__title'>
                    <h1>Voucher Khuyễn mãi</h1>
                </Container>
                {vouchers.length > 0 &&
                    <Container className='voucher-list'>
                        {Array.from({ length: vouchersInPage.length }).map((_, idx) => (
                            <div key={idx} className="voucher-item">
                                <VoucherCard voucher={vouchersInPage[idx]} />
                            </div>
                        ))}
                        <div className='voucher-list-footer'>
                            <PaginationCustom numberOfElement={vouchers.length} elementPerPage={elementPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                        </div>
                    </Container>}
            </Container>
    )
}
export { VoucherList }