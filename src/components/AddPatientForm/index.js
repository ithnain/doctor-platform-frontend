import {
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Row,
    Select,
    Space,
    TimePicker,
    Typography,
    notification
} from 'antd';
import React, { useEffect, useState } from 'react';
// import { insulineDoses, insulineTypes } from './insuline';
import { useDispatch, useSelector } from 'react-redux';

import API from '@src/utils/axios';
import CustomButton from '../CustomBtn';
import { registerPatient } from '@redux/actions/patient';
import styles from './Patient.module.scss';
import types from './types.json';
import useTranslation from 'next-translate/useTranslation';

const { Title, Text } = Typography;
const { Option } = Select;

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
    const [IMASK, setIMASK] = useState(null);
    const [CMASK, setCMASK] = useState(null);

    const [ISFMASK, setISFMASK] = useState(null);
    const format = 'HH:mm';

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
    const [duration, setDuration] = useState('');
    const [diabetesComplicationsShow] = useState([]);
    const [acuteArray, setAcuteArray] = useState(null);
    const [chronicArray, setChronicArray] = useState(null);
    const [insulineTypeSelect, setInsulineType] = useState(null);
    const [insulineDoseSelect, setInsulineDoseSelect] = useState(null);

    const [diabeticKetoacidosis, setDiabeticketoacidosis] = useState(false);
    const [currentTreatmentShow, setCurrentTreatmentShow] = useState(false);
    const [chronicShow, setChronicShow] = useState(false);
    const [acuteShow, setAcuteShow] = useState(false);

    const onValuesChange = ({
        diabetesComplications,
        treatmentType,
        insulineType,
        insulineDose,
        I,
        C,
        isf,
        acuteSelect,
        chronicSelect
    }) => {
        if (I) {
            setIMASK(I);
        }
        if (C) {
            setCMASK(C);
        }
        if (isf) {
            isf = isf.toString().substring(0, 1) + ':' + isf.toString().substring(1, isf.length);
            setISFMASK(isf);
        }
        if (acuteArray) {
            setAcuteShow(true);
            !acuteArray && setAcuteArray([]);
        }

        if (chronicArray) {
            setChronicShow(true);
            !chronicArray && setChronicArray([]);
        }
        if (Array.isArray(diabetesComplications) && diabetesComplications.length === 0) {
            setChronicShow(false);
            setAcuteShow(false);
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
        }
        if (diabetesComplicationsShow === []) {
            setAcuteShow(false);
            setChronicShow(false);
        }
        if (Array.isArray(chronicSelect) && chronicSelect.length >= 1) {
            setChronicArray([...chronicSelect]);
        }

        if (Array.isArray(acuteSelect) && acuteSelect.length >= 1) {
            setAcuteArray([...acuteSelect]);
        }

        if (acuteSelect && acuteSelect.includes('DIABETIC_KETOACIDOSIS')) {
            setDiabeticketoacidosis(true);
        }
        if (treatmentType === 'INSULINE') {
            setCurrentTreatmentShow(true);
        } else {
            setCurrentTreatmentShow(false);
        }
        if (
            (treatmentType === undefined || treatmentType === 'INSULINE') &&
            (isf ||
                I ||
                C ||
                insulineTypeSelect ||
                insulineDoseSelect ||
                insulineType ||
                insulineDose)
        ) {
            setCurrentTreatmentShow(true);
            insulineType && setInsulineType(insulineType);
            insulineDose && setInsulineDoseSelect(insulineDose);
        }
        if (treatmentType && treatmentType !== 'Insuline') {
            insulineType && setInsulineType(null);
            insulineDose && setInsulineDoseSelect(null);
        }
    };
    useEffect(() => {
        if (acuteArray && acuteArray.includes('DIABETIC_KETOACIDOSIS')) {
            setDiabeticketoacidosis(true);
        } else {
            setDiabeticketoacidosis(false);
        }
    }, [acuteArray]);
    useEffect(() => {
        insulineTypeSelect &&
            setInsulineDoseSelectArray(
                insulineTypes.filter((type) => type.type === insulineTypeSelect)
            );
    }, [insulineDoseSelect, insulineTypeSelect]);
    useEffect(() => {
        if (errorsCreatingPatient?.length) {
            notification.error({
                message: t('Error Creating patient'),
                description: errorsCreatingPatient.join(', \n')
            });
        }
    }, [errorsCreatingPatient]);
    function onChange(date, dateString) {
        setDuration(dateString);
    }
    const onFinish = async (values) => {
        const data = {
            name: values?.name?.trim(),

            gender: values.gender,
            age: values.age,
            phoneNumber: values?.phoneNumber,
            remarkableNote: values?.remarkableNote?.trim(),
            diabetesType: values?.diabetesType,
            diabetesStatus: values?.diabetesStatus,
            diabetesDuration: values?.diabetesDuration?._d,
            treatmentType: values?.treatmentType,
            reasonForReferral: values?.reasonForReferral,
            factorsEffectinglearning: values?.factorsEffectinglearning,
            short_term_goals: values?.short_term_goals,
            long_term_goals: values?.long_term_goals,
            medicationEffectingGlucose: values?.medicationEffectingGlucose,
            recommendationGlycemicRange: values?.recommendationGlycemicRange,
            doctorNote: values?.doctorNote,
            medicalHistory: values?.medicalHistory,
            otherHealthIssues: values?.otherHealthIssues || [values.OotherHealthIssues],
            units: values?.insulineUnit,
            insulineTime: values?.insulineTime?._d,
            currentTreatments:
                values?.treatmentType === 'INSULINE'
                    ? [
                          {
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
                            <Col xs={24}>
                                <div className={styles.title_form}>
                                    <Text className={styles.title_form} align="start">
                                        {t('Patient Information')}
                                    </Text>
                                </div>

                                <div className={styles.patient_register_column_wrapper}>
                                    <Form.Item
                                        name="name"
                                        label={<p className={styles.label_form}>{t('Name')}</p>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input patient name'
                                            }
                                        ]}>
                                        <Input placeholder="Omar Saleh" />
                                    </Form.Item>
                                    <Form.Item
                                        name="gender"
                                        label={<p className={styles.label_form}>{t('Gender')}</p>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Gender'
                                            }
                                        ]}>
                                        <Radio.Group className={styles.radio_container}>
                                            <Radio value="Male">
                                                {
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('Male')}
                                                    </p>
                                                }
                                            </Radio>
                                            <Radio value="Female">
                                                {
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('Female')}
                                                    </p>
                                                }
                                            </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        className="w-100"
                                        name="age"
                                        label={<p className={styles.label_form}>{t('age')}</p>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input patient age'
                                            }
                                        ]}>
                                        <Input placeholder="15" className="w-100" />
                                    </Form.Item>
                                    <Form.Item
                                        name="phoneNumber"
                                        label={<p className={styles.label_form}>{t('Phone')}</p>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input patient phone'
                                            },
                                            {
                                                pattern: /^(5)(0|2|3|4|5|6|7|8|9)([0-9]{7})$/,
                                                message:
                                                    'Phone number should be in this format 5xxxxxxxx'
                                            }
                                        ]}>
                                        <Input className="w-100" placeholder="5xxxxxxxx" />
                                    </Form.Item>
                                    <Form.Item
                                        className="w-100"
                                        name="remarkableNote"
                                        label={
                                            <p className={styles.label_form}>
                                                {t('Doctor recommendation & notes')}
                                            </p>
                                        }>
                                        <div className="w-100">
                                            <Input.TextArea
                                                className="w-100"
                                                autoSize={{ minRows: 4, maxRows: 6 }}
                                            />
                                        </div>
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col lg={24} className={styles.patient_register_column}>
                                <Text className={styles.title_form}>
                                    {t('diabetes information')}
                                </Text>
                                <div className={styles.patient_register_column_wrapper}>
                                    <Form.Item
                                        name="diabetesType"
                                        label={
                                            <p className={styles.label_form}>
                                                {t('Diabetes type')}
                                            </p>
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Diabetes type'
                                            }
                                        ]}>
                                        <Select placeholder="select patient Diabetes type">
                                            {types.map((type) => {
                                                return (
                                                    <Option key={type.id} value={type.name_en}>
                                                        {type.name_en}
                                                    </Option>
                                                );
                                            })}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="diabetesDuration"
                                        label={
                                            <p className={styles.label_form}>
                                                {t('Diabetes duration')}
                                            </p>
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Diabetes duration'
                                            }
                                        ]}>
                                        <DatePicker onChange={onChange} className="w-100" />
                                    </Form.Item>
                                    <Form.Item
                                        name="diabetesStatus"
                                        className={styles.form_item}
                                        label={
                                            <p className={styles.label_form}>
                                                {t('Diabetes status')}
                                            </p>
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Diabetes status'
                                            }
                                        ]}>
                                        <Radio.Group className={styles.align_left}>
                                            <Space direction="vertical">
                                                <Radio value="CONTROLLED">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Controlled')}
                                                        </p>
                                                    }
                                                </Radio>

                                                <Radio value="UNCONTROLLED">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Uncontrolled')}
                                                        </p>
                                                    }
                                                </Radio>
                                                <Radio value="DM_WITH_COMPLICATIONS">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('DM with complications')}
                                                        </p>
                                                    }
                                                </Radio>
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        name="treatmentType"
                                        className={`create w-100 ${styles.form_item}`}
                                        label={
                                            <p className={styles.label_form}>
                                                {t('Current Treatment')}
                                            </p>
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Current Treatment '
                                            }
                                        ]}>
                                        <Radio.Group className={` w-100 ${styles.align_left}`}>
                                            <Space direction="vertical" className="w-100">
                                                <Radio value="LIFESTYLE_MODIFICATION">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Lifestyle Modification')}
                                                        </p>
                                                    }
                                                </Radio>

                                                <Radio value="ORAL_MEDICATION">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Oral MEdications')}
                                                        </p>
                                                    }
                                                </Radio>
                                                <Radio value="INSULINE" className="w-100">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Insuline')}
                                                        </p>
                                                    }
                                                    {currentTreatmentShow && (
                                                        <>
                                                            <Row
                                                                className="w1-00"
                                                                justify="space-around">
                                                                <Col xs={11}>
                                                                    <Form.Item
                                                                        name="insulineType"
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message:
                                                                                    'Please select insuline type'
                                                                            }
                                                                        ]}>
                                                                        <Select placeholder="Type">
                                                                            {insulineTypes.length >=
                                                                                1 &&
                                                                                insulineTypes.map(
                                                                                    (type) => {
                                                                                        return (
                                                                                            <Option
                                                                                                key={
                                                                                                    type.id
                                                                                                }
                                                                                                value={
                                                                                                    type.type
                                                                                                }>
                                                                                                {
                                                                                                    type.type
                                                                                                }
                                                                                            </Option>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                        </Select>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col xs={11}>
                                                                    {insulineDoseSelectArray[0]
                                                                        ?.choices?.length >= 1 && (
                                                                        <Form.Item
                                                                            name="insulineDose"
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message:
                                                                                        'Please select insuline dose'
                                                                                }
                                                                            ]}>
                                                                            <Select placeholder="Dose">
                                                                                {insulineDoseSelectArray[0]?.choices.map(
                                                                                    (type) => {
                                                                                        return (
                                                                                            <Option
                                                                                                key={
                                                                                                    type
                                                                                                }
                                                                                                value={
                                                                                                    type
                                                                                                }>
                                                                                                {
                                                                                                    type
                                                                                                }
                                                                                            </Option>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </Select>
                                                                        </Form.Item>
                                                                    )}
                                                                </Col>
                                                            </Row>

                                                            {insulineDoseSelectArray.length === 1 &&
                                                                insulineDoseSelectArray[0]
                                                                    ?.input === 'MEAL_TIME' && (
                                                                    <Row
                                                                        className="w1-00"
                                                                        justify="space-around">
                                                                        <Col xs={7}>
                                                                            <Form.Item
                                                                                name="breakfast"
                                                                                label={
                                                                                    <p
                                                                                        className={
                                                                                            styles.label_form
                                                                                        }>
                                                                                        {t(
                                                                                            'breakfast'
                                                                                        )}
                                                                                    </p>
                                                                                }>
                                                                                <InputNumber placeholder="Breakfast" />
                                                                            </Form.Item>
                                                                        </Col>
                                                                        <Col xs={7}>
                                                                            <Form.Item
                                                                                name="dinner"
                                                                                label={
                                                                                    <p
                                                                                        className={
                                                                                            styles.label_form
                                                                                        }>
                                                                                        {t(
                                                                                            'dinner'
                                                                                        )}
                                                                                    </p>
                                                                                }>
                                                                                <InputNumber placeholder="Dinner" />
                                                                            </Form.Item>
                                                                        </Col>
                                                                        <Col xs={7}>
                                                                            <Form.Item
                                                                                name="lunch"
                                                                                label={
                                                                                    <p
                                                                                        className={
                                                                                            styles.label_form
                                                                                        }>
                                                                                        {t('lunch')}
                                                                                    </p>
                                                                                }>
                                                                                <InputNumber placeholder="Lunch" />
                                                                            </Form.Item>
                                                                        </Col>
                                                                    </Row>
                                                                )}
                                                            {insulineDoseSelectArray.length === 1 &&
                                                                insulineDoseSelectArray[0]
                                                                    ?.input ===
                                                                    'HOW_MANY_TIMES_A_DAY' && (
                                                                    <Row
                                                                        className="w1-00"
                                                                        justify="space-around">
                                                                        <Col xs={21}>
                                                                            <Form.Item
                                                                                name="insulineUnit"
                                                                                label={
                                                                                    <p
                                                                                        className={
                                                                                            styles.label_form
                                                                                        }>
                                                                                        {t('units')}
                                                                                    </p>
                                                                                }>
                                                                                <InputNumber placeholder="Units" />
                                                                            </Form.Item>
                                                                        </Col>
                                                                    </Row>
                                                                )}

                                                            {insulineDoseSelectArray.length === 1 &&
                                                                insulineDoseSelectArray[0]
                                                                    ?.input ===
                                                                    'WHAT_TIME_AND_HOW_MANY' && (
                                                                    <Row
                                                                        className="w1-00"
                                                                        justify="space-around">
                                                                        <Col xs={11}>
                                                                            <Form.Item
                                                                                name="insulineTime"
                                                                                label={
                                                                                    <p
                                                                                        className={
                                                                                            styles.label_form
                                                                                        }>
                                                                                        {t('time')}
                                                                                    </p>
                                                                                }>
                                                                                <TimePicker
                                                                                    format={format}
                                                                                />
                                                                            </Form.Item>
                                                                        </Col>
                                                                        <Col xs={11}>
                                                                            <Form.Item
                                                                                name="insulineUnit"
                                                                                label={
                                                                                    <p
                                                                                        className={
                                                                                            styles.label_form
                                                                                        }>
                                                                                        {t('unit')}
                                                                                    </p>
                                                                                }>
                                                                                <InputNumber placeholder="units" />
                                                                            </Form.Item>
                                                                        </Col>
                                                                    </Row>
                                                                )}
                                                            <Row
                                                                className="w1-00"
                                                                justify="space-around">
                                                                <Col xs={11}>
                                                                    <Form.Item
                                                                        value={ISFMASK}
                                                                        name="isf">
                                                                        <InputNumber
                                                                            placeholder="ISF"
                                                                            value={ISFMASK}
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col xs={11}>
                                                                    <Row justify="space-between">
                                                                        <Col xs={11}>
                                                                            <Form.Item
                                                                                name="I"
                                                                                value={IMASK}>
                                                                                <InputNumber
                                                                                    className="w-100"
                                                                                    placeholder="I"
                                                                                />
                                                                            </Form.Item>
                                                                        </Col>
                                                                        <Col xs={1}>:</Col>
                                                                        <Col xs={11}>
                                                                            <Form.Item
                                                                                name="C"
                                                                                value={CMASK}>
                                                                                <InputNumber
                                                                                    className="w-100"
                                                                                    placeholder="C"
                                                                                />
                                                                            </Form.Item>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </>
                                                    )}
                                                </Radio>
                                                <Radio value="Weight loss injection">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Weight loss injection')}
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
                                                message: 'Please select reasons of referal'
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
                                                <Checkbox value="FOR_CARB_COUNTING_CLASSES">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For Carb counting classes')}
                                                    </p>
                                                </Checkbox>
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
                                                        {t('For lifestyle modification ')}
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
                                                <Checkbox value="Insulin_resistance">
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
                                                </Checkbox>
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
                                                                        {t('Recurrent Hypos ')}
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
                                                <Checkbox value="Unawareness hypoglycimia">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('Unawareness hypoglycimia')}
                                                    </p>
                                                </Checkbox>
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
                                            placeholder="recommendation Glycemic Range"
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
