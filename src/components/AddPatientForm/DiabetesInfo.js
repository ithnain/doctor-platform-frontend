import {
    Col,
    DatePicker,
    Form,
    InputNumber,
    Radio,
    Row,
    Select,
    Space,
    TimePicker,
    Typography
} from 'antd';
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import types from './types.json';
import { useQuery } from 'react-query';
import API from '@src/utils/axios';

const style = {
    selectGeneric: {
        width: 'auto'
    },
    selectTrade: { width: 'auto' }
};

const getDiseases = async () => {
    return API.get(`/disease-type`);
};

const DiabetesInfo = ({
    styles,
    t,
    currentTreatmentShow,
    insulineTypes,
    insulineDoseSelectArray
}) => {
    const { Option } = Select;
    const { Text } = Typography;
    const format = 'HH:mm';

    const [, setDuration] = useState('');
    function onChange(date, dateString) {
        setDuration(dateString);
    }

    const { data: diseaseType=[] } = useQuery('diseasesTypes', getDiseases);

    return (
        <Col lg={24} className={styles.patient_register_column}>
            <Text className={styles.title_form}>{t('diabetes information')}</Text>
            <div className={styles.patient_register_column_wrapper}>
                <Form.Item
                    name="diabetesType"
                    label={<p className={styles.label_form}>{t('Diabetes type')}</p>}
                    rules={[
                        {
                            required: false,
                            message: 'Please select Diabetes type'
                        }
                    ]}>
                    <Select placeholder="select patient Diabetes type">
                        {diseaseType.data && diseaseType?.data.map((type) => {
                            return (
                                <Option key={type.id} value={type.name}>
                                    {type.name}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="diabetesDuration"
                    label={<p className={styles.label_form}>{t('Diabetes duration')}</p>}
                    rules={[
                        {
                            required: false,
                            message: 'Please select Diabetes duration'
                        }
                    ]}>
                    <DatePicker onChange={onChange} className="w-100" />
                </Form.Item>
                <Form.Item
                    name="diabetesStatus"
                    className={styles.form_item}
                    label={<p className={styles.label_form}>{t('Diabetes status')}</p>}
                    rules={[
                        {
                            required: false,
                            message: 'Please select Diabetes status'
                        }
                    ]}>
                    <Radio.Group className={styles.align_left}>
                        <Space direction="vertical">
                            <Radio value="CONTROLLED">
                                {
                                    <p className={`gotLight ${styles.label_form}`}>
                                        {t('Controlled')}
                                    </p>
                                }
                            </Radio>

                            <Radio value="UNCONTROLLED">
                                {
                                    <p className={`gotLight ${styles.label_form}`}>
                                        {t('Uncontrolled')}
                                    </p>
                                }
                            </Radio>
                            <Radio value="DM_WITH_COMPLICATIONS">
                                {
                                    <p className={`gotLight ${styles.label_form}`}>
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
                    label={<p className={styles.label_form}>{t('Current Treatment')}</p>}
                    rules={[
                        {
                            required: false,
                            message: 'Please select Current Treatment '
                        }
                    ]}>
                    <Radio.Group className={` w-100 ${styles.align_left}`}>
                        <Space direction="vertical" className="w-100">
                            <Radio value="LIFESTYLE_MODIFICATION">
                                {
                                    <p className={`gotLight ${styles.label_form}`}>
                                        {t('Lifestyle Modification')}
                                    </p>
                                }
                            </Radio>

                            <Radio value="ORAL_MEDICATION">
                                {
                                    <p className={`gotLight ${styles.label_form}`}>
                                        {t('Oral MEdications')}
                                    </p>
                                }
                            </Radio>
                            <Radio value="Weight loss injection">
                                {
                                    <p className={`gotLight ${styles.label_form}`}>
                                        {t('Weight loss injection')}
                                    </p>
                                }
                            </Radio>
                            <Radio value="INSULINE" className="w-100">
                                {<p className={`gotLight ${styles.label_form}`}>{t('Insuline')}</p>}
                            </Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                {currentTreatmentShow && (
                    <>
                        <Row className="w-100" justify="space-around">
                            <Col xs={16}>
                                <Form.Item
                                    name="insulineType"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please select insuline type'
                                        }
                                    ]}>
                                    <Select
                                        className="w-100"
                                        style={style.selectGeneric}
                                        placeholder="Generic name">
                                        {insulineTypes.map((type) => {
                                            return (
                                                <Option
                                                    key={type.id}
                                                    title={type.type}
                                                    value={type.type}>
                                                    {type.type}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={7}>
                                {insulineDoseSelectArray[0]?.choices?.length >= 1 && (
                                    <Form.Item
                                        name="insulineDose"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select insuline dose'
                                            }
                                        ]}>
                                        <Select style={style.selectTrade} placeholder="Trade name">
                                            {insulineDoseSelectArray[0]?.choices.map((type) => {
                                                return (
                                                    <Option key={type} title={type} value={type}>
                                                        {type}
                                                    </Option>
                                                );
                                            })}
                                        </Select>
                                    </Form.Item>
                                )}
                            </Col>
                        </Row>

                        {insulineDoseSelectArray.length === 1 &&
                            insulineDoseSelectArray[0]?.input === 'MEAL_TIME' && (
                                <Row className="w1-00" justify="space-between">
                                    <Col xs={7}>
                                        <Form.Item
                                            name="breakfast"
                                            label={
                                                <p className={styles.label_form}>
                                                    {t('breakfast')}
                                                </p>
                                            }>
                                            <InputNumber
                                                className="w-100"
                                                placeholder="Breakfast"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={7}>
                                        <Form.Item
                                            name="dinner"
                                            label={
                                                <p className={styles.label_form}>{t('dinner')}</p>
                                            }>
                                            <InputNumber className="w-100" placeholder="Dinner" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={7}>
                                        <Form.Item
                                            name="lunch"
                                            label={
                                                <p className={styles.label_form}>{t('lunch')}</p>
                                            }>
                                            <InputNumber className="w-100" placeholder="Lunch" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            )}
                        {insulineDoseSelectArray.length === 1 &&
                            insulineDoseSelectArray[0]?.input === 'HOW_MANY_TIMES_A_DAY' && (
                                <Row className="w1-00" justify="start">
                                    <Col xs={24}>
                                        <Form.Item
                                            name="insulineUnit"
                                            label={
                                                <p className={styles.label_form}>{t('units')}</p>
                                            }>
                                            <InputNumber className="w-100" placeholder="Units" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            )}

                        {insulineDoseSelectArray.length === 1 &&
                            insulineDoseSelectArray[0]?.input === 'WHAT_TIME_AND_HOW_MANY' && (
                                <Row className="w1-00" justify="space-between">
                                    <Col xs={11}>
                                        <Form.Item
                                            name="insulineTime"
                                            label={
                                                <p className={styles.label_form}>{t('time')}</p>
                                            }>
                                            <TimePicker className="w-100" format={format} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={11}>
                                        <Form.Item
                                            name="insulineUnit"
                                            label={
                                                <p className={styles.label_form}>{t('unit')}</p>
                                            }>
                                            <InputNumber className="w-100" placeholder="units" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            )}
                    </>
                )}
            </div>
        </Col>
    );
};

DiabetesInfo.propTypes = {
    styles: PropTypes.object,
    t: PropTypes.func,
    currentTreatmentShow: PropTypes.bool,
    insulineTypes: PropTypes.array,
    insulineDoseSelectArray: PropTypes.array
};

export default DiabetesInfo;
