import { EditIcon, GenderIcon } from '@utils/svg/patientProfile';

import { Col } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import patienProfileSyle from '@styles/PatientProfile.module.scss';
import Image from 'next/image';
import { CheckOutlined } from '@ant-design/icons';

export const SessionsCard = ({ t, appointments }) => {
    const lastAppointment = appointments.sort(function (a, b) {
        return Date.parse(a.date) - Date.parse(b.date);
    });
    return (
        <div className={patienProfileSyle.UserCardInfoWrapper}>
            <div className={patienProfileSyle.sessionsStatsBackground}>
                <text className={patienProfileSyle.sessionsStatsTitle}>
                    {t('Sessions completed')}
                </text>
                <text className={patienProfileSyle.sessionsStatsInfo}>{`${t(
                    appointments?.length
                )}`}</text>
            </div>
            <div className={patienProfileSyle.sessionsStatsBackground}>
                <text className={patienProfileSyle.sessionsStatsTitle}>{t('Last Session')}</text>
                <text className={patienProfileSyle.sessionsStatsInfo}>
                    {t(new Date(lastAppointment?.[0]?.date).toDateString())}
                </text>
            </div>
        </div>
    );
};
SessionsCard.propTypes = {
    appointments: PropTypes.object,
    t: PropTypes.func
};

