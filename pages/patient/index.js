import React from "react";
import { Col, ConfigProvider, Pagination, Row, Typography, Button } from "antd";
import { ManOutlined, UserOutlined, UploadOutlined } from "@ant-design/icons";
import patienProfileSyle from "@styles/PatientProfile.module.scss";
import useTranslation from "next-translate/useTranslation";

import PropTypes from "prop-types";

export default () => {
  const { t } = useTranslation("patient");

  return (
    <Col className={patienProfileSyle.wrapper}>
      <Col className={patienProfileSyle.rectangle}>
        <h4 className={patienProfileSyle.headerTitle}>{t("PatientProfile")}</h4>
        <Row className={patienProfileSyle.headerWrapper}>
          <Row align="center">
            <UserOutlined />
            <h4 className={patienProfileSyle.patientName}>Abdullah Ali</h4>
            <ManOutlined />
          </Row>
          <UploadOutlined />
        </Row>
        <Row className={patienProfileSyle.rowInformation}>
          <Col>
            <h5 className={patienProfileSyle.rowInformationTitle}>
              {t("patient")}
            </h5>
            <h5 className={patienProfileSyle.rowInformationTitle}>
              {t("information")}
            </h5>
          </Col>
          <Col>
            <Row>
              <h6>{`${t("age")} :`}</h6>
              <h6> 3</h6>
            </Row>
            <Row>
              <h6>{`${t("phone")} :`}</h6>
              <h6>0590370182</h6>
            </Row>
          </Col>

          <Col className={patienProfileSyle.rowInformationSecondColoum}>
            <Row>
              <h6>{`${t("CoveredTopics")} :`}</h6>
              <h6> Diet , Lifestyle , Exercise</h6>
            </Row>
          </Col>
        </Row>
        <div className={patienProfileSyle.rowInformationSeprator} />
        <Row className={patienProfileSyle.rowInformation}>
          <Col>
            <h5 className={patienProfileSyle.rowInformationTitle}>
              {" "}
              <h6>{`${t("Diabetes")} :`}</h6>
            </h5>
            <h5 className={patienProfileSyle.rowInformationTitle}>
              {t("information")}
            </h5>
          </Col>
          <Col>
            <Row>
              <h6>{`${t("patientType")} :`}</h6>
              <h6> 3</h6>
            </Row>
            <Row>
              <h6>{`${t("ResponsableOfPatient")} :`}</h6>
              <h6>0590370182</h6>
            </Row>
            <Row>
              <h6>{`${t("PatientIsOn")} :`}</h6>
              <h6>0590370182</h6>
            </Row>
            <Row>
              <h6>{`${t("ISF")} :`}</h6>
              <h6>0590370182</h6>
            </Row>
            <Row>
              <h6>{`${t("IC")} :`}</h6>
              <h6>0590370182</h6>
            </Row>
            <Row>
              <h6>{`${t("SlidingSclae")} :`}</h6>
              <h6>0590370182</h6>
            </Row>
            <Row>
              <h6>{`${t("CriticalHealthIssue")} :`}</h6>
              <h6>0590370182</h6>
            </Row>
          </Col>

          <Col className={patienProfileSyle.rowInformationSecondColoum}>
            <Row>
              <h6>{`${t("MedicalCondition")} :`}</h6>
              <h6> Diet , Lifestyle , Exercise</h6>
            </Row>
          </Col>
          <Col>
            <button className={patienProfileSyle.btnRed}>
              <div className={patienProfileSyle.btnCenter}> view history </div>
            </button>
          </Col>
        </Row>
        <div className={patienProfileSyle.rowInformationSeprator} />
        <Row className={patienProfileSyle.rowInformation}>
          <Col>
            <h5 className={patienProfileSyle.rowInformationTitle}>Notes</h5>
          </Col>
          <Col style={{ flex: 3 }}>
            <h6>{`${t("DoctorRecommendationNotes")} :`}</h6>
            <h6> this is amazing notes from the doctor to the patient</h6>
          </Col>

          <Col className={patienProfileSyle.rowInformationSecondColoum}>
            <Row />
          </Col>
          <Col>
            <button className={patienProfileSyle.btnRed}>
              <div className={patienProfileSyle.btnCenter}>
                <h6>{`${t("viewHistory")}`}</h6>
              </div>
            </button>

            <button className={patienProfileSyle.btnBlue}>
              <div className={patienProfileSyle.btnCenterBlue}>
                <h6>{`${t("viewHistory")}`}</h6>
              </div>
            </button>
          </Col>
        </Row>
        <div className={patienProfileSyle.rowInformationSeprator} />
      </Col>
    </Col>
  );
};
