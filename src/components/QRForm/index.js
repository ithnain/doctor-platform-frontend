import { Col, Form, Input, Row, Select, Space, Typography } from 'antd';

import API from '@src/utils/axios';
import { ConfigProvider } from 'antd';
import CustomButton from '@src/components/CustomBtn';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';
import router from 'next/router';
import styles from './QR.module.scss';
import { useState } from 'react';

const { Option } = Select;

const NumberInput = ({ value = {}, onChange }) => {
    const [number, setNumber] = useState(0);
    const [country, setCountry] = useState('00971');

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
                    <Option value="00971">00971</Option>
                    <Option value="002">002</Option>
                </Select>
            </Col>
            <Col xs={15}>
                <Input type="text" value={value.number || number} onChange={onNumberChange} />
            </Col>
        </Row>
    );
};
NumberInput.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func
};
const QRForm = ({ name }) => {
    const { Text } = Typography;
    const onFinish = async (values) => {
        const data = {
            name: values?.username?.trim(),
            phoneNumber: `${values?.number.country}${values.number.number}`
        };
        try {
            const res = await API.post('patient/createPatient', data);
            if (res.status === 201) {
                router.push('/create-patient-qr/success');
            }
        } catch (error) {
            router.push('/create-patient-qr/error');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                                        preview={false}
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
                                    rules={[{ required: true, message: 'فضلا املأ البيانات' }]}
                                    label="اسم بالكامل"
                                    name="username">
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="number"
                                    label="رقم الجوال"
                                    rules={[{ required: true, message: 'فضلا املأ البيانات' }]}>
                                    <NumberInput />
                                </Form.Item>

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
    name: PropTypes.string.isRequired
};
export default QRForm;
