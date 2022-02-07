import { Col, ConfigProvider, Row, Typography } from 'antd';

import Card from '@components/Card';
import CustomButton from '@src/components/CustomBtn';
import PropTypes from 'prop-types';
import QRCode from 'react-qr-code';
import print from '@utils/helpers/print';
import { useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';

function Admin({ direction, doctors, id, name }) {
    const printQR = useRef('');
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
                    <Row gutter={[20, 8]} justify="center" align="middle">
                        <Col ref={printQR}>
                            <QRCode
                                value={`${window.origin}/create-patient-qr/${id}?name=${name}`}
                            />
                        </Col>
                        <Col>
                            <CustomButton
                                type="button"
                                text="Print QR code"
                                handleButtonClick={() => {
                                    print(printQR.current);
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
    doctors: PropTypes.array,
    id: PropTypes.string,
    name: PropTypes.string
};

export default Admin;
