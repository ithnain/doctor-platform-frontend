import { Col, ConfigProvider, Row, Typography } from 'antd';

import API from '@utils/axios';
import Card from '@components/Card';
import PropTypes from 'prop-types';
import SliderLayout from '@components/Layout';
import authenticatedRoute from '@components/AuthenticatedRoute';
import useTranslation from 'next-translate/useTranslation';
import { dehydrate, QueryClient, useQuery } from 'react-query';

const getUserData = async () => {
    return fetch('/api/auth/getToken')
        .then((res) => res.json())
        .then((data) =>
            API.get(`auth/profile`, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            })
        );
};
function Profile({ direction }) {
    const { t } = useTranslation('common');
    const { Title } = Typography;
    const { data: userData } = useQuery('user', getUserData);

    return (
        <SliderLayout
            title={'Profile'}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor Profile'}>
            <ConfigProvider direction={direction}>
                <Row justify="start" align="middle" gutter={[20, 20]}>
                    <Col flex xs={24}>
                        <Title level={3} align="start">
                            {t('myProfile')}
                        </Title>
                    </Col>
                    <Col xs={24}>
                        <Row gutter={[20, 8]} justify="start" align="top">
                            <Col xs={24}>
                                <Card doctor={userData.data} profile={true} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ConfigProvider>
        </SliderLayout>
    );
}

Profile.propTypes = {
    direction: PropTypes.string.isRequired,
    info: PropTypes.object
};

export const getServerSideProps = async () => {
    const qClient = new QueryClient();
    await qClient.prefetchQuery('user', getUserData);

    return {
        props: {
            dehydratedState: dehydrate(qClient)
        }
    };
};
export default authenticatedRoute(Profile, { pathAfterFailure: '/login' });
