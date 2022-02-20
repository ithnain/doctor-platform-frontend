import {
    AvatarWithEdit,
    DbCarInfo,
    DividerLine,
    NotesCard,
    UserCardInfo,
    ProgressCardInfo,
    GoalsCard,
    RefCardInfo,
    MedicalConditions,
    PatientMedication,
    SessionsCard
} from '@components/PatientProfile';
import { Col, ConfigProvider, Row } from 'antd';

import API from '@utils/axios';
import PropTypes from 'prop-types';
import React from 'react';
import SliderLayout from '@components/Layout';
import authenticatedRoute from '@components/AuthenticatedRoute';
import useTranslation from 'next-translate/useTranslation';

const PatientProfile = ({ patient, appointments, direction }) => {
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
                        <AvatarWithEdit name={patient?.name} />
                        <SessionsCard t={t} appointments={appointments} />
                        <DividerLine />
                        <UserCardInfo
                            t={t}
                            age={patient?.age}
                            phone_number={patient?.phone_number}
                            topics={patient?.topics}
                        />
                        <DividerLine />
                        <ProgressCardInfo
                            t={t}
                            appointments={appointments}
                            invoice={patient?.invoice}
                        />
                        <DividerLine />
                        <DbCarInfo
                            t={t}
                            diabetesType={patient?.diabetesType}
                            diabetesStatus={patient?.diabetesStatus}
                            treatment={patient?.treatment}
                        />
                        <DividerLine />
                        <RefCardInfo
                            t={t}
                            factorsEffectingLearning={patient?.factorsEffectingLearning}
                            reasonForReferral={patient?.reasonForReferral}
                        />
                        <DividerLine />
                        <GoalsCard
                            t={t}
                            shortTermGoals={patient?.shortTermGoals}
                            longTermGoals={patient?.longTermGoals}
                        />
                        <DividerLine />
                        <PatientMedication
                            t={t}
                            medicationEffectingGlucose={patient?.medicationEffectingGlucose}
                        />
                        <DividerLine />
                        <MedicalConditions
                            t={t}
                            otherHealthIssues={patient?.otherHealthIssues}
                            medicalHistory={patient?.medicalHistory}
                            acutes={patient?.acutes}
                            chronics={patient?.chronics}
                        />
                        <DividerLine />
                        <NotesCard doctorNote={patient?.doctorNote} t={t} />
                    </Col>
                </Row>
            </ConfigProvider>
        </SliderLayout>
    );
};

export async function getServerSideProps({ params, req }) {
    let patient;
    let appointments;
    try {
        const res = await API.get(`patient/patient?id=${params.id}`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        const appointmentsRes = await API.get(`patient/appointments?patientId=${params.id}`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        patient = res.data;
        appointments = appointmentsRes.data;
    } catch (error) {
        patient = null;
        appointments = null;
    }
    return { props: { patient, appointments } };
}

PatientProfile.propTypes = {
    direction: PropTypes.string.isRequired,
    patient: PropTypes.object.isRequired,
    appointments: PropTypes.object.isRequired
};

export default authenticatedRoute(PatientProfile, {
    pathAfterFailure: '/login'
});
