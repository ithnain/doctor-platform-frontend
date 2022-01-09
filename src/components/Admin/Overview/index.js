import { Col, ConfigProvider, Row, Typography } from 'antd';

import Card from '@components/Card';
import CustomButton from '@src/components/CustomBtn';
import PropTypes from 'prop-types';
import QRCode from 'react-qr-code';
import useTranslation from 'next-translate/useTranslation';

function Admin({ direction, doctors }) {
    const { t } = useTranslation('overview');
    const { Title } = Typography;
    return (
        <Row justify="start" align="middle">
            <ConfigProvider direction={direction}>
                <Col flex xs={24}>
                    <Title level={3} align="start">
                        {t('adminTitle')}
                    </Title>
                </Col>
                <Col xs={24}>
                    <Row gutter={[20, 8]} justify="space-between" align="top">
                        {doctors && doctors.length >= 1 ? (
                            doctors?.map((doctor) => (
                                <Col xs={24} md={{ span: 8 }} key={doctor.id}>
                                    <Card doctor={doctor} />
                                </Col>
                            ))
                        ) : (
                            <Col xs={24}>
                                <h4>{t('noDoctors')}</h4>
                            </Col>
                        )}
                    </Row>
                </Col>
                <Col xs={24}>
                    <Row gutter={[20, 8]} justify="space-between" align="top">
                        <Col>
                            <QRCode
                                className="section-to-print"
                                value="https://www.npmjs.com/package/react-qr-code"
                            />
                        </Col>
                        <Col>
                            <CustomButton
                                type="button"
                                text="Print QR code"
                                handleClick={() => {
                                    window.print();
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </ConfigProvider>
        </Row>
    );
}

Admin.propTypes = {
    direction: PropTypes.string.isRequired,
    doctors: PropTypes.array.isRequired
};

export default Admin;
