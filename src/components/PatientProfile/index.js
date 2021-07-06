import React from "react";
import patienProfileSyle from "@styles/PatientProfile.module.scss";
import { Col } from "antd";
import { PersonIcon, GenderIcon, EditIcon } from "@utils/svg/patientProfile";
import authenticatedRoute from "@components/AuthenticatedRoute";
import PropTypes from "prop-types";

export const UserCardInfo = ({ age, phone_number, city, t }) => (
  <div className={patienProfileSyle.UserCardInfoWrapper}>
    <h6 className={patienProfileSyle.labelWidht}>{`${t("patinet")} ${t(
      "information"
    )}`}</h6>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        flex: 1,
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1 }}>
        <div className={patienProfileSyle.columOneTwoWrapper}>
          <div className={patienProfileSyle.columOneTwoWrapperColumOne}>
            <RenderInfoText title={t("age")} info={age} />
            <RenderInfoText title={t("phone")} info={phone_number} />
            <RenderInfoText title={t("city")} info={city} />
          </div>
          <div className={patienProfileSyle.columOneTwoWrapperColumTwo}>
            <RenderInfoText title={t("CoveredTopics")} info="xxx,xxxxx,xxxxx" />
          </div>
          <div />
        </div>
      </div>
      <a className={patienProfileSyle.basicButton}>{t("viewHistory")} </a>
    </div>
  </div>
);
export const DbCarInfo = ({
  t,
  ISF,
  sliding_scale,
  is_other_health_issues,
  I_C,
  health_issues,
}) => (
  <div className={patienProfileSyle.diabetsInformationWrapper}>
    <h6 className={patienProfileSyle.labelWidht}>{`${t("Diabetes")} ${t(
      "information"
    )}`}</h6>
    <div className={patienProfileSyle.diabetsInformationWrapperOne}>
      <div style={{ flex: 1 }}>
        <div className={patienProfileSyle.columOneTwoWrapper}>
          <div className={patienProfileSyle.columOneTwoWrapperColumOne}>
            <RenderInfoText title={t("patientType")} info="I" />
            <RenderInfoText title={t("patientType")} info="xxxxxxxxxxxx" />
            <RenderInfoText title={t("ResponsableOfPatient")} info="Paris" />
            <RenderInfoText title={t("PatientIsOn")} info="Paris" />
            <RenderInfoText title={t("ISF")} info={ISF} />
            <RenderInfoText title={t("IC")} info={I_C} />
            <RenderInfoText title={t("SlidingSclae")} info={sliding_scale} />
            <RenderInfoText
              title={t("CriticalHealthIssue")}
              info={health_issues[0]}
            />
          </div>
          <div className={patienProfileSyle.columOneTwoWrapperColumTwo}>
            <RenderInfoText
              title={t("MedicalConditions")}
              info="xxx,xxxxx,xxxxx"
            />
          </div>
          <div />
        </div>
      </div>
      <a className={patienProfileSyle.basicButton}>{t("viewHistory")} </a>
    </div>
  </div>
);

export const NotesCard = ({ note, t }) => (
  <div className={patienProfileSyle.NotesCardWrapper}>
    <Col>
      <h6 className={patienProfileSyle.labelWidht}>{t("Notes")}</h6>
    </Col>
    <div className={patienProfileSyle.NotesCardWrapperInformation}>
      <div className={patienProfileSyle.NotesCardWrapperInformationNote}>
        <h6 className={patienProfileSyle.infoTextvalue}>
          {t("DoctorRecommendationNotes")}
        </h6>
        <p className={patienProfileSyle.infoTextvalueValue}>{note}</p>
      </div>
      <div
        className={
          patienProfileSyle.NotesCardWrapperInformationViewHistoyWrapper
        }
      >
        <a
          className={
            patienProfileSyle.NotesCardWrapperInformationViewHistoyWrapperBtn
          }
        >
          {t("ViewAllNotes")}
        </a>
        <a className={patienProfileSyle.basicButtonBlue}>{t("EditNotes")}</a>
      </div>
    </div>
  </div>
);

export const AvatarWithEdit = ({ name }) => (
  <div className={patienProfileSyle.avatarWrapper}>
    <div className={patienProfileSyle.avatarWrapperIconAndName}>
      <div className={patienProfileSyle.personIconWrapper}>
        <PersonIcon />
      </div>
      <h3 className={patienProfileSyle.avatarWrapperIconAndNameAvatarName}>
        {name}
      </h3>
      <GenderIcon />
    </div>
    <EditIcon />
  </div>
);

export const RenderInfoText = ({ title, info }) => (
  <h6 className={patienProfileSyle.infoTexthead}>
    <b className={patienProfileSyle.infoTextvalue}>{title} :</b>{" "}
    <b className={patienProfileSyle.infoTextvalueValue}> {info}</b>
  </h6>
);
export const DividerLine = () => <div className={patienProfileSyle.dvider} />;
