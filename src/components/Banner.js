import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 
export default function Banner({data}) {

    console.log(data);
    const {title, content, destination, buttonLabel} = data;

    return (
        <Row>
            <Col>
                <h1 className="text-center mt-5">{title}</h1>
                <p className="text-center">{content}</p>
                <div className="d-flex justify-content-center mb-5">
                    <Link variant="primary" className="btn btn-primary justify-content-center" to={destination}>{buttonLabel}</Link>
                </div>
            </Col>
        </Row>
    )
}