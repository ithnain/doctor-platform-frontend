import {
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    Radio,
    Row,
    Select,
    Space,
    Typography,
    notification
} from 'antd';
import React, { useEffect, useState } from 'react';
import { insulineDoses, insulineTypes } from './insuline';
import { useDispatch, useSelector } from 'react-redux';

import API from '@src/utils/axios';
import CustomButton from '../CustomBtn';
import { registerPatient } from '@redux/actions/patient';
import styles from './Patient.module.scss';
import types from './types.json';
import useTranslation from 'next-translate/useTranslation';

const { Title, Text } = Typography;
const { Option } = Select;

const index = () => {
    const { t } = useTranslation('create-patient');
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [errorsCreatingPatient, setErrorsCreatingPatient] = useState([]);
    const [createdPatientSuccess, setCreatedPatientSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user || !user.data.accessToken) {
            // enable this after we have the token in redux
            // dispatch(clearUser())
            // router.push("/login");
        }
    }, [user]);

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
        ic,
        isf,
        acuteSelect,
        chronicSelect
    }) => {
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

        if (acuteSelect && acuteSelect.includes('diabeticketoacidosis')) {
            setDiabeticketoacidosis(true);
        }
        if (treatmentType === 'Insuline') {
            setCurrentTreatmentShow(true);
        } else {
            setCurrentTreatmentShow(false);
        }
        if (
            (treatmentType === undefined || treatmentType === 'Insuline') &&
            (isf || ic || insulineTypeSelect || insulineDoseSelect || insulineType || insulineDose)
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
        if (acuteArray && acuteArray.includes('diabeticketoacidosis')) {
            setDiabeticketoacidosis(true);
        } else {
            setDiabeticketoacidosis(false);
        }
    }, [acuteArray]);
    useEffect(() => {
        console.log(insulineTypeSelect, insulineDoseSelect);
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
        console.log(values, insulineTypeSelect, insulineDoseSelect);

        let treatmentType = '';
        if (values?.treatment === 'INSULIN') {
            treatmentType = values?.insulin_treatment;
        } else {
            treatmentType = values?.treatment;
        }
        let healthIssues = values?.healthIssues;
        let isOtherHealthIssues = false;
        let otherHealthIssues = '';
        if (healthIssues && healthIssues.length) {
            let i = healthIssues?.indexOf('Other');
            if (i > -1) {
                healthIssues.splice(i, 1);
                isOtherHealthIssues = true;
                otherHealthIssues = values?.otherHealthIssues;
            }
        }
        let diabetesComplications = values?.diabetesComplications;
        let isOtherDiabetesComplications = false;
        let otherDiabetesComplications = '';
        if (diabetesComplications && diabetesComplications?.length) {
            let j = diabetesComplications?.indexOf('Other');
            if (j !== -1) {
                diabetesComplications.splice(j, 1);
                isOtherDiabetesComplications = true;
                otherDiabetesComplications = values?.otherDiabetesComplications;
            }
        }

        const data = {
            name: values?.name.trim(),
            remarkableNote: values?.remarkableNote.trim(),
            diabetesType: values?.diabetesType,
            diabetesStatus: values?.diabetesStatus,
            diabetesDuration: values?.diabetesDuration._d,
            treatmentType: values?.treatmentType,
            reasonForReferral: values?.reasonForReferral,
            factorsEffectinglearning: values?.factorsEffectinglearning,
            short_term_goals: values?.short_term_goals,
            long_term_goals: values?.long_term_goals,
            medicationEffectingGlucose: values?.medicationEffectingGlucose,
            recommendationGlycemicRange: values?.recommendationGlycemicRange,
            doctorNote: values?.doctorNote,
            medicalHistory: values?.medicalHistory,
            otherHealthIssues: values?.otherHealthIssues || values.OotherHealthIssues,
            currentTreatments: [
                {
                    type: values?.treatmentType,
                    doseType: values?.insulineType,
                    numberOfDoses: values?.insulineDose,
                    I_C: values?.ic,
                    ISF: values?.isf
                }
            ],
            acutes: {
                condition: values?.acuteSelect,
                times: values?.DKAtimes,
                severity: values?.Severity
            },
            chronics: [
                {
                    condition: values?.chronicSelect
                }
            ]
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
        <div className={` ${styles.form_container}`}>
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
                        <Row type="flex">
                            <Col xs={24}>
                                <div className={styles.title_form}>
                                    <Text className={styles.title_form}>
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
                                        }
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input patient age'
                                            }
                                        ]}>
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
                                                <Radio value="Controlled">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Controlled')}
                                                        </p>
                                                    }
                                                </Radio>

                                                <Radio value="Uncontrolled">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Uncontrolled')}
                                                        </p>
                                                    }
                                                </Radio>
                                                <Radio value="DM with complications">
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
                                                <Radio value="Lifestyle Modification">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Lifestyle Modification')}
                                                        </p>
                                                    }
                                                </Radio>

                                                <Radio value="Oral MEdications">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Oral MEdications')}
                                                        </p>
                                                    }
                                                </Radio>
                                                <Radio value="Insuline" className="w-100">
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
                                                                            {insulineTypes.map(
                                                                                (type) => {
                                                                                    return (
                                                                                        <Option
                                                                                            key={
                                                                                                type.id
                                                                                            }
                                                                                            value={
                                                                                                type.name
                                                                                            }>
                                                                                            {
                                                                                                type.name
                                                                                            }
                                                                                        </Option>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </Select>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col xs={11}>
                                                                    <Form.Item
                                                                        name="insulineDose"
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message:
                                                                                    'Please select insuline type'
                                                                            }
                                                                        ]}>
                                                                        <Select placeholder="Dose">
                                                                            {insulineDoses.map(
                                                                                (type) => {
                                                                                    return (
                                                                                        <Option
                                                                                            key={
                                                                                                type.id
                                                                                            }
                                                                                            value={
                                                                                                type.name
                                                                                            }>
                                                                                            {
                                                                                                type.name
                                                                                            }
                                                                                        </Option>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </Select>
                                                                    </Form.Item>
                                                                </Col>
                                                            </Row>
                                                            <Row
                                                                className="w1-00"
                                                                justify="space-around">
                                                                <Col xs={11}>
                                                                    <Form.Item name="isf">
                                                                        <Select placeholder="ISF"></Select>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col xs={11}>
                                                                    <Form.Item name="ic">
                                                                        <Select placeholder="I:C"></Select>
                                                                    </Form.Item>
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
                                                <Checkbox value="forWeightLosing">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('forWeightLosing')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="forWeightgaining">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('forWeightgaining')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="forRecurrentingHypoglycemia">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('forRecurrentingHypoglycemia')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="forRecurrentingElevatedBloodGlucoseLevels">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t(
                                                            'forRecurrentingElevatedBloodGlucoseLevels'
                                                        )}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="Currently on max oral hypoglycemic agent">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t(
                                                            'Currently on max oral hypoglycemic agent'
                                                        )}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="For Carb counting classes">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For Carb counting classes')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="For Basic carb counting classes">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For Basic carb counting classes')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="For Advanced Carb counting clases">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For Advanced Carb counting clases')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="For insulin injection">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For insulin injection')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="For Insulin pump preparing">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For Insulin pump preparing')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="For Medical plan adherence">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For Medical plan adherence')}
                                                    </p>
                                                </Checkbox>
                                                <Checkbox value="For lifestyle modification ">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For lifestyle modification ')}
                                                    </p>
                                                </Checkbox>
                                            </Space>
                                        </Checkbox.Group>
                                    </Form.Item>

                                    <Form.Item
                                        name="factorsEffectinglearning"
                                        className={styles.form_item}
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
                                        <Radio.Group className={styles.align_left}>
                                            <Space direction="vertical">
                                                <Radio value="Interpreter required">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Interpreter required')}
                                                        </p>
                                                    }
                                                </Radio>

                                                <Radio value="Visual impairment">
                                                    {
                                                        <p
                                                            className={`gotLight ${styles.label_form}`}>
                                                            {t('Visual impairment')}
                                                        </p>
                                                    }
                                                </Radio>
                                                <Radio value="Auditory impairment">
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
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Gender'
                                            }
                                        ]}>
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
                                        }>
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
                                                                <Checkbox value="Recurrent Hypos">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t('Recurrent Hypos ')}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="Recurrent Hypers">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t('Recurrent Hypers')}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="Hyperosmolar Hyperglycaemic State(HHS)">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t(
                                                                            'Hyperosmolar Hyperglycaemic State(HHS)'
                                                                        )}
                                                                    </p>
                                                                </Checkbox>

                                                                <Checkbox value="diabeticketoacidosis">
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
                                                                                    name="DKAtimes">
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
                                                                                        <Radio value="Mild">
                                                                                            {
                                                                                                <p
                                                                                                    className={`gotLight ${styles.label_form}`}>
                                                                                                    {t(
                                                                                                        'Mild'
                                                                                                    )}
                                                                                                </p>
                                                                                            }
                                                                                        </Radio>
                                                                                        <Radio value="Moderate">
                                                                                            {
                                                                                                <p
                                                                                                    className={`gotLight ${styles.label_form}`}>
                                                                                                    {t(
                                                                                                        'Moderate'
                                                                                                    )}
                                                                                                </p>
                                                                                            }
                                                                                        </Radio>
                                                                                        <Radio value="Severe">
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
                                                                <Checkbox value="Eye problems (retinopathy)">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t(
                                                                            'Eye problems (retinopathy)'
                                                                        )}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="Foot problems">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t('Foot problems')}
                                                                    </p>
                                                                </Checkbox>

                                                                <Checkbox value="Heart attack and stroke">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t(
                                                                            'Heart attack and stroke'
                                                                        )}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="Kidney problems">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t('Kidney problems')}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="Nerve damage (neuropathy)">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t(
                                                                            'Nerve damage (neuropathy)'
                                                                        )}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="Gum disease">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t('Gum disease')}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="Sexual problems in women">
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t(
                                                                            'Sexual problems in women'
                                                                        )}
                                                                    </p>
                                                                </Checkbox>
                                                                <Checkbox value="Sexual problems in men">
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
                                        }>
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
                                        }
                                        rules={[
                                            {
                                                required: false,
                                                message:
                                                    'Please input recommendation Glycemic Range'
                                            }
                                        ]}>
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
                                }
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input patient age'
                                    }
                                ]}>
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
