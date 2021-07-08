import React from 'react';
import patienProfileSyle from '@styles/PatientProfile.module.scss';
import useTranslation from 'next-translate/useTranslation';
import authenticatedRoute from '@components/AuthenticatedRoute';
import SliderLayout from '@components/Layout';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';
import API from '@utils/axios';

import {
    UserCardInfo,
    DbCarInfo,
    NotesCard,
    AvatarWithEdit,
    DividerLine
} from '@components/PatientProfile';

const PatientProfile = ({ patient, direction }) => {
    const { t } = useTranslation();

    const router = useRouter();

    if (router.isFallback) {
        return <div>{t('Loding')}</div>;
    }
    if (!patient) return <h1>{t('NotFOund')}</h1>;
    return (
        <div>
            <SliderLayout
                title={'PtientProfile'}
                keywords={'PtientProfile'}
                description={'this is patinet profile'}
                active={`/patient`}>
                <div
                    style={{
                        direction
                    }}>
                    <h6 className={patienProfileSyle.header}>{`${t('patient')} ${t(
                        'profile'
                    )}`}</h6>

                    <div>
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
                            ISF={patient.ISF}
                            sliding_scale={patient.sliding_scale}
                            is_other_health_issues={patient.s_other_health_issues}
                            I_C={patient.I_C}
                            health_issues={patient.health_issues}
                        />
                        <DividerLine />
                        <NotesCard note={patient.note} t={t} />
                    </div>
                </div>
            </SliderLayout>
        </div>
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
