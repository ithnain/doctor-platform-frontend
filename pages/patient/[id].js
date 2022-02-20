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
import { QueryClient, dehydrate, useQuery } from 'react-query';

import API from '@utils/axios';
import PropTypes from 'prop-types';
import React from 'react';
import SliderLayout from '@components/Layout';
import authenticatedRoute from '@components/AuthenticatedRoute';
import toastr from 'toastr';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

const getPatient = async (query) => API.get(`patient/patient?id=${query.query}`);
const getPatientAppointments = async (query) =>
    API.get(`patient/appointments?patientId=${query.query}`);

const PatientProfile = ({ direction }) => {
    const onError = (err) => {
        if (err.response) {
            const { data = {} } = err.response;
            toastr.error(data.message[0]);
        } else if (err.message) {
            toastr.error(err.message);
        } else if (err.request) {
            toastr.error(err.request);
        }
    };
    const { t } = useTranslation('patient');
    const router = useRouter();
    const id = router.query.id;
    const { data: patientData } = useQuery(
        ['onePatient', { query: id }],
        () => getPatient({ query: id }),
        {
            enabled: !!id,
            onError
        }
    );
    const { data: appointmentsData } = useQuery(
        ['patientAppointments', { query: id }],
        () => getPatientAppointments({ query: id }),
        {
            enabled: !!id,
            onError
        }
    );
    const patient = patientData?.data;
    const appointments = appointmentsData?.data;
    if (!patient?.data) return <h1>{t('NotFOund')}</h1>;
    return (
        <SliderLayout
            title={'PatientProfile'}
            keywords={'PatientProfile'}
            description={'this is patinet profile'}
            active={`/patient`}>
            <ConfigProvider direction={direction}>
                <Row>
                    <Col xs={24}>
                        <AvatarWithEdit name={patient?.name} id={id} />
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

export const getServerSideProps = async ({ params }) => {
    const qClient = new QueryClient();
    await qClient.prefetchQuery('getPatient', () => getPatient(params.id));
    await qClient.prefetchQuery('getPatientAppointments', () => getPatientAppointments(params.id));

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
