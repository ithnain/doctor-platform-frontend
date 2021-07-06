import React from "react";
import patienProfileSyle from "@styles/PatientProfile.module.scss";
import useTranslation from "next-translate/useTranslation";
import { Col } from "antd";
import { PersonIcon, GenderIcon, EditIcon } from "@utils/svg/patientProfile";
import authenticatedRoute from "@components/AuthenticatedRoute";

import { useRouter } from "next/router";
import API from "@utils/axios";

const PatientProfile = ({ patient }) => {
  const { t } = useTranslation();

  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (!patient) return <h1>not found</h1>;
  return (
    <div style={{ direction: "ltr" }} className={patienProfileSyle.wrapper}>
      <AvatarWithEdit name={patient.name} />
      <UserCardInfo
        age={patient.age}
        phone_number={patient.phone_number}
        city={patient.city}
      />
      <DividerLine />
      <DbCarInfo
        t={t}
        ISF={patient.ISF}
        sliding_scale={patient.sliding_scale}
        is_other_health_issues={ipatient.s_other_health_issues}
        I_C={patient.I_C}
        health_issues={patient.health_issues}
      />
      <DividerLine />
      <NotesCard note={patient.note} t={t} />
    </div>
  );
};

const UserCardInfo = ({ age, phone_number, city }) => (
  <div className={patienProfileSyle.UserCardInfoWrapper}>
    <h6 className={patienProfileSyle.labelWidht}>Patient Information</h6>
    <div style={{ flex: 1 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <RenderInfoText title="Age" info={age} />
        <RenderInfoText title="Coverd Topics" info="xxx,xxxxx,xxxxx" />
        <div />
      </div>
      <RenderInfoText title="Phone" info={phone_number} />
      <RenderInfoText title="City" info={city} />
    </div>
  </div>
);
const DbCarInfo = ({
  t,
  ISF,
  sliding_scale,
  is_other_health_issues,
  I_C,
  health_issues,
}) => (
  // not found Patient Type   responsable of patient // pateint is on //
  <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
    <h6 className={patienProfileSyle.labelWidht}>DataBase Information</h6>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flex: 1,
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1, minWidth: 200 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <RenderInfoText title={t("patientType")} info="I" />
          <RenderInfoText title={t("CoveredTopics")} info="xxx,xxxxx,xxxxx" />
          <div />
        </div>
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
      <a className={patienProfileSyle.basicButton}>View History </a>
    </div>
  </div>
);

const NotesCard = ({ note, t }) => (
  <div className={patienProfileSyle.NotesCardWrapper}>
    <Col>
      <h6 className={patienProfileSyle.NotesCardWrapperName}>
        {t("DataBase")}
      </h6>
      <h6 className={patienProfileSyle.NotesCardWrapperName}>
        {t("information")}
      </h6>
    </Col>
    <div className={patienProfileSyle.NotesCardWrapperInformation}>
      <div className={patienProfileSyle.NotesCardWrapperInformationNote}>
        <h6 style={{ margin: 0 }}>{t("DoctorRecommendationNotes")}</h6>
        <p className={patienProfileSyle.NotesCardWrapperInformationNoteText}>
          {note}
        </p>
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

const AvatarWithEdit = ({ name }) => (
  <div className={patienProfileSyle.avatarWrapper}>
    <div className={patienProfileSyle.avatarWrapperIconAndName}>
      <PersonIcon />
      <h3 className={patienProfileSyle.avatarWrapperIconAndNameAvatarName}>
        {name}
      </h3>
      <GenderIcon />
    </div>
    <EditIcon />
  </div>
);

const RenderInfoText = ({ title, info }) => (
  <h6 className={patienProfileSyle.infoTexthead}>
    <b className={patienProfileSyle.infoTextvalue}>{title} :</b>{" "}
    <b className={patienProfileSyle.infoTextvalueValue}> {info}</b>
  </h6>
);
const DividerLine = () => <div className={patienProfileSyle.dvider} />;

export async function getServerSideProps({ params, req }) {
  let patient = null;
  try {
    const res = await API.get(`patient/patient?id=${params.id}`, {
      headers: {
        Authorization: `Bearer ${req.cookies.token}`,
      },
    });
    patient = res.data;
  } catch (error) {}

  return { props: { patient } };
}

export default authenticatedRoute(PatientProfile, {
  pathAfterFailure: "/login",
});
