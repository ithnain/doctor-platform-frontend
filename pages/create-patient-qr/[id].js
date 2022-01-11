import { Col, Row } from 'antd';
import React, { useEffect } from 'react';

import QRForm from '@src/components/QRForm';
import { useRouter } from 'next/router';

const QRFormPage = () => {
    const router = useRouter();
    const { name } = router.query;
    useEffect(() => {
        if (!name) {
            router.push('/create-patient-qr/error');
        }
    }, []);
    return (
        <Row justify="space-around">
            <Col xs={24}>
                <QRForm name={name} />
            </Col>
        </Row>
    );
};

export default QRFormPage;
