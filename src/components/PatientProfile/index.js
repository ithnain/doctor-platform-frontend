import { EditIcon, GenderIcon } from '@utils/svg/patientProfile';
import Link from 'next/link';
import { Col } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import patienProfileSyle from '@styles/PatientProfile.module.scss';
import Image from 'next/image';

export const UserCardInfo = ({ age, phone_number, city, t }) => (
    <div className={patienProfileSyle.UserCardInfoWrapper}>
        <h6 className={patienProfileSyle.labelWidht}>{`${t('patient')} ${t('information')}`}</h6>

        <div className={patienProfileSyle.userinfoCard}>
            <div className={patienProfileSyle.flex1}>
                <div className={patienProfileSyle.columOneTwoWrapper}>
                    <div className={patienProfileSyle.columOneTwoWrapperColumOne}>
                        <RenderInfoText title={t('age')} info={age} />
                        <RenderInfoText title={t('phone')} info={phone_number} />
                        <RenderInfoText title={t('city')} info={city} />
                    </div>
                    <div className={patienProfileSyle.columOneTwoWrapperColumTwo}>
                        <RenderInfoText title={t('CoveredTopics')} info="xxx,xxxxx,xxxxx" />
                    </div>
                    <div />
                </div>
            </div>
            <a className={patienProfileSyle.basicButton}>{t('viewHistory')} </a>
        </div>
    </div>
);
UserCardInfo.propTypes = {
    age: PropTypes.number,
    phone_number: PropTypes.string,
    city: PropTypes.string,
    t: PropTypes.func
};
export const DbCarInfo = ({ t }) => (
    <div className={patienProfileSyle.diabetsInformationWrapper}>
        <h6 className={patienProfileSyle.labelWidht}>{`${t('Diabetes')} ${t('information')}`}</h6>
        <div className={patienProfileSyle.diabetsInformationWrapperOne}>
            <div className={patienProfileSyle.flex1}>
                <div className={patienProfileSyle.columOneTwoWrapper}>
                    <div className={patienProfileSyle.columOneTwoWrapperColumOne}>
                        <RenderInfoText title={t('patientType')} info=" " />
                        <RenderInfoText title={t('patientType')} info=" " />
                        <RenderInfoText title={t('ResponsableOfPatient')} info=" " />
                        <RenderInfoText title={t('PatientIsOn')} info=" " />
                        {/* <RenderInfoText title={t('ISF')} info={ISF} /> */}
                        {/* <RenderInfoText title={t('IC')} info={I_C} /> */}
                        {/* <RenderInfoText title={t('SlidingSclae')} info={sliding_scale} /> */}
                        {/* <RenderInfoText title={t('CriticalHealthIssue')} info={health_issues[0]} /> */}
                    </div>
                    <div className={patienProfileSyle.columOneTwoWrapperColumTwo}>
                        <RenderInfoText title={t('MedicalConditions')} info="xxx,xxxxx,xxxxx" />
                    </div>
                    <div />
                </div>
            </div>
            <a className={patienProfileSyle.basicButton}>{t('viewHistory')} </a>
        </div>
    </div>
);
DbCarInfo.propTypes = {
    t: PropTypes.func,
    ISF: PropTypes.string,
    sliding_scale: PropTypes.string,
    is_other_health_issues: PropTypes.bool,
    I_C: PropTypes.string,
    health_issues: PropTypes.string
};

export const NotesCard = ({ note, t }) => (
    <div className={patienProfileSyle.NotesCardWrapper}>
        <Col>
            <h6 className={patienProfileSyle.labelWidht}>{t('Notes')}</h6>
        </Col>
        <div className={patienProfileSyle.NotesCardWrapperInformation}>
            <div className={patienProfileSyle.NotesCardWrapperInformationNote}>
                <h6 className={patienProfileSyle.infoTextvalue}>
                    {t('DoctorRecommendationNotes')}
                </h6>
                <p className={patienProfileSyle.infoTextvalueValue}>{note}</p>
            </div>
            <div className={patienProfileSyle.NotesCardWrapperInformationViewHistoyWrapper}>
                <a className={patienProfileSyle.NotesCardWrapperInformationViewHistoyWrapperBtn}>
                    {t('ViewAllNotes')}
                </a>
                <a className={patienProfileSyle.basicButtonBlue}>{t('EditNotes')}</a>
            </div>
        </div>
    </div>
);
NotesCard.propTypes = {
    note: PropTypes.string,
    t: PropTypes.func
};

export const AvatarWithEdit = ({ name, id }) => {
    return (
        <div className={patienProfileSyle.avatarWrapper}>
            <div className={patienProfileSyle.avatarWrapperIconAndName}>
                <div className={patienProfileSyle.personIconWrapper}>
                    <Image width={75} height={75} src="/assets/images/educatorPink.png" />
                </div>
                <h3 className={patienProfileSyle.avatarWrapperIconAndNameAvatarName}>{name}</h3>
                <GenderIcon />
            </div>
            <Link
                href={{
                    pathname: `/create-patient`,
                    query: { id }
                }}>
                <div>
                    <EditIcon />
                </div>
            </Link>
        </div>
    );
};
AvatarWithEdit.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string
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
