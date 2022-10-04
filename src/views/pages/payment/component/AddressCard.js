import { Container } from 'react-bootstrap'
import './AddressCard.scss'

function AddressCard(props) {
    return (
        <Container className='card-address'>
            <p>
                <b>{props.address.name}</b>
                &ensp;
                <b>{props.address.phone + ' __ '}</b>
                {(props.address.description ? (props.address.description + ', ') : '') + props.address.ward.name + ', ' + props.address.district.name + ', ' + props.address.province.name}
            </p>
        </Container>
    )
}

export { AddressCard }