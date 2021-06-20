import { Col, ConfigProvider, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';

import Card from '@components/Card';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

function Admin() {
    const { t } = useTranslation('overview');
    const router = useRouter();
    const [direction, setdirection] = useState(null);
    useEffect(() => {
        router.locale === 'ar' ? setdirection('rtl') : setdirection('ltr');
    }, [router.locale]);
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
                    <Row gutter={[20, 8]} justify="space-between" align="middle">
                        <Col xs={12} md={{ span: 8 }}>
                            <Card></Card>
                        </Col>
                        <Col xs={12} md={{ span: 8 }}>
                            <Card></Card>
                        </Col>
                        <Col xs={12} md={{ span: 8 }}>
                            <Card></Card>
                        </Col>
                    </Row>
                </Col>
            </ConfigProvider>
        </Row>
    );
}

Admin.propTypes = {};

export default Admin;
