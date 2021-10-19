import { Checkbox, Col, Form, Input, Radio, Row, Space, Typography, notification } from 'antd';
import React, { useEffect, useState } from 'react';
// import { insulineDoses, insulineTypes } from './insuline';
import { useDispatch, useSelector } from 'react-redux';

import API from '@src/utils/axios';
import CustomButton from '../CustomBtn';
import DiabetesInfo from './DiabetesInfo';
import PatienInfo from './PatienInfo';
import { registerPatient } from '@redux/actions/patient';
import styles from './Patient.module.scss';
import useTranslation from 'next-translate/useTranslation';

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
    // const [IMASK, setIMASK] = useState(null);
    // const [CMASK, setCMASK] = useState(null);

    // const [ISFMASK, setISFMASK] = useState(null);

    useEffect(() => {
        if (!user || !user.data.accessToken) {
            // enable this after we have the token in redux
            // dispatch(clearUser())
            // router.push("/login");
        }
    }, [user]);
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
    // const [diabetesComplicationsShow] = useState([]);
    // const [acuteArray, setAcuteArray] = useState(null);
    // const [chronicArray, setChronicArray] = useState(null);
    const [treatmentTypeOption, setTreatmentTypeOption] = useState(null);
    const [diabeticKetoacidosis, setDiabeticketoacidosis] = useState(false);

    const [insulineTypeSelect, setInsulineType] = useState(null);
    // const [insulineDoseSelect, setInsulineDoseSelect] = useState(null);

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
        // if (I) {
        //     setIMASK(I);
        // }
        // if (C) {
        //     setCMASK(C);
        // }
        if (isf) {
            isf = isf.toString().substring(0, 1) + ':' + isf.toString().substring(1, isf.length);
        }
        // if (acuteArray) {
        //     setAcuteShow(true);
        //     !acuteArray && setAcuteArray([]);
        // }
        // console.log(acuteArray);
        // console.log(diabetesComplications);
        // if (chronicArray) {
        //     setChronicShow(true);
        //     !chronicArray && setChronicArray([]);
        // }
        // if (Array.isArray(diabetesComplications) && diabetesComplications.length === 0) {
        //     setChronicShow(false);
        //     setAcuteShow(false);
        // }
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
            chronicSelect = [];
        }
        // if (diabetesComplicationsShow === []) {
        //     setAcuteShow(false);
        //     setChronicShow(false);
        // }
        // if (Array.isArray(chronicSelect) && chronicSelect.length >= 1) {
        //     setChronicArray([...chronicSelect]);
        // }

        // if (Array.isArray(acuteSelect) && acuteSelect.length >= 1) {
        //     setAcuteArray([...acuteSelect]);
        // }

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
        // if (treatmentType === 'INSULINE') {
        //     setCurrentTreatmentShow(true);
        // } else {
        //     setCurrentTreatmentShow(false);
        // }
        // if (
        //     (treatmentType === undefined || treatmentType === 'INSULINE') &&
        //     (isf ||
        //         I ||
        //         C ||
        //         insulineTypeSelect ||
        //         insulineDoseSelect ||
        //         insulineType ||
        //         insulineDose)
        // ) {
        //     setCurrentTreatmentShow(true);
        //     insulineType && setInsulineType(insulineType);
        //     insulineDose && setInsulineDoseSelect(insulineDose);
        // }
        // if (treatmentType && treatmentType !== 'Insuline') {
        //     insulineType && setInsulineType(null);
        //     insulineDose && setInsulineDoseSelect(null);
        // }
        if (insulineType) {
            setInsulineType(insulineType);
        }
    };
    // useEffect(() => {
    //     if (acuteArray && acuteArray.includes('DIABETIC_KETOACIDOSIS')) {
    //         setDiabeticketoacidosis(true);
    //     } else {
    //         setDiabeticketoacidosis(false);
    //     }
    // }, [acuteArray]);
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
        console.log(values);
        const data = {
            name: values?.name?.trim(),

            gender: values.gender,
            age: values.age,
            phoneNumber: values?.phoneNumber,
            remarkableNote: values?.remarkableNote?.trim(),
            diabetesType: values?.diabetesType,
            diabetesStatus: values?.diabetesStatus,
            diabetesDuration: values?.diabetesDuration?._d,
            reasonForReferral: values?.reasonForReferral,
            factorsEffectinglearning: values?.factorsEffectinglearning,
            short_term_goals: values?.short_term_goals,
            long_term_goals: values?.long_term_goals,
            medicationEffectingGlucose: values?.medicationEffectingGlucose,
            recommendationGlycemicRange: values?.recommendationGlycemicRange,
            doctorNote: values?.doctorNote,
            medicalHistory: values?.medicalHistory,
            otherHealthIssues: values?.otherHealthIssues || [values.OotherHealthIssues],
            insulineTime: values?.insulineTime?._d,
            currentTreatments:
                values?.treatmentType === 'INSULINE'
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
            acutes:
                values?.acuteSelect?.length >= 1
                    ? {
                          condition: values?.acuteSelect,
                          times: Number(values?.DKAtimes),
                          severity: values?.Severity
                      }
                    : [],
            chronics:
                values?.chronicSelect?.length >= 1
                    ? [
                          {
                              condition: values?.chronicSelect
                          }
                      ]
                    : []
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
                                    <Form.Item
                                        name="reasonForReferral"
                                        className={styles.form_item}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select reasons of referral'
                                            }
                                        ]}
                                        label={
                                            <p className={styles.label_form}>
                                                {t('reasonOfReferal')}
                                            </p>
                                        }>
                                        {/* TO DO CHANGE ALIGN TEXT IF LANG CHANGE */}
                                        <Checkbox.Group className={styles.align_left}>
                                            <Space direction="vertical">
                                                <Checkbox value="FOR_WEIGHT_LOSING">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('forWeightLosing')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="FOR_WEIGHT_GAINING">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('forWeightgaining')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="FOR_RECURRENTING_HYPOGLYCEMIA">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('forRecurrentingHypoglycemia')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="FOR_RECURRENTING_ELEVATED_BLOOD_GLUCODE_LEVELS">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t(
                                                            'forRecurrentingElevatedBloodGlucoseLevels'
                                                        )}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="CURRENTLY_ON_MAX_ORAL_HYPOGLYCEMIC_AGENT">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t(
                                                            'Currently on max oral hypoglycemic agent'
                                                        )}
                                                    </p>
                                                </Checkbox>
                                                {/* <Checkbox value="FOR_CARB_COUNTING_CLASSES">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For Carb counting classes')}
                                                    </p>
                                                </Checkbox> */}
                                                <Checkbox value="FOR_BASIC_CARB_COUNTING_CLASSES">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For Basic carb counting classes')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="FOR_ADVANCED_CARB_COUNTING_CLASES">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For Advanced Carb counting clases')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="FOR_INSULIN_INJECTION">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For insulin injection')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="FOR_INSULIN_PUMP_PREPARING">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For Insulin pump preparing')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="FOR_MEDICAL_PLAN_ADHERENCE">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For Medical plan adherence')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="FOR_LIFESTYLE_MODIFICATION">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For lifestyle modification')}
                                                    </p>
                                                </Checkbox>
                                            </Space>
                                        </Checkbox.Group>
                                    </Form.Item>

                                    <Form.Item
                                        name="factorsEffectinglearning"
                                        className={` ${styles.form_item}`}
                                        label={
                                            <p className={styles.label_form}>
                                                {t('Factors which may affect Learning')}
                                            </p>
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please select Factors which may affect Learning'
                                            }
                                        ]}>
                                        {/* Style needed to handle ltr && rtl */}
                                        <Radio.Group className={`w-100 ${styles.align_left}`}>
                                            <Space direction="vertical">
                                                <Radio value="INTERPRETER_REQUIRED">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Interpreter required')}
                                                        </p>
                                                    }
                                                </Radio>

                                                <Radio value="VISUAL_IMPAIRMENT">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Visual impairment')}
                                                        </p>
                                                    }
                                                </Radio>
                                                <Radio value="AUDITORY_IMPAIRMENT">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Auditory impairment')}
                                                        </p>
                                                    }
                                                </Radio>
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col xs={24} className={styles.patient_register_column}>
                                <div className={`w-100 ${styles.patient_register_column_wrapper}`}>
                                    <Form.Item
                                        name="short_term_goals"
                                        className="w-100"
                                        label={
                                            <p className={styles.label_form}>
                                                {t('Your short term goals')}
                                            </p>
                                        }>
                                        <Input.TextArea
                                            className="w-100"
                                            autoSize={{ minRows: 4, maxRows: 6 }}
                                            placeholder={t(
                                                'For example (my short term goal is reducing the oral medication)'
                                            )}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="long_term_goals"
                                        className="w-100"
                                        label={
                                            <p className={styles.label_form}>
                                                {t('Your long term goals')}
                                            </p>
                                        }>
                                        <Input.TextArea
                                            className="w-100"
                                            autoSize={{ minRows: 4, maxRows: 6 }}
                                            placeholder={t(
                                                'For example (my long term goal is reducing the oral medication)'
                                            )}
                                        />
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col xs={24} className={styles.patient_register_column}>
                                <div className={`w-100 ${styles.patient_register_column_wrapper}`}>
                                    <Form.Item
                                        name="medicationEffectingGlucose"
                                        label={
                                            <p className={styles.label_form}>
                                                {t(
                                                    'Is the patient on medication that may affect blood glucose ?'
                                                )}
                                            </p>
                                        }>
                                        <Radio.Group className={styles.radio_container}>
                                            <Space direction="vertical">
                                                <Radio value="Yes">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Yes')}
                                                        </p>
                                                    }
                                                </Radio>
                                                <Radio value="No">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('No')}
                                                        </p>
                                                    }
                                                </Radio>
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
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
                                    <Form.Item
                                        name="otherHealthIssues"
                                        className={styles.form_item}
                                        label={
                                            <p className={styles.label_form}>
                                                {t('Any other critical health issues?')}
                                            </p>
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select other healt issues'
                                            }
                                        ]}>
                                        {/* TO DO CHANGE ALIGN TEXT IF LANG CHANGE */}
                                        <Checkbox.Group className={styles.align_left}>
                                            <Space direction="vertical">
                                                <Checkbox value="Unawareness_hypoglycemia">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('Unawareness hypoglycemia')}
                                                    </p>
                                                </Checkbox>
                                                {/* <Checkbox value="Insulin_resistance">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('Insulin resistance')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="Hypertension">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('Hypertension')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="Retinopathy">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('Retinopathy')}
                                                    </p>
                                                </Checkbox> */}
                                                <Checkbox value="Other">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('Other')}
                                                    </p>
                                                </Checkbox>
                                                <Form.Item name="OotherHealthIssues">
                                                    <Input />
                                                </Form.Item>
                                            </Space>
                                        </Checkbox.Group>
                                    </Form.Item>

                                    <Form.Item
                                        name="diabetesComplications"
                                        className={styles.form_item}
                                        label={
                                            <p className={styles.label_form}>
                                                {t('Any Diabetes complications?')}
                                            </p>
                                        }>
                                        {/* TO DO CHANGE ALIGN TEXT IF LANG CHANGE */}
                                        <Checkbox.Group className={styles.align_left}>
                                            <Space direction="vertical">
                                                <Checkbox value="Acute">
                                                    <p
                                                        className={`gotLight ${styles.label_form}`}
                                                        level={5}>
                                                        {t('Acute')}
                                                    </p>
                                                </Checkbox>
                                                {acuteShow && (
                                                    <Form.Item
                                                        name="acuteSelect"
                                                        className={`ml-2 ${styles.form_item}`}>
                                                        {/* TO DO CHANGE ALIGN TEXT IF LANG CHANGE */}
                                                        <Checkbox.Group
                                                            className={styles.align_left}>
                                                            <Space direction="vertical">
                                                                <Checkbox value="RECURRENT_HYPOS">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t('Recurrent Hypos')}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="RECURRENT_HYPERS">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t('Recurrent Hypers')}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="HYPEROSMOLAR_HYPERGLYCAEMIC_STATE">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t(
                                                                            'Hyperosmolar Hyperglycaemic State(HHS)'
                                                                        )}
                                                                    </p>
                                                                </Checkbox>

                                                                <Checkbox value="DIABETIC_KETOACIDOSIS">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t('Diabetic ketoacidosis')}
                                                                    </p>
                                                                </Checkbox>
                                                                {diabeticKetoacidosis && (
                                                                    <div
                                                                        className={
                                                                            styles.diabetesKet
                                                                        }>
                                                                        <Row className="">
                                                                            <Col sm={24}>
                                                                                <Form.Item
                                                                                    className="w-100 m-0"
                                                                                    name="DKAtimes"
                                                                                    rules={[
                                                                                        {
                                                                                            required: true,
                                                                                            message:
                                                                                                'Please select DKA TIMES'
                                                                                        }
                                                                                    ]}>
                                                                                    <Input
                                                                                        placeholder="How many times?"
                                                                                        className="m-0 w-100"
                                                                                    />
                                                                                </Form.Item>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col xs={24}>
                                                                                <Form.Item
                                                                                    rules={[
                                                                                        {
                                                                                            required: true,
                                                                                            message:
                                                                                                'Please input severity'
                                                                                        }
                                                                                    ]}
                                                                                    name="Severity"
                                                                                    label={
                                                                                        <p
                                                                                            className={
                                                                                                styles.label_form
                                                                                            }>
                                                                                            {t(
                                                                                                'Severity of the latest one'
                                                                                            )}
                                                                                        </p>
                                                                                    }>
                                                                                    <Radio.Group
                                                                                        className={
                                                                                            styles.radio_container
                                                                                        }>
                                                                                        <Radio value="MILD">
                                                                                            {
                                                                                                <p
                                                                                                    className={`gotLight ${styles.label_form}`}>
                                                                                                    {t(
                                                                                                        'Mild'
                                                                                                    )}
                                                                                                </p>
                                                                                            }
                                                                                        </Radio>
                                                                                        <Radio value="MODERATE">
                                                                                            {
                                                                                                <p
                                                                                                    className={`gotLight ${styles.label_form}`}>
                                                                                                    {t(
                                                                                                        'Moderate'
                                                                                                    )}
                                                                                                </p>
                                                                                            }
                                                                                        </Radio>
                                                                                        <Radio value="SEVERE">
                                                                                            {
                                                                                                <p
                                                                                                    className={`gotLight ${styles.label_form}`}>
                                                                                                    {t(
                                                                                                        'Severe'
                                                                                                    )}
                                                                                                </p>
                                                                                            }
                                                                                        </Radio>
                                                                                    </Radio.Group>
                                                                                </Form.Item>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                )}
                                                            </Space>
                                                        </Checkbox.Group>
                                                    </Form.Item>
                                                )}
                                                <Checkbox value="Chronic">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('Chronic')}
                                                    </p>
                                                </Checkbox>
                                                {chronicShow && (
                                                    <Form.Item
                                                        name="chronicSelect"
                                                        className={`ml-2 ${styles.form_item}`}>
                                                        {/* TO DO CHANGE ALIGN TEXT IF LANG CHANGE */}
                                                        <Checkbox.Group
                                                            className={styles.align_left}>
                                                            <Space direction="vertical">
                                                                <Checkbox value="EYE_PROBLEMS">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t(
                                                                            'Eye problems (retinopathy)'
                                                                        )}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="FOOT_PROBLEMS">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t('Foot problems')}
                                                                    </p>
                                                                </Checkbox>

                                                                <Checkbox value="HEART_ATTACK_AND_STROKE">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t(
                                                                            'Heart attack and stroke'
                                                                        )}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="KIDNEY_PROBLEMS">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t('Kidney problems')}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="NERVE_DAMAGE">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t(
                                                                            'Nerve damage (neuropathy)'
                                                                        )}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="GUM_DISEASE">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t('Gum disease')}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="SEXUAL_PROBLEMS_IN_WOMEN">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t(
                                                                            'Sexual problems in women'
                                                                        )}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="SEXUAL_PROBLEMS_IN_MEN">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t(
                                                                            'Sexual problems in men'
                                                                        )}
                                                                    </p>
                                                                </Checkbox>
                                                            </Space>
                                                        </Checkbox.Group>
                                                    </Form.Item>
                                                )}
                                            </Space>
                                        </Checkbox.Group>
                                    </Form.Item>
                                    <Form.Item
                                        name="medicalHistory"
                                        className={`${styles.form_item}`}
                                        label={
                                            <p className={styles.label_form}>
                                                {t('Patients medical history')}
                                            </p>
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select medical history'
                                            }
                                        ]}>
                                        {/* TO DO CHANGE ALIGN TEXT IF LANG CHANGE */}
                                        <Checkbox.Group className={styles.align_left}>
                                            <Space direction="vertical">
                                                <Checkbox value="Hypertension">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('Hypertension')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="Dyslipidemia">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('Dyslipidemia')}
                                                    </p>
                                                </Checkbox>

                                                <Checkbox value="Obesity">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('Obesity')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="Celiac">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('Celiac')}
                                                    </p>
                                                </Checkbox>
                                                {/* <Checkbox value="Unawareness hypoglycimia">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('Unawareness hypoglycimia')}
                                                    </p>
                                                </Checkbox> */}
                                                <Checkbox value="Skin infection / wound">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('Skin infection / wound')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="MI or ACS  Date ....">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('MI or ACS  Date ....')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="TIA / CVA">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('TIA / CVA')}
                                                    </p>
                                                </Checkbox>

                                                <Checkbox value="PVD">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('PVD')}
                                                    </p>
                                                </Checkbox>
                                            </Space>
                                        </Checkbox.Group>
                                    </Form.Item>
                                    <Form.Item
                                        name="recommendationGlycemicRange"
                                        className={`${styles.form_item} w-100 create`}
                                        label={
                                            <p className={`w-100 ${styles.label_form}`}>
                                                {t('recommendationGlycemicRange')}
                                            </p>
                                        }>
                                        <Input.TextArea
                                            className={`w-100`}
                                            autoSize={{ minRows: 1, maxRows: 1 }}
                                            placeholder="Glycemic Range"
                                        />
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col lg={23} className={`w-100 ${styles.patient_register_column}`}>
                        <div className={`w-100 ${styles.patient_register_column_wrapper}`}>
                            <Form.Item
                                name="doctorNote"
                                className="w-100"
                                label={
                                    <p className={styles.label_form}>
                                        {t('Doctor recommendation & notes')}
                                    </p>
                                }>
                                <Input.TextArea
                                    className="w-100"
                                    autoSize={{ minRows: 4, maxRows: 6 }}
                                />
                            </Form.Item>
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
