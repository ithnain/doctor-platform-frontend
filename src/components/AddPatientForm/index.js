import { Col, ConfigProvider, Form, Row, Typography, notification } from 'antd';
import { QueryClient, dehydrate, useMutation, useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';

import API from '@src/utils/axios';
import CustomButton from '../CustomBtn';
import DiabetesComplications from './DiabetesComplications';
import DiabetesInfo from './DiabetesInfo';
import DoctorNote from './DoctorNote';
import EffectGlocuse from './EffectGlocuse';
import FactorsAffectLearning from './FactorsAffectLearning';
import Goals from './Goals';
import HealthIssues from './HealthIssues';
import MedicalHistory from './MedicalHistory';
import PatienInfo from './PatienInfo';
import ReasonsForRefeal from './ReasonsForRefeal';
import RecommendationGlycemicRange from './RecommendationGlycemicRange';
import styles from './Patient.module.scss';
import useTranslation from 'next-translate/useTranslation';

const { Title, Text } = Typography;

const getInsuline = async () => {
    return API.get(`/insuline-type`);
};

const index = ({ direction, userData }) => {
    const { t } = useTranslation('create-patient');
    const [form] = Form.useForm();
    const [errorsCreatingPatient, setErrorsCreatingPatient] = useState([]);
    const [createdPatientSuccess, setCreatedPatientSuccess] = useState(false);
    const [insulineDoseSelectArray, setInsulineDoseSelectArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const { data: insulineType } = useQuery('insulineTypes', getInsuline);

    useEffect(() => {
        if (createdPatientSuccess) {
            notification.success({
                message: t('Created patient successfully')
            });
            form.resetFields();
        }
    }, [createdPatientSuccess]);

    const [, setTreatmentTypeOption] = useState(null);
    const [diabeticKetoacidosis, setDiabeticketoacidosis] = useState(false);

    const [insulineTypeSelect, setInsulineType] = useState(null);

    const [currentTreatmentShow, setCurrentTreatmentShow] = useState(false);
    const [chronicShow, setChronicShow] = useState(false);
    const [acuteShow, setAcuteShow] = useState(false);

    const onValuesChange = ({
        diabetesComplications,
        treatmentType,
        insulineType,
        isf,
        acuteSelect,
        chronicSelect
    }) => {
        if (isf) {
            isf = isf.toString().substring(0, 1) + ':' + isf.toString().substring(1, isf.length);
        }

        if (
            Array.isArray(diabetesComplications) &&
            diabetesComplications &&
            diabetesComplications.includes('Acute')
        ) {
            setAcuteShow(true);
        } else if (
            Array.isArray(diabetesComplications) &&
            !diabetesComplications.includes('Acute')
        ) {
            setAcuteShow(false);
            acuteSelect = [];
        }
        if (
            Array.isArray(diabetesComplications) &&
            diabetesComplications &&
            diabetesComplications.includes('Chronic')
        ) {
            setChronicShow(true);
        } else if (
            Array.isArray(diabetesComplications) &&
            !diabetesComplications.includes('Chronic')
        ) {
            setChronicShow(false);
            chronicSelect.length = 0;
        }

        if (acuteSelect && acuteSelect.includes('DIABETIC_KETOACIDOSIS')) {
            setDiabeticketoacidosis(true);
        } else if (acuteSelect && !acuteSelect.includes('DIABETIC_KETOACIDOSIS')) {
            setDiabeticketoacidosis(false);
        }
        if (treatmentType && treatmentType === 'INSULINE') {
            setTreatmentTypeOption(treatmentType);
            setCurrentTreatmentShow(true);
        } else if (treatmentType && treatmentType !== 'INSULINE') {
            setTreatmentTypeOption(treatmentType);
            setCurrentTreatmentShow(false);
        }

        if (insulineType) {
            setInsulineType(insulineType);
        }
    };

    useEffect(() => {
        insulineTypeSelect &&
            setInsulineDoseSelectArray(
                insulineType?.data.filter((type) => type.type === insulineTypeSelect)
            );
    }, [insulineTypeSelect]);
    useEffect(() => {
        if (errorsCreatingPatient?.length) {
            notification.error({
                message: t('Error Creating patient'),
                description: errorsCreatingPatient.join(', \n')
            });
        }
    }, [errorsCreatingPatient]);
    const createPatient = async (credintials) => {
        const data = {
            doctorId: userData?.data.id,
            name: credintials?.name?.trim(),
            gender: credintials.gender,
            age: credintials.age,
            phoneNumber: credintials?.phoneNumber,
            remarkableNote: credintials?.remarkableNote?.trim(),
            diabetesType: credintials?.diabetesType,
            diabetesStatus: credintials?.diabetesStatus,
            diabetesDuration: credintials?.diabetesDuration?._d,
            reasonForReferral: credintials?.reasonForReferral,
            factorsEffectinglearning: credintials?.factorsEffectinglearning,
            short_term_goals: credintials?.short_term_goals,
            long_term_goals: credintials?.long_term_goals,
            medicationEffectingGlucose: credintials?.medicationEffectingGlucose,
            recommendationGlycemicRange: credintials?.recommendationGlycemicRange,
            doctorNote: credintials?.doctorNote,
            medicalHistory: credintials?.medicalHistory,
            otherHealthIssues: credintials?.otherHealthIssues || [credintials.OotherHealthIssues],
            insulineTime: credintials?.insulineTime?._d,
            currentTreatments:
                credintials?.treatmentType === 'INSULINE'
                    ? [
                          {
                              units: credintials?.insulineUnit,
                              treatment: credintials?.treatmentType,
                              doseType: credintials?.insulineType,
                              numberOfDoses: credintials?.insulineDose,
                              I_C: credintials?.I ? `${credintials?.I}:${credintials.C}` : '',
                              ISF: credintials?.isf,
                              breakfast: credintials?.breakfast,
                              lunch: credintials?.lunch,
                              dinner: credintials?.dinner
                          }
                      ]
                    : [
                          {
                              treatment: credintials?.treatmentType
                          }
                      ],
            acutes:
                credintials?.acuteSelect?.length >= 1
                    ? {
                          condition: credintials?.acuteSelect,
                          times: Number(credintials?.DKAtimes),
                          severity: credintials?.Severity
                      }
                    : [],
            chronics:
                credintials?.chronicSelect?.length >= 1
                    ? [
                          {
                              condition: credintials?.chronicSelect
                          }
                      ]
                    : []
        };
        API.post('patient/createPatient', data).then((res) => {
            try {
                if (res.status === 201) {
                    setCreatedPatientSuccess(true);
                    setLoading(false);
                }
                setTimeout(() => {
                    setCreatedPatientSuccess(false);
                    setDiabeticketoacidosis(false);
                    setInsulineType(null);
                    setCurrentTreatmentShow(false);
                    setChronicShow(false);
                    setAcuteShow(false);
                }, 3000);
            } catch (error) {
                if (error?.response?.data?.error?.message) {
                    // TO DO  if RTL ? or LTR
                    setErrorsCreatingPatient([error.response.data.error.message.en]);
                } else if (error?.response?.data?.message?.length) {
                    setErrorsCreatingPatient(error.response.data.message);
                } else {
                    setErrorsCreatingPatient([t('Error in the server')]);
                }
                setLoading(false);
            }
        });
    };
    const { mutate: signMutate } = useMutation((credintials) => createPatient(credintials));
    const onFinish = async (values) => {
        signMutate(values);
    };
    // {
    //     isError &&
    //         notification.warn({
    //             message: t('Error in the server')
    //         });
    // }
    return (
        <ConfigProvider direction={direction}>
            <div
                className={
                    direction === 'rtl' ? `${styles.form_containerRTL}` : `${styles.form_container}`
                }>
                <Title className={styles.title__registration}>{t('Register Patient')}</Title>
                <Form
                    form={form}
                    layout={'vertical'}
                    name="register"
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                    scrollToFirstError>
                    <Row type="flex" justify="space-around" align="flex-start">
                        <Col lg={7} xs={24} className={styles.patient_register_column}>
                            <Row type="flex" justify="start">
                                <PatienInfo styles={styles} t={t} />
                                <DiabetesInfo
                                    styles={styles}
                                    t={t}
                                    currentTreatmentShow={currentTreatmentShow}
                                    insulineTypes={insulineType?.data}
                                    insulineDoseSelectArray={insulineDoseSelectArray}
                                />
                            </Row>
                        </Col>
                        <Col lg={7} sm={24} className={styles.patient_register_column}>
                            <Row>
                                <Col sm={24} className={styles.patient_register_column}>
                                    <div className={styles.title_form}>
                                        <Text className={styles.title_form}>
                                            {t('ReferalInformation')}
                                        </Text>
                                    </div>
                                    <div className={styles.patient_register_column_wrapper}>
                                        <ReasonsForRefeal styles={styles} t={t} />
                                        <FactorsAffectLearning styles={styles} t={t} />
                                    </div>
                                </Col>
                                <Col xs={24} className={styles.patient_register_column}>
                                    <div
                                        className={`w-100 ${styles.patient_register_column_wrapper}`}>
                                        <Goals styles={styles} t={t} />
                                    </div>
                                </Col>
                                <Col xs={24} className={styles.patient_register_column}>
                                    <div
                                        className={`w-100 ${styles.patient_register_column_wrapper}`}>
                                        <EffectGlocuse styles={styles} t={t} />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={24} lg={7} className={styles.patient_register_column}>
                            <Row xs={24}>
                                <Col xs={24}>
                                    <Text className={styles.title_form}>
                                        {t('Medical  Conditions')}
                                    </Text>
                                    <div className={styles.patient_register_column_wrapper}>
                                        <HealthIssues styles={styles} t={t} />
                                        <DiabetesComplications
                                            styles={styles}
                                            t={t}
                                            acuteShow={acuteShow}
                                            diabeticKetoacidosis={diabeticKetoacidosis}
                                            chronicShow={chronicShow}
                                        />
                                        <MedicalHistory styles={styles} t={t} />
                                        <RecommendationGlycemicRange styles={styles} t={t} />
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        <Col lg={23} className={`w-100 ${styles.patient_register_column}`}>
                            <div className={`w-100 ${styles.patient_register_column_wrapper}`}>
                                <DoctorNote styles={styles} t={t} />
                            </div>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle">
                        <Form.Item>
                            <CustomButton
                                htmlType="submit"
                                text={t('Register')}
                                className={`${styles.btn_text}`}
                                loading={loading}
                            />
                        </Form.Item>
                    </Row>
                </Form>
            </div>
        </ConfigProvider>
    );
};
export const getServerSideProps = async () => {
    const qClient = new QueryClient();
    await qClient.prefetchQuery('insulineTypes', getInsuline);

    return {
        props: {
            dehydratedState: dehydrate(qClient)
        }
    };
};
export default index;