export const ProgressCardInfo = ({ t, appointments, invoice }) => {
    let finished = 1;
    if (appointments?.length > 0) {
        finished = finished + 1;
    }
    if (invoice) {
        finished = finished + 1;
    }
    if (invoice?.status === 'successful') {
        finished = finished + 1;
    }
    const invoiceDate = new Date(invoice?.updatedOn);
    const modifiedDate = new Date(invoiceDate.setMonth(invoiceDate.getMonth() + 3));
    if (new Date() > modifiedDate) {
        finished = finished + 1;
    }
    return (
        <div className={patienProfileSyle.UserCardInfoWrapper}>
            <h6 className={patienProfileSyle.labelWidht}>{`${t('Timeline')}`}</h6>

            <div className={patienProfileSyle.userinfoCard}>
                <div className={patienProfileSyle.flex1}>
                    <div className={patienProfileSyle.progressBarWrapper}>
                        <ProgressBar
                            t={t}
                            steps={[
                                'Signed up',
                                'Assessment',
                                'Received plan',
                                'Plan on going',
                                'Plan excuted'
                            ]}
                            finished={finished}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
ProgressCardInfo.propTypes = {
    invoice: PropTypes.object,
    appointments: PropTypes.object,
    t: PropTypes.func
};

export const ProgressBar = ({ t, steps, finished }) => {
    return steps.map((step, index) => {
        return (
            <div className={patienProfileSyle.progressBarContainer} key={index}>
                <div className={patienProfileSyle.progressBarSegmentContianer}>
                    <div
                        className={
                            index < finished
                                ? patienProfileSyle.progressBarOuterRingGreen
                                : patienProfileSyle.progressBarOuterRingGrey
                        }>
                        <div className={patienProfileSyle.progressBarWhiteRing}>
                            <div
                                className={
                                    index < finished
                                        ? patienProfileSyle.progressBarInnerCircleGreen
                                        : patienProfileSyle.progressBarInnerCircleGrey
                                }>
                                <CheckOutlined
                                    className={patienProfileSyle.progressBarCheckMarkIcon}
                                />
                            </div>
                        </div>
                    </div>
                    {index !== steps.length - 1 ? (
                        <div
                            className={
                                index < finished - 1
                                    ? patienProfileSyle.progressBarLineGreen
                                    : patienProfileSyle.progressBarLineGrey
                            }
                        />
                    ) : (
                        ''
                    )}
                    <div />
                </div>
                <text className={patienProfileSyle.progressBarStepText}>{t(step)}</text>
            </div>
        );
    });
};
ProgressBar.propTypes = {
    steps: PropTypes.Object,
    finished: PropTypes.number,
    t: PropTypes.func
};

export const UserCardInfo = ({ age, phone_number, topics, t }) => {
    let topicsWithSpaces = '';
    topics?.forEach((treat, index) => {
        topicsWithSpaces = topicsWithSpaces.concat(index === 0 ? '' : '| ', treat);
    });
    return (
        <div className={patienProfileSyle.UserCardInfoWrapper}>
            <h6 className={patienProfileSyle.labelWidht}>{`${t('patient')} ${t(
                'information'
            )}`}</h6>

            <div className={patienProfileSyle.userinfoCard}>
                <div className={patienProfileSyle.flex1}>
                    <div className={patienProfileSyle.columOneTwoWrapper}>
                        <div className={patienProfileSyle.columOneTwoWrapperColumOne}>
                            <RenderInfoText title={t('age')} info={`${age} Years`} />
                            <RenderInfoText title={t('phone')} info={phone_number} />
                        </div>
                        <div className={patienProfileSyle.columOneTwoWrapperColumTwo}>
                            <RenderInfoText title={t('CoveredTopics')} info={topicsWithSpaces} />
                        </div>
                        <div />
                    </div>
                </div>
            </div>
        </div>
    );
};
UserCardInfo.propTypes = {
    age: PropTypes.number,
    phone_number: PropTypes.string,
    topics: PropTypes.string,
    t: PropTypes.func
};
export const DbCarInfo = ({ t, diabetesType, diabetesStatus, treatment }) => {
    let treatmentWithSpaces = '';
    treatment?.forEach((treat, index) => {
        treatmentWithSpaces = treatmentWithSpaces.concat(index === 0 ? '' : '| ', treat?.treatment);
    });
    return (
        <div className={patienProfileSyle.diabetsInformationWrapper}>
            <h6 className={patienProfileSyle.labelWidht}>{`${t('Diabetes')} ${t(
                'information'
            )}`}</h6>
            <div className={patienProfileSyle.diabetsInformationWrapperOne}>
                <div className={patienProfileSyle.flex1}>
                    <div className={patienProfileSyle.columOneTwoWrapper}>
                        <div className={patienProfileSyle.columOneTwoWrapperColumOne}>
                            <RenderInfoText title={t('Patient Type')} info={diabetesType} />
                            <RenderInfoText title={t('Diabetes status')} info={diabetesStatus} />
                        </div>
                        <div className={patienProfileSyle.columOneTwoWrapperColumTwo}>
                            <text></text>
                            <RenderInfoText
                                title={t('Current treatment')}
                                info={treatmentWithSpaces}
                            />
                        </div>
                        <div />
                    </div>
                </div>
            </div>
        </div>
    );
};
DbCarInfo.propTypes = {
    t: PropTypes.func,
    diabetesType: PropTypes.string,
    diabetesStatus: PropTypes.string,
    treatment: PropTypes.string
};

export const RefCardInfo = ({ t, reasonForReferral, factorsEffectingLearning }) => (
    <div className={patienProfileSyle.diabetsInformationWrapper}>
        <h6 className={patienProfileSyle.labelWidht}>{`${t('Referral')} ${t('information')}`}</h6>
        <div className={patienProfileSyle.diabetsInformationWrapperOne}>
            <div className={patienProfileSyle.flex1}>
                <div className={patienProfileSyle.columOneTwoWrapper}>
                    <div className={patienProfileSyle.columOneTwoWrapperColumOne}>
                        <RenderInfoText
                            title={t('Reason of referral: ')}
                            info={reasonForReferral}
                        />
                        <RenderInfoText
                            title={t('Factors that may affect learning: ')}
                            info={factorsEffectingLearning}
                        />
                    </div>
                    <div className={patienProfileSyle.columOneTwoWrapperColumTwo}></div>
                    <div />
                </div>
            </div>
        </div>
    </div>
);
RefCardInfo.propTypes = {
    t: PropTypes.func,
    reasonForReferral: PropTypes.string,
    factorsEffectingLearning: PropTypes.string
};

export const NotesCard = ({ t, doctorNote }) => (
    <div className={patienProfileSyle.NotesCardWrapper}>
        <Col>
            <h6 className={patienProfileSyle.labelWidht}>{t('Notes')}</h6>
        </Col>
        <div className={patienProfileSyle.NotesCardWrapperInformation}>
            <div className={patienProfileSyle.NotesCardWrapperInformationNote}>
                <RenderInfoText title={t('Doctor recommendation & notes: ')} info={doctorNote} />
            </div>
            <div className={patienProfileSyle.NotesCardWrapperInformationViewHistoyWrapper}></div>
        </div>
    </div>
);
NotesCard.propTypes = {
    t: PropTypes.func,
    doctorNote: PropTypes.string
};

export const GoalsCard = ({ t, shortTermGoals, longTermGoals }) => (
    <div className={patienProfileSyle.diabetsInformationWrapper}>
        <div className={patienProfileSyle.diabetsInformationWrapperOne}>
            <div className={patienProfileSyle.flex1}>
                <div className={patienProfileSyle.goalsWrapperOne}>
                    <div className={patienProfileSyle.columOneTwoWrapperColumOne}>
                        <RenderInfoText title={t('Short Term Goals')} info={shortTermGoals} />
                    </div>
                    <div className={patienProfileSyle.columOneTwoWrapperColumTwo}>
                        <RenderInfoText title={t('Long Term Goals')} info={longTermGoals} />
                    </div>
                    <div />
                </div>
            </div>
        </div>
    </div>
);
GoalsCard.propTypes = {
    t: PropTypes.func,
    shortTermGoals: PropTypes.string,
    longTermGoals: PropTypes.string
};

export const PatientMedication = ({ t, medicationEffectingGlucose }) => (
    <div className={patienProfileSyle.diabetsInformationWrapper}>
        <h6 className={patienProfileSyle.labelWidht}>{}</h6>
        <div className={patienProfileSyle.diabetsInformationWrapperOne}>
            <div className={patienProfileSyle.flex1}>
                <div className={patienProfileSyle.columOneTwoWrapper}>
                    <div className={patienProfileSyle.columOneTwoWrapperColumOne}>
                        <RenderInfoText
                            title={t(
                                'Is the patient on medication that may affect blood glucose ?*'
                            )}
                            info={medicationEffectingGlucose}
                        />
                    </div>

                    <div />
                </div>
            </div>
        </div>
    </div>
);
PatientMedication.propTypes = {
    t: PropTypes.func,
    medicationEffectingGlucose: PropTypes.string
};

export const MedicalConditions = ({ t, otherHealthIssues, medicalHistory, chronics, acutes }) => {
    let medicalHistoryWithSpaces = '';
    medicalHistory?.forEach((med, index) => {
        medicalHistoryWithSpaces = medicalHistoryWithSpaces?.concat(index === 0 ? '' : '| ', med);
    });
    let acutesWithSpaces = '';
    acutes?.forEach((acute, index) => {
        acutesWithSpaces = acutesWithSpaces?.concat(index === 0 ? '' : '| ', acute?.condition);
    });
    let chronicsWithSpaces = '';
    chronics?.forEach((chronic, index) => {
        chronicsWithSpaces = chronicsWithSpaces?.concat(
            index === 0 ? '' : '| ',
            chronic?.condition
        );
    });
    return (
        <div className={patienProfileSyle.diabetsInformationWrapper}>
            <h6 className={patienProfileSyle.labelWidht}>{`${t('Medical')} ${t('Conditions')}`}</h6>
            <div className={patienProfileSyle.diabetsInformationWrapperOne}>
                <div className={patienProfileSyle.flex1}>
                    <div className={patienProfileSyle.columOneTwoWrapper}>
                        <div className={patienProfileSyle.columOneTwoWrapperColumOne}>
                            <RenderInfoText
                                title={t('Any other critical health issues')}
                                info={otherHealthIssues}
                            />
                            <RenderInfoText
                                title={t('Type of complications')}
                                info={chronicsWithSpaces}
                            />
                            <RenderInfoText title={t('Acute')} info={acutesWithSpaces} />
                        </div>
                        <div className={patienProfileSyle.columOneTwoWrapperColumTwo}>
                            <RenderInfoText
                                title={t("Patient's medical history")}
                                info={medicalHistoryWithSpaces}
                            />
                        </div>
                        <div />
                    </div>
                </div>
            </div>
        </div>
    );
};
MedicalConditions.propTypes = {
    t: PropTypes.func,
    otherHealthIssues: PropTypes.string,
    medicalHistory: PropTypes.string,
    chronics: PropTypes.object,
    acutes: PropTypes.object
};

export const AvatarWithEdit = ({ name }) => (
    <div className={patienProfileSyle.avatarWrapper}>
        <div className={patienProfileSyle.avatarWrapperIconAndName}>
            <div className={patienProfileSyle.personIconWrapper}>
                <Image width={75} height={75} src="/assets/images/educatorPink.png" />
            </div>
            <h3 className={patienProfileSyle.avatarWrapperIconAndNameAvatarName}>{name}</h3>
            <GenderIcon />
        </div>
        <EditIcon />
    </div>
);
AvatarWithEdit.propTypes = {
    name: PropTypes.string
};

const RenderInfoText = ({ title, info }) => (
    <h6 className={patienProfileSyle.infoTexthead}>
        <b className={patienProfileSyle.infoTextvalue}>{title} : </b>
        <b className={patienProfileSyle.infoTextvalueValue}> {info}</b>
    </h6>
);
RenderInfoText.propTypes = {
    title: PropTypes.string,
    info: PropTypes.string
};

export const DividerLine = () => <div className={patienProfileSyle.dvider} />;
