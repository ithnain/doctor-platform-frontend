import { Col, Row } from 'antd';

import QRSucess from '@src/components/QRForm/success';

const QRSuccessPage = () => {
    return (
        <Row justify="space-around">
            <Col xs={16}>
                <QRSucess />
            </Col>
        </Row>
    );
};

QRSuccessPage.propTypes = {};

export default QRSuccessPage;
