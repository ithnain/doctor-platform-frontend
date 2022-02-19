import { Col, ConfigProvider, Pagination, Row, Typography } from 'antd';
import API from '@utils/axios';
import Card from '@components/Card';
import PropTypes from 'prop-types';
import SliderLayout from '@components/Layout';
import authenticatedRoute from '@components/AuthenticatedRoute';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import toastr from 'toastr';

const getPatients = async (query) =>
    API.get(`/patient/getPatients?page=${query.query}&limit=9`).catch((err) => {
        if (err.response) {
            const { data = {} } = err.response;
            toastr.error(data.message[0]);
        } else if (err.message) {
            toastr.error(err.message);
        } else if (err.request) {
            toastr.error(err.request);
        }
    });
function Patients({ direction }) {
    const { t } = useTranslation('patients');
    const router = useRouter();
    const page = router.query.page;
    const { data: patientsData } = useQuery(
        ['allPatients', { query: page }],
        () => getPatients({ query: page }),
        { enabled: !!page }
    );
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
                            {t('myPatients', { count: patientsData?.data.totalCount || 0 })}
                        </Title>
                    </Col>
                    <Col xs={24}>
                        <Row gutter={[20, 8]} justify="start" align="middle">
                            {patientsData?.data && patientsData?.data.data.length >= 1 ? (
                                patientsData.data.data.map((patient) => (
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
                                {patientsData?.data && patientsData?.data.data.length >= 1 && (
                                    <Pagination
                                        current={+router.query.page}
                                        onChange={handlePagination}
                                        showTotal={(totalCount, range) => {
                                            return `${range[0]}-${range[1]} of ${patientsData.data.totalCount} items`;
                                        }}
                                        defaultPageSize={9}
                                        defaultCurrent={1}
                                        total={patientsData.data.totalCount}
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
    direction: PropTypes.string.isRequired
};
export const getServerSideProps = async ({ query }) => {
    const qClient = new QueryClient();
    await qClient.prefetchQuery('allPatients', getPatients(query));

    return {
        props: {
            dehydratedState: dehydrate(qClient)
        }
    };
};
export default authenticatedRoute(Patients, { pathAfterFailure: '/login' });
