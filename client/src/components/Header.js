import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Timer from './MoneroContainer/Timer';
import monero_logo from '../monero-logo.png';
import Prices from './ConversionContainer/ConversionContainer';
import axios from 'axios';
import { React, PureComponent } from 'react';
import version from '../version.json';

class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.remoteVersion = version.version;
        this.state = {
            ticker: false
        };
    }

    componentDidMount() {
        (async () => {
            await this.getSettings();
            await this.getVersion();
            this.setState({ remoteVersion: this.remoteVersion });
        })();
    }

    /**
     * get settings from the server.
     */
    getSettings = async () => {
        try {
            const result = await axios({
                method: 'GET',
                url: '/settings'
            });

            this.setState({
                ticker: result.data.TICKER === 'true'
            });
        } catch (err) {
            console.error('Error fetching monero data', err);
        }
    };

    /**
     * get latest version info from github.
     */
    getVersion = async () => {
        try {
            const result = await axios({
                method: 'GET',
                url: `https://raw.githubusercontent.com/jnbarlow/monero-dashboard/main/version.json?${new Date().getTime()}`
            });

            this.remoteVersion = result.data.version;
        } catch (err) {
            console.error('Error fetching version data', err);
        }
    };

    render() {
        const props = this.props;
        const update = props.info.update_available ? 'Yes! ' : 'not today...';
        const busy = props.info.busy_syncing ? 'Yes, catching up.' : 'Nope, up to date.';
        const { ticker } = this.state;

        return (
            <Jumbotron>
                <Container>
                    <Row>
                        <Col md="12">
                            <h1>
                                <img src={monero_logo} className="logo" alt="logo" /> Dashboard
                            </h1>
                            <Container>
                                <Row>
                                    <Col md="6">Monero Node Version:</Col>
                                    <Col>{props.info.version}</Col>
                                </Row>
                                <Row>
                                    <Col md="6">Update Available:</Col>
                                    <Col>{update}</Col>
                                </Row>
                                <Row>
                                    <Col md="6">Connected to:</Col>
                                    <Col>{props.info.nettype}</Col>
                                </Row>
                                <Row>
                                    <Col md="6">Busy Syncing:</Col>
                                    <Col>{busy}</Col>
                                </Row>
                                <Row>
                                    <Col md="6">Dashboard Version:</Col>
                                    <Col md="6">v{version.version}</Col>
                                    {(() => {
                                        if (version.version !== this.remoteVersion) {
                                            return (
                                                <Col>
                                                    <a
                                                        href="https://github.com/jnbarlow/monero-dashboard"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        Update Available!
                                                    </a>
                                                    &nbsp;-&nbsp; (v{this.remoteVersion})
                                                </Col>
                                            );
                                        }
                                    })()}
                                </Row>
                                <Row>
                                    <Col />
                                </Row>
                                <Row>
                                    <Col md="3">
                                        <Timer />
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col md="4">
                            {(() => {
                                if (ticker) {
                                    return <Prices />;
                                }
                            })()}
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        );
    }
}

export default Header;
