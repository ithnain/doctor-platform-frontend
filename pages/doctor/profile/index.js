import { Col, ConfigProvider, Row, Typography } from 'antd';

import API from '@utils/axios';
import Card from '@components/Card';
import PropTypes from 'prop-types';
import SliderLayout from '@components/Layout';
import authenticatedRoute from '@components/AuthenticatedRoute';
import useTranslation from 'next-translate/useTranslation';

function Profile({ direction, info }) {
    const { t } = useTranslation('common');
    const { Title } = Typography;

    return (
        <SliderLayout
            title={'Registration'}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor overview'}>
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
                                <Card doctor={info} profile={true} />
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
export const getServerSideProps = async ({ req }) => {
    try {
        const res = await API.get(`/auth/profile`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        const { data } = res;
        return {
            props: {
                info: data
            }
        };
    } catch (error) {
        return {
            props: {
                info: '',
                error: 'Something went wrong there. Try again.'
            }
        };
    }
};
export default authenticatedRoute(Profile, { pathAfterFailure: '/login' });
