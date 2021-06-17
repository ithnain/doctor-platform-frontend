import { Col, ConfigProvider, Row, Typography } from 'antd';

import Card from '../../Card';

// import { useLocalStorage } from '@src/hooks/useLocalStorage';
// import { useState } from 'react';

function Admin() {
    // const [direction, setdirection] = useState(null);

    const { Title } = Typography;
    return (
        <Row justify="start" align="middle">
            <ConfigProvider direction={'ltr'}>
                <Col flex xs={24}>
                    <Title level={3} align="start">
                        Latest Registration
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
