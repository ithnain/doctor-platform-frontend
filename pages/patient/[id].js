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

const PatientProfile = ({ patient, direction }) => {
    const { t } = useTranslation('patient');

    if (!patient) return <h1>{t('NotFOund')}</h1>;
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
                        <AvatarWithEdit name={patient.name} />
                        <UserCardInfo
                            t={t}
                            age={patient.age}
                            phone_number={patient.phone_number}
                            city={patient.city}
                        />
                        <DividerLine />
                        <DbCarInfo
                            t={t}
                            type={patient.diabetesType}
                            ISF={patient.ISF}
                            sliding_scale={patient.sliding_scale}
                            is_other_health_issues={patient.s_other_health_issues}
                            I_C={patient.I_C}
                            health_issues={patient.health_issues}
                        />
                        <DividerLine />
                        <NotesCard note={patient.remarkable_note} t={t} />
                    </Col>
                </Row>
            </ConfigProvider>
        </SliderLayout>
    );
};

export async function getServerSideProps({ params, req }) {
    let patient;
    try {
        const res = await API.get(`patient/patient?id=${params.id}`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        patient = res.data;
    } catch (error) {
        patient = null;
    }

    return { props: { patient } };
}

PatientProfile.propTypes = {
    direction: PropTypes.string.isRequired,
    patient: PropTypes.object.isRequired
};

export default authenticatedRoute(PatientProfile, {
    pathAfterFailure: '/login'
});
