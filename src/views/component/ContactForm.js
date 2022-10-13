import { Container } from "react-bootstrap";
import './ContactForm.scss'

function ContactForm() {
    return (
        <Container className="contact-form-wrapper">
            <Container className="hr-div"></Container>
            <h1>Liên hệ với chúng tôi</h1>
            <Container className="contact-form">
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td align="left" valign="top" width={"130"}><p>Họ và tên:</p></td>
                                <td><input type={'text'} /></td>
                            </tr>

                            <tr>
                                <td align="left" valign="top"><p>Số điện thoại:</p></td>
                                <td><input type={'text'} /></td>
                            </tr>

                            <tr>
                                <td align="left" valign="top"><p>Email:</p></td>
                                <td><input type={'text'} /></td>
                            </tr>

                            <tr>
                                <td align="left" valign="top"><p>Lời nhắn:</p></td>
                                <td><textarea type={'text'} /></td>
                            </tr>

                            <tr align='right'>
                                <td colSpan={2}>
                                    <button type="submit">Gửi thông tin</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </Container>
        </Container>
    )
}

export { ContactForm }