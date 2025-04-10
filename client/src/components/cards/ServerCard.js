import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ServerCard(props) {
    return (
        <Card className="dataCard">
            <Card.Body>
                <Card.Title>Server Information</Card.Title>
                <Card.Text>
                    <Container>
                        <Row>
                            <Col md="12">Database Size:</Col>
                            <Col md="12">
                                {(props.info.database_size / 1024 / 1024 / 1024).toFixed(2)} GiB
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">Free Space:</Col>
                            <Col md="12">
                                {(props.info.free_space / 1024 / 1024 / 1024).toFixed(2)} GiB
                            </Col>
                        </Row>
                    </Container>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ServerCard;
