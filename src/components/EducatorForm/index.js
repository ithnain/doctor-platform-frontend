import { ConfigProvider, Form, Input, Radio, Select, Space, Steps } from 'antd';
import React, { useState } from 'react';

import CustomButton from '../CustomBtn';
import FormStyles from '../AddPatientForm/Patient.module.scss';
import PropTypes from 'prop-types';
import Styles from './educator.module.scss';
import types from '../AddPatientForm/types.json';
import useTranslation from 'next-translate/useTranslation';

const { Step } = Steps;

const EducatorForm = ({ direction }) => {
    const { t } = useTranslation('create-patient');
    const [current, setCurrent] = React.useState(1);
    const [form] = Form.useForm();
    const { Option } = Select;
    const [planStatus, setPlanStatus] = useState('plan');

    const steps = [
        {
            title: ' ',
            subTitle: 'Patient Info',
            content: (
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label={<p className={FormStyles.label_form}>{t('Name')}</p>}
                        rules={[
                            {
                                required: true,
                                message: 'Please input patient name'
                            }
                        ]}>
                        <Input placeholder="Omar Saleh" />
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        label={<p className={FormStyles.label_form}>{t('Phone')}</p>}
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
                        name="diabetesType"
                        label={<p className={FormStyles.label_form}>{t('Diabetes type')}</p>}
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
                        className="w-100"
                        name="remarkableNote"
                        label={
                            <p className={FormStyles.label_form}>
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
                </Form>
            )
        },
        {
            title: ' ',
            subTitle: 'Plan Info',
            content: (
                <>
                    {planStatus === 'plan' ? (
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="planType"
                                className={FormStyles.form_item}
                                label={<p className={FormStyles.label_form}>{t('Plan type')}</p>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select Plan type'
                                    }
                                ]}>
                                <Radio.Group className="toggle">
                                    <Space direction="vertical">
                                        <Radio value={'intense'}>
                                            <span>{t('intense')}</span>
                                        </Radio>
                                        <Radio value={'moderate'}>
                                            <span>{t('Moderate')}</span>
                                        </Radio>
                                        <Radio value={'Light'}>
                                            <span>{t('Light')}</span>
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                name="planDuration"
                                className={FormStyles.form_item}
                                label={
                                    <p className={FormStyles.label_form}>{t('Plan duration')}</p>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select Plan duration'
                                    }
                                ]}>
                                <Radio.Group className="toggle">
                                    <Space direction="vertical">
                                        <Radio value={'1 Month'}>
                                            <span>{t('1 Month')}</span>
                                        </Radio>
                                        <Radio value={'3 Month'}>
                                            <span>{t('3 Month')}</span>
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        </Form>
                    ) : (
                        ''
                    )}
                </>
            )
        }
    ];
    const handlePlanStatus = (newState) => {
        setPlanStatus(newState);
    };
    const next = () => {
        // setCurrent(current + 1);
        switch (current) {
            case 0:
                form.validateFields(['name', 'phoneNumber', 'diabetesType'])
                    .then(() => setCurrent(current + 1))
                    .catch((err) => console.log({ err }));
                break;
            case 1:
                planStatus === 'plan'
                    ? form
                          .validateFields(['planType', 'planDuration'])
                          .then((res) => console.log(res))
                          .catch((err) => console.log({ err }))
                    : console.log('first');
                break;
            default:
                break;
        }
    };

    return (
        <div id="educator-create-patient">
            <ConfigProvider direction={direction}>
                <Steps className={Styles.steps} current={current}>
                    {steps.map((item) => (
                        <Step key={item.title} subTitle={item.subTitle} title={item.title} />
                    ))}
                </Steps>
                {current === 1 && (
                    <Radio.Group
                        defaultValue={'plan'}
                        className="toggle w-75 mb-1"
                        onChange={(e) => handlePlanStatus(e.target.value)}
                        value={planStatus}>
                        <Space direction="horizontal">
                            <Radio value={'plan'}>
                                <span className="radio-title">{t('choosePlan')}</span>
                            </Radio>
                            <Radio value={'recommendation'}>
                                <span className="radio-title">{t('askForRecommendation')} </span>
                            </Radio>
                        </Space>
                    </Radio.Group>
                )}
                {planStatus === 'plan' && (
                    <div className={Styles.content}>{steps[current].content}</div>
                )}
                <div className={Styles.action}>
                    {current < steps.length - 1 && (
                        <CustomButton
                            text="Next"
                            handleButtonClick={() => next()}
                            className="pinkBG w-50"
                        />
                    )}
                    {current === steps.length - 1 && (
                        <CustomButton
                            text="Done"
                            className="pinkBG w-50"
                            handleButtonClick={() => next()}
                        />
                    )}
                </div>
            </ConfigProvider>
        </div>
    );
};
EducatorForm.propTypes = {
    direction: PropTypes.string.isRequired
};
export default EducatorForm;
