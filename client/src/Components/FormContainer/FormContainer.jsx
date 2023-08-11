import { Container,Row,Col } from "react-bootstrap";

const FormContainer = ({children,className}) => {
    return ( 
        <Container className="py-5 px-4" >
            <Row className="justify-content-md-center">
                <Col xs={12} md={8} className={`${className}`}>
                    {children}
                </Col>
            </Row>
        </Container>
     );
}
 
export default FormContainer;