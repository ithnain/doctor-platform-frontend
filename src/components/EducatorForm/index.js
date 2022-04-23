import { Col, ConfigProvider, Form, Input, Radio, Row, Select, Space, Steps } from 'antd';
import React, { useState } from 'react';

import { QueryClient, dehydrate, useQuery, useMutation } from 'react-query';

import API from '@utils/axios';
import CustomButton from '../CustomBtn';
import FormStyles from '../AddPatientForm/Patient.module.scss';
import PropTypes from 'prop-types';
import Styles from './educator.module.scss';
import types from '../AddPatientForm/types.json';
import useTranslation from 'next-translate/useTranslation';
import toastr from 'toastr';
import { useRouter } from 'next/router';
import ErrorList from 'antd/lib/form/ErrorList';

const { Step } = Steps;
const getIntensity = async () => API.get(`invoice/intensity`);
const getTopics = async () => API.get(`invoice/topic`);
const getDoctors = async () => API.get(`invoice/topic`);
const intensitiesArray = ['Light', 'Moderate', 'Intensive'];
const EducatorForm = ({ direction }) => {
    const addPlan = async (data) => {
        await API.post('invoice', {
            patientId: data.patientId,
            topics: data.topics,
            intensityId: data.intensityId,
            description: data.description
        });
    };
    const addPatient = async (data) => {
        console.log(data);
        await API.post('patient/createPatient', {
            ...formValues
        });
    };
    const { t } = useTranslation('create-patient');
    const router = useRouter();
    const [current, setCurrent] = React.useState(1);
    const [form] = Form.useForm();
    const { Option } = Select;
    const [planStatus, setPlanStatus] = useState('plan');
    const [loading, setLoading] = useState(false);
    const [topics, setTopics] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [formValues, setFormValues] = useState({});

    const { data: doctors } = useQuery('intensities', () => getDoctors(), {
        onError: (err) => {
            if (err.response) {
                const { data = {} } = err.response;
                toastr.error(data.message[0]);
            } else if (err.message) {
                toastr.error(err.message);
            } else if (err.request) {
                toastr.error(err.request);
            }
        }
    });
    const { data: intensities } = useQuery('intensities', () => getDoctors(), {
        onError: (err) => {
            if (err.response) {
                const { data = {} } = err.response;
                toastr.error(data.message[0]);
            } else if (err.message) {
                toastr.error(err.message);
            } else if (err.request) {
                toastr.error(err.request);
            }
        }
    });

    const { data: topicsData } = useQuery('topics', () => getTopics(), {
        onError: (err) => {
            if (err.response) {
                const { data = {} } = err.response;
                toastr.error(data.message[0]);
            } else if (err.message) {
                toastr.error(err.message);
            } else if (err.request) {
                toastr.error(err.request);
            }
        }
    });
    const { mutate: addPlanMutate } = useMutation((data) => addPlan(data), {
        onSuccess: () => {
            router.push('/overview');
        },
        onError: (err) => {
            if (err.response) {
                const { data = {} } = err.response;
                toastr.error(data.message[0]);
            } else if (err.message) {
                toastr.error(err.message);
            } else if (err.request) {
                toastr.error(err.request);
            }
        },
        onSettled: () => {
            setLoading(false);
        }
    });
    const { mutate: addPatientMutate } = useMutation((data) => addPatient(data), {
        onSuccess: () => {
            setCurrent(current + 1);
        },
        onError: (err) => {
            if (err.response) {
                const { data = {} } = err.response;
                toastr.error(data.message[0]);
            } else if (err.message) {
                toastr.error(err.message);
            } else if (err.request) {
                toastr.error(err.request);
            }
        },
        onSettled: () => {
            setLoading(false);
        }
    });

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
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name="doctorSelect"
                                        className={`w-100 ${FormStyles.form_item}`}
                                        label={
                                            <p className={FormStyles.label_form}>{t('doctor')}</p>
                                        }
                                        rules={[
                                            { required: true, message: 'Please select doctor' }
                                        ]}>
                                        <Select
                                            allowClear
                                            className="w-100"
                                            onChange={(e) => {
                                                setDoctor((prev) => [...prev, e]);
                                            }}>
                                            {topicsData?.data.map((topic, i) => (
                                                <Option key={i} value={topic.id}>
                                                    {topic.title}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="planType"
                                        className={FormStyles.form_item}
                                        label={
                                            <p className={FormStyles.label_form}>
                                                {t('Plan type')}
                                            </p>
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Plan type'
                                            }
                                        ]}>
                                        <Radio.Group className="toggle">
                                            <Space direction="vertical">
                                                {intensitiesArray?.map((intensity, i) => (
                                                    <Radio key={i} value={intensity}>
                                                        <span>{intensity}</span>
                                                    </Radio>
                                                ))}
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="planDuration"
                                        className={FormStyles.form_item}
                                        label={
                                            <p className={FormStyles.label_form}>
                                                {t('Plan duration')}
                                            </p>
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Plan duration'
                                            }
                                        ]}>
                                        <Radio.Group className="toggle">
                                            <Space direction="vertical">
                                                <Radio value={1}>
                                                    <span>1 Month</span>
                                                </Radio>
                                                <Radio value={3}>
                                                    <span>3 Months</span>
                                                </Radio>
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        mode="multiple"
                                        name="topics"
                                        className={`w-100 ${FormStyles.form_item}`}
                                        label={
                                            <p className={FormStyles.label_form}>{t('topics')}</p>
                                        }
                                        rules={[
                                            { required: true, message: 'Please select topics' }
                                        ]}>
                                        <Select
                                            placeholder="Please select topics"
                                            allowClear
                                            className="w-100"
                                            mode="multiple"
                                            onChange={(e) => setTopics((prev) => [...prev, e])}>
                                            {topicsData?.data.map((topic, i) => (
                                                <Option key={i} value={topic.id}>
                                                    {topic.title}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
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
        switch (current) {
            case 0:
                form.validateFields(['name', 'phoneNumber', 'diabetesType'])
                    .then(() => {
                        setFormValues({ ...form.getFieldsValue() });
                        addPatientMutate(formValues);
                    })
                    .catch((err) => console.log({ err }));
                break;
            case 1:
                planStatus === 'plan'
                    ? form
                          .validateFields(['planType', 'planDuration'])
                          .then(() => {
                              setFormValues((prev) => {
                                  return {
                                      ...prev,
                                      ...form.getFieldsValue(),
                                      topics: topics.map((topic) => {
                                          return { id: topic[0] };
                                      })
                                  };
                              });
                          })
                          .then(() => {
                              console.log(formValues);
                          })
                          .catch((err) => console.log({ err }))
                    : console.log('first');
                break;
            default:
                break;
        }
    };
    React.useEffect(() => {
        if (current === 1 && formValues?.topics?.length >= 1 && doctor) {
            console.log({ formValues });
            addPlanMutate(formValues);
        }
    }, [formValues]);

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
                            loading={loading}
                        />
                    )}
                    {current === steps.length - 1 && (
                        <CustomButton
                            text="Done"
                            className="pinkBG w-50"
                            handleButtonClick={() => next()}
                            loading={loading}
                        />
                    )}
                </div>
            </ConfigProvider>
        </div>
    );
};
export const getServerSideProps = async () => {
    const qClient = new QueryClient();
    await qClient.prefetchQuery('intensities', () => getIntensity());
    await qClient.prefetchQuery('topics', () => getTopics());
    await qClient.prefetchQuery('topics', () => getDoctors());

    return {
        props: {
            dehydratedState: dehydrate(qClient)
        }
    };
};
EducatorForm.propTypes = {
    direction: PropTypes.string.isRequired
};
export default EducatorForm;
