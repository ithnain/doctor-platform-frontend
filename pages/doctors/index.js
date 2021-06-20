import { Col, ConfigProvider, Pagination, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';

import Card from '@components/Card';
import SliderLayout from '@components/Layout';
// import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

function Doctors() {
    const { t } = useTranslation('doctors');
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [direction, setdirection] = useState(null);
    useEffect(() => {
        router.locale === 'ar' ? setdirection('rtl') : setdirection('ltr');
    }, [router.locale]);
    const { Title } = Typography;
    const handlePagination = (page) => {
        setCurrentPage(page);
    };
    return (
        <SliderLayout
            title={'Overview'}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor overview'}>
            <ConfigProvider direction={direction}>
                <Row justify="start" align="middle" gutter={[20, 20]}>
                    <Col flex xs={24}>
                        <Title level={3} align="start">
                            {t('allDocotrs', { count: 30 })}
                        </Title>
                    </Col>{' '}
                    <Col xs={24}>
                        <Row gutter={[20, 8]} justify="space-between" align="middle">
                            <Col xs={24} md={{ span: 8 }}>
                                <Card></Card>
                            </Col>
                            <Col xs={24} md={{ span: 8 }}>
                                <Card></Card>
                            </Col>
                            <Col xs={24} md={{ span: 8 }}>
                                <Card></Card>
                            </Col>{' '}
                            <Col xs={24} md={{ span: 8 }}>
                                <Card></Card>
                            </Col>
                            <Col xs={24} md={{ span: 8 }}>
                                <Card></Card>
                            </Col>
                            <Col xs={24} md={{ span: 8 }}>
                                <Card></Card>
                            </Col>{' '}
                            <Col xs={24} md={{ span: 8 }}>
                                <Card></Card>
                            </Col>
                            <Col xs={24} md={{ span: 8 }}>
                                <Card></Card>
                            </Col>
                            <Col xs={24} md={{ span: 8 }}>
                                <Card></Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} flex align="end">
                        <Row justify="end" align="bottom">
                            <Col span={24}>
                                <Pagination
                                    current={currentPage}
                                    onChange={handlePagination}
                                    showTotal={(total, range) =>
                                        `${range[0]}-${range[1]} of ${total} items`
                                    }
                                    defaultPageSize={9}
                                    defaultCurrent={1}
                                    total={60}
                                    showSizeChanger={false}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ConfigProvider>
        </SliderLayout>
    );
}

// Doctors.propTypes = {};

export default Doctors;
