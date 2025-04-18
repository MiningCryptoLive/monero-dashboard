import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MoneroCard(props) {
    return (
        <Card className="dataCard">
            <Card.Body>
                <Card.Title>Monero Blockchain Statistics</Card.Title>
                <Card.Text>
                    <Container>
                        <Row>
                            <Col md="8">Network Difficulty</Col>
                            <Col md="8">
                                <div class="moneroStats">
                                    {props.info.difficulty?.toLocaleString()} GH/S
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="8">Network Height</Col>
                            <Col md="8">
                                <div class="moneroStats">{props.info.height?.toLocaleString()}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">Sync Percentage</Col>
                            <Col md="6">
                                <div class="moneroStats">{props.info.sync_percentage}%</div>
                            </Col>
                        </Row>
                    </Container>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default MoneroCard;
