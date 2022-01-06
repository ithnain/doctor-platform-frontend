import { Col, Form, Input, Row, Select, Space, Typography } from 'antd';

import CustomButton from '@src/components/CustomBtn';
import Image from 'next/image';
import React from 'react';
import styles from './QR.module.scss';
import { useState } from 'react';

const { Option } = Select;

const NumberInput = ({ value = {}, onChange }) => {
    const [number, setNumber] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('KSA');

    const triggerChange = (changedValue) => {
        onChange?.({
            number,
            phoneNumber,
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

    const onPhoneNumberChange = (newPhoneNumber) => {
        if (!('phoneNumber' in value)) {
            setPhoneNumber(newPhoneNumber);
        }

        triggerChange({
            phoneNumber: newPhoneNumber
        });
    };

    return (
        <Row justify="space-between">
            <Col xs={8}>
                <Select
                    value={value.newPhoneNumber || phoneNumber}
                    onChange={onPhoneNumberChange}
                    className={styles.countryCode}>
                    <Option value="KSA">00971</Option>
                    <Option value="EGP">002</Option>
                </Select>
            </Col>
            <Col xs={15}>
                <Input type="text" value={value.number || number} onChange={onNumberChange} />
            </Col>
        </Row>
    );
};

const QRForm = () => {
    const { Text } = Typography;
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const checkNumber = (_, value) => {
        console.log(value);
        if (value > 0) {
            return Promise.resolve();
        }

        return Promise.reject(new Error('رقم الجوال'));
    };
    return (
        <div className={styles.rtl}>
            <Row justify="end">
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
                            <Image width={30} height={30} src="/assets/images/doctor-150.jpg" />
                            <Text className={styles.doctorName} type="secondary">
                                اسم الدكتور
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
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off">
                        <Form.Item
                            rules={[{ required: true, message: 'فضلا املأ البيانات' }]}
                            label="اسم بالكامل"
                            name="username">
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="number"
                            label="رقم الجوال"
                            rules={[
                                { required: true, message: 'فضلا املأ البيانات' },
                                {
                                    validator: checkNumber
                                }
                            ]}>
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
        </div>
    );
};

export default QRForm;
