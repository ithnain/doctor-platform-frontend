import { Col, ConfigProvider, Pagination, Row, Typography } from 'antd';

import API from '@utils/axios';
import Card from '@components/Card';
import PropTypes from 'prop-types';
import SliderLayout from '@components/Layout';
import authenticatedRoute from '@components/AuthenticatedRoute';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

function Registration({ direction, doctors, totalCount }) {
    const { t } = useTranslation('registration');
    const router = useRouter();

    const { Title } = Typography;
    const handlePagination = (page) => {
        const currentPath = router.pathname;
        const currentQuery = router.query;
        currentQuery.page = page;

        router.push({
            pathname: currentPath,
            query: currentQuery
        });
    };
    return (
        <SliderLayout
            title={'Registration'}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor overview'}
            active={`/registration/${+router.query.page}`}>
            <ConfigProvider direction={direction}>
                <Row justify="start" align="middle" gutter={[20, 20]}>
                    <Col flex xs={24}>
                        <Title level={3} align="start">
                            {t('allDoctors', { count: totalCount })}
                        </Title>
                    </Col>
                    <Col xs={24}>
                        <Row gutter={[20, 8]} justify="start" align="top">
                            {doctors && doctors.length >= 1 ? (
                                doctors.map((doctor) => (
                                    <Col xs={24} md={12} lg={8} key={doctor.id}>
                                        <Card actions doctor={doctor} />
                                    </Col>
                                ))
                            ) : (
                                <h4>{t('noDoctors')}</h4>
                            )}
                        </Row>
                    </Col>
                    <Col xs={24} flex align="end">
                        <Row justify="end" align="bottom">
                            <Col span={24}>
                                {doctors && doctors.length >= 1 && (
                                    <Pagination
                                        current={+router.query.page}
                                        onChange={handlePagination}
                                        showTotal={(totalCount, range) =>
                                            `${range[0]}-${range[1]} of ${totalCount} items`
                                        }
                                        defaultPageSize={9}
                                        defaultCurrent={1}
                                        total={totalCount}
                                        showSizeChanger={false}
                                    />
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ConfigProvider>
        </SliderLayout>
    );
}

Registration.propTypes = {
    direction: PropTypes.string.isRequired,
    doctors: PropTypes.array.isRequired,
    totalCount: PropTypes.string.isRequired
};
export const getServerSideProps = async ({ req, query }) => {
    try {
        const res = await API.get(`/supervisor/doctors?page=${query.page}&limit=9&status=PENDING`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        const { data } = res;
        return {
            props: {
                doctors: data.data,
                totalCount: data.totalCount
            }
        };
    } catch (error) {
        return {
            props: {
                doctors: null
            }
        };
    }
};
export default authenticatedRoute(Registration, { pathAfterFailure: '/login' });
