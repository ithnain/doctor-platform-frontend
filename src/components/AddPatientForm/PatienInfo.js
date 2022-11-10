import { isValidName } from '@src/utils/helpers';
import { Col, Form, Input, Radio, Typography, DatePicker } from 'antd';
import moment from 'moment';

import PropTypes from 'prop-types';
import React, { useState } from 'react';

const PatienInfo = ({ styles, t }) => {
    const { Text } = Typography;
    const [, setAge] = useState('');

    const nameValidation = (rule, value, callback) => {
        if (!isValidName(value)) {
            callback('Please enter the First and Last name');
        } else {
            callback();
        }
    };
    function onChangeAge(date, dateString) {
        setAge(dateString);
    }
    return (
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
                        },
                        { validator: nameValidation }
                    ]}>
                    <Input placeholder="Omar Saleh" />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label={<p className={styles.label_form}>{t('Gender')}</p>}
                    rules={[
                        {
                            required: false,
                            message: 'Please select Gender'
                        }
                    ]}>
                    <Radio.Group className={styles.radio_container}>
                        <Radio value="Male">
                            {<p className={`gotLight ${styles.label_form}`}>{t('Male')}</p>}
                        </Radio>
                        <Radio value="Female">
                            {<p className={`gotLight ${styles.label_form}`}>{t('Female')}</p>}
                        </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    className="w-100"
                    name="age"
                    label={<p className={styles.label_form}>{t('age')}</p>}
                    // getValueFromEvent={(onChange) => moment(onChange).format('YYYY-MM-DD')}
                    // getValueProps={(i) => ({value: moment(i)})}
                    rules={[
                        {
                            required: false,
                            message: 'Please input patient age'
                        }
                    ]}>
                    <DatePicker onChange={onChangeAge} className="w-100" />

                    {/* <Input placeholder="15" className="w-100" /> */}
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
                            message: 'Phone number should be in this format 5xxxxxxxx'
                        }
                    ]}>
                    <Input className="w-100" placeholder="5xxxxxxxx" />
                </Form.Item>
                <Form.Item
                    className="w-100"
                    name="remarkableNote"
                    label={
                        <p className={styles.label_form}>{t('Doctor recommendation & notes')}</p>
                    }>
                    <div className="w-100">
                        <Input.TextArea className="w-100" autoSize={{ minRows: 4, maxRows: 6 }} />
                    </div>
                </Form.Item>
            </div>
        </Col>
    );
};

PatienInfo.propTypes = { styles: PropTypes.object, t: PropTypes.func };
export default PatienInfo;
