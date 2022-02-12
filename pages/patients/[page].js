// import PropTypes from 'prop-types';
// import styles from './Patients.module.scss';

import { Col, ConfigProvider, Pagination, Row, Typography } from 'antd';

import API from '@utils/axios';
import Card from '@components/Card';
import PropTypes from 'prop-types';
import SliderLayout from '@components/Layout';
import authenticatedRoute from '@components/AuthenticatedRoute';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

function Patients({ direction, patients, totalCount }) {
    const { t } = useTranslation('patients');
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
            title={'Patients'}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor patients view'}
            active={`/patients/${+router.query.page}`}>
            <ConfigProvider direction={direction}>
                <Row justify="start" align="middle" gutter={[20, 20]}>
                    <Col flex xs={24}>
                        <Title level={3} align="start">
                            {t('myPatients', { count: totalCount || 0 })}
                        </Title>
                    </Col>
                    <Col xs={24}>
                        <Row gutter={[20, 8]} justify="start" align="middle">
                            {patients && patients.length >= 1 ? (
                                patients.map((patient) => (
                                    <Col xs={24} md={12} lg={8} key={patient.id}>
                                        <Card
                                            patient={patient}
                                            canEdit={true}
                                            direction={direction}
                                        />
                                    </Col>
                                ))
                            ) : (
                                <Col xs={24}>
                                    <h4>{t('noPatients')}</h4>
                                </Col>
                            )}
                        </Row>
                    </Col>
                    <Col xs={24} flex align="end">
                        <Row justify="end" align="bottom">
                            <Col span={24}>
                                {patients && patients.length >= 1 && (
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

Patients.propTypes = {
    direction: PropTypes.string.isRequired,
    patients: PropTypes.array.isRequired,
    totalCount: PropTypes.string.isRequired
};
export const getServerSideProps = async ({ req, query }) => {
    try {
        const res = await API.get(`/patient/getPatients?page=${query.page}&limit=9`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });

        const { data } = res;
        return {
            props: {
                patients: data.data,
                totalCount: data.totalCount
            }
        };
    } catch (error) {
        return {
            props: {
                patients: null
            }
        };
    }
};
export default authenticatedRoute(Patients, { pathAfterFailure: '/login' });
