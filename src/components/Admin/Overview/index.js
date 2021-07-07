import { Col, ConfigProvider, Row, Typography } from 'antd';

import Card from '@components/Card';
import PropTypes from 'prop-types';
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
                        {doctors?.map((doctor) => (
                            <Col xs={24} md={{ span: 8 }} key={doctor.id}>
                                <Card doctor={doctor} />
                            </Col>
                        ))}
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
