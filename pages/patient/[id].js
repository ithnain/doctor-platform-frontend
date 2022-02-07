import {
    AvatarWithEdit,
    DbCarInfo,
    DividerLine,
    NotesCard,
    UserCardInfo
} from '@components/PatientProfile';
import { Col, ConfigProvider, Row } from 'antd';

import API from '@utils/axios';
import PropTypes from 'prop-types';
import React from 'react';
import SliderLayout from '@components/Layout';
import authenticatedRoute from '@components/AuthenticatedRoute';
import patienProfileSyle from '@styles/PatientProfile.module.scss';
import useTranslation from 'next-translate/useTranslation';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { useRouter } from 'next/router';

const getPatient = async (query) => API.get(`patient/patient?id=${query.queryKey[1].query}`);
const PatientProfile = ({ direction }) => {
    const { t } = useTranslation('patient');
    const router = useRouter();
    const id = router.query.id;
    const { data: patientData } = useQuery(['onePatient', { query: id }], getPatient);
    if (!patientData?.data) return <h1>{t('NotFOund')}</h1>;
    return (
        <SliderLayout
            title={'PatientProfile'}
            keywords={'PatientProfile'}
            description={'this is patinet profile'}
            active={`/patient`}>
            <ConfigProvider direction={direction}>
                <Row>
                    <Col xs={24}>
                        <h6 className={patienProfileSyle.header}>{`${t('patient')} ${t(
                            'profile'
                        )}`}</h6>
                    </Col>
                    <Col xs={24}>
                        <AvatarWithEdit name={patientData?.data.name} />
                        <UserCardInfo
                            t={t}
                            age={patientData?.data.age}
                            phone_number={patientData?.dataphone_number}
                            city={patientData?.datacity}
                        />
                        <DividerLine />
                        <DbCarInfo
                            t={t}
                            ISF={patientData?.dataISF}
                            sliding_scale={patientData?.datasliding_scale}
                            is_other_health_issues={patientData?.datas_other_health_issues}
                            I_C={patientData?.dataI_C}
                            health_issues={patientData?.datahealth_issues}
                        />
                        <DividerLine />
                        <NotesCard note={patientData?.dataremarkable_note} t={t} />
                    </Col>
                </Row>
            </ConfigProvider>
        </SliderLayout>
    );
};

export const getServerSideProps = async ({ params }) => {
    const qClient = new QueryClient();
    await qClient.prefetchQuery('getPatient', getPatient(params.id));

    return {
        props: {
            dehydratedState: dehydrate(qClient)
        }
    };
};

PatientProfile.propTypes = {
    direction: PropTypes.string.isRequired
};

export default authenticatedRoute(PatientProfile, {
    pathAfterFailure: '/login'
});
