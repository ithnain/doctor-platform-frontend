import { Col, Row } from 'antd';

import QRError from '@src/components/QRForm/error';

const QRErrorPage = () => {
    return (
        <Row justify="space-around">
            <Col xs={16}>
                <QRError />
            </Col>
        </Row>
    );
};

QRErrorPage.propTypes = {};

export default QRErrorPage;
