import { Col, Form, Row, Typography, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { registerPatient } from '@redux/actions/patient';
import styles from './Patient.module.scss';
import useTranslation from 'next-translate/useTranslation';

// import { insulineDoses, insulineTypes } from './insuline';

const { Title, Text } = Typography;

const index = ({ direction }) => {
    const { t } = useTranslation('create-patient');
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [errorsCreatingPatient, setErrorsCreatingPatient] = useState([]);
    const [createdPatientSuccess, setCreatedPatientSuccess] = useState(false);
    const [insulineDoseSelectArray, setInsulineDoseSelectArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const [insulineTypes, setInsulineTypes] = useState([]);

    useEffect(() => {
        API.get('/insuline-type').then((data) => {
            setInsulineTypes(data.data);
        });
    }, []);
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
                insulineTypes.filter((type) => type.type === insulineTypeSelect)
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

    const onFinish = async (values) => {
        const data = {
            name: values?.name?.trim(),
            doctorId: user.data.id,
            gender: values.gender,
            age: values.age,
            phoneNumber: values?.phoneNumber,
            remarkableNote: values?.remarkableNote?.trim(),
            diabetesType: values?.diabetesType,
            diabetesStatus: values?.diabetesStatus,
            diabetesDuration: values?.diabetesDuration?._d,
            reasonForReferral: values?.reasonForReferral,
            factorsEffectinglearning: values?.factorsEffectinglearning,
            shortTermGoals: values?.short_term_goals,
            longTermGoals: values?.long_term_goals,
            medicationEffectingGlucose: values?.medicationEffectingGlucose,
            recommendationGlycemicRange: values?.recommendationGlycemicRange,
            doctorNote: values?.doctorNote,
            medicalHistory: values?.medicalHistory,
            otherHealthIssues: values?.otherHealthIssues || [values.OotherHealthIssues],
            insulineTime: values?.insulineTime?._d,
            currentTreatments:
                values?.treatmentType === undefined
                    ? null
                    : values?.treatmentType === 'INSULINE'
                    ? [
                          {
                              units: values?.insulineUnit,
                              treatment: values?.treatmentType,
                              doseType: values?.insulineType,
                              numberOfDoses: values?.insulineDose,
                              I_C: values?.I ? `${values?.I}:${values.C}` : '',
                              ISF: values?.isf,
                              breakfast: values?.breakfast,
                              lunch: values?.lunch,
                              dinner: values?.dinner
                          }
                      ]
                    : [
                          {
                              treatment: values?.treatmentType
                          }
                      ],
            acutes: values?.acuteSelect?.map((ac) => {
                if (ac === 'DIABETIC_KETOACIDOSIS') {
                    return {
                        condition: ac,
                        times: Number(values?.DKAtimes),
                        severity: values?.Severity
                    };
                }
                return {
                    condition: ac
                };
            }),
            chronics: values?.chronicSelect?.map((ch) => {
                return {
                    condition: ch
                };
            })
        };

        try {
            setLoading(true);
            const res = await API.post('patient/createPatient', data, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (res.status === 201) {
                dispatch(registerPatient(res.data));
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
    };

    return (
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
                                insulineTypes={insulineTypes}
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
                                <div className={`w-100 ${styles.patient_register_column_wrapper}`}>
                                    <Goals styles={styles} t={t} />
                                </div>
                            </Col>
                            <Col xs={24} className={styles.patient_register_column}>
                                <div className={`w-100 ${styles.patient_register_column_wrapper}`}>
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
    );
};

export default index;
