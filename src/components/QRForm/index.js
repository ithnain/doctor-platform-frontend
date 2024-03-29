import { Col, Form, Input, Row, Select, Space, Typography } from 'antd';

import API from '@src/utils/axios';
import { ConfigProvider } from 'antd';
import CustomButton from '@src/components/CustomBtn';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import router from 'next/router';
import styles from './QR.module.scss';
import { useState } from 'react';
import { isValidName } from 'src/utils/helpers/index';

const { Option } = Select;

const NumberInput = ({ value = {}, onChange }) => {
    const [number, setNumber] = useState(0);
    const [country, setCountry] = useState('+966');

    const triggerChange = (changedValue) => {
        onChange?.({
            number,
            country,
            ...value,
            ...changedValue
        });
    };

    const onNumberChange = (e) => {
        const newNumber = parseInt(e.target.value || '0', 10);

        if (Number.isNaN(number)) {
            return;
        }

        if (!('number' in value)) {
            setNumber(newNumber);
        }

        triggerChange({
            number: newNumber
        });
    };

    const onCountryChange = (newCountry) => {
        if (!('Country' in value)) {
            setCountry(newCountry);
        }

        triggerChange({
            country: newCountry
        });
    };

    return (
        <Row justify="space-between" className={styles.rtl}>
            <Col xs={8}>
                <Select
                    value={value.newCountry || country}
                    onChange={onCountryChange}
                    className={styles.countryCode}>
                    <Option value="+966">+966</Option>
                    <Option value="+2">+2</Option>
                </Select>
            </Col>
            <Col xs={15}>
                <Input
                    type="text"
                    value={value.number || number}
                    onChange={onNumberChange}
                    placeholder="5xxxxxxxx"
                />
            </Col>
        </Row>
    );
};
NumberInput.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func
};
const QRForm = ({ name, id }) => {
    const { Text } = Typography;
    const [error, setError] = useState(false);

    useEffect(() => {
        qrCodeCounter();
    }, []);
    const onFinish = async (values) => {
        const data = {
            name: values?.username?.trim(),
            phoneNumber: `${values.number.number}`,
            doctorId: id,
        };
        // id === "be0ee729-25db-442f-aefc-515b87054043" || id === "61254b6b-3d08-424d-a9f3-acd231a9afcc" ? {
        //     name: values?.username?.trim(),
        //     phoneNumber: `${values.number.number}`,
        //     doctorId: id,
        //     // educatorId: "1c735207-5ac5-4aa9-b5cd-17242fe95af1",
            // diabetesType: "T1D",
            // educatorId: "946d3dad-8898-4d1b-bc2e-bb06c529dd05"
        // } :
         
        try {
            const res = await API.post('patient/createPatient', data);
            if (res.status === 201) {
                router.push('/create-patient-qr/success');
            }
        } catch (error) {
            if(error.response.status === 409) setError(true);
            else router.push('/create-patient-qr/error');
        }
    };
    const qrCodeCounter = async () => {
        const data = {
            referrerId: id,
        };         
        try {
            const res = await API.post('auth/incrementQrCounter', data);
        } catch (error) {
            console.log(error);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const checkNumber = (_, value) => {
        const numberstr = `${value.number}`;
        if (numberstr.match(/^(5)(0|2|3|4|5|6|7|8|9)([0-9]{7})$/)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('5xxxxxxxx شكل الرقم'));
    };
    const nameValidation = (rule, value, callback) => {
        if (!isValidName(value)) {
            callback('ادخل الاسم الكامل');
        } else {
            callback();
        }
    };
    return (
        <Row justify="space-around">
            <ConfigProvider direction="rtl">
                <Space>
                    <Row justify="space-between">
                        <Space direction="vertical">
                            <Col xs={24}>
                                <div className={styles.logo}>
                                    <Image
                                        width={80}
                                        height={80}
                                        src="/assets/logo-dark-notext.png"
                                    />
                                </div>
                            </Col>
                            <Col xs={24}>
                                <Text className={styles.welcome} strong>
                                    اهلا بك في اثنين
                                </Text>
                            </Col>
                            <Col xs={24}>
                                <Text className={styles.signThrough} strong>
                                    الدكتور المعالج
                                </Text>
                            </Col>
                            <Col xs={24}>
                                <div className={styles['d-flex']}>
                                    <Image
                                        width={30}
                                        height={30}
                                        src="/assets/images/doctor-150.jpg"
                                    />
                                    <Text className={styles.doctorName} type="secondary">
                                        {name}
                                    </Text>
                                </div>
                            </Col>
                            <Col xs={24}>
                                <div className={styles['d-flex']}>
                                    <Text className={styles.doctorName} type="secondary"></Text>
                                </div>
                            </Col>
                            <Form
                                layout="vertical"
                                name="basic"
                                labelCol={{ span: 6 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off">
                                <Form.Item
                                    wrapperCol={{ span: 24 }}
                                    rules={[
                                        { required: true, message: 'فضلا املأ البيانات' },
                                        { validator: nameValidation }
                                    ]}
                                    label="اسم بالكامل"
                                    name="username">
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="number"
                                    label="رقم الجوال"
                                    rules={[
                                        { required: true, message: 'فضلا املأ البيانات' },
                                        { validator: checkNumber }
                                    ]}>
                                    <NumberInput />
                                </Form.Item>
                                {error && <Text className={styles.error} type="secondary">لديك حساب سابق و سنقوم بربطك مع الطبيب</Text> }
                                <Form.Item wrapperCol={{ span: 24 }}>
                                    <CustomButton
                                        type="primary"
                                        htmlType="submit"
                                        text="انشاء حساب"
                                        className={styles.redBtn}
                                    />
                                </Form.Item>
                            </Form>
                        </Space>
                    </Row>
                </Space>
            </ConfigProvider>
        </Row>
    );
};
QRForm.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};
export default QRForm;
