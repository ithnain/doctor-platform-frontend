import { Checkbox, Col, ConfigProvider, Form, Input, Radio, Row, Select, Space, Steps } from 'antd';
import React, { useEffect, useState } from 'react';

import { QueryClient, dehydrate, useQuery, useMutation, useQueryClient } from 'react-query';

import API from '@utils/axios';
import CustomButton from '../CustomBtn';
import FormStyles from '../AddPatientForm/Patient.module.scss';
import PropTypes from 'prop-types';
import Styles from './educator.module.scss';
import types from '../AddPatientForm/types.json';
import useTranslation from 'next-translate/useTranslation';
import toastr from 'toastr';
import { useRouter } from 'next/router';
import UploadCSVfile from '../UploadCSVfile';

const { Step } = Steps;
const getIntensity = async () => await API.get(`invoice/intensity`);
const getTopics = async () => await API.get(`invoice/topic`);
const getDiseases = async () => await API.get(`/disease-type`);
const getCaseHandlers = async () => await API.get(`/invoice/educators`);

const EducatorForm = ({ direction }) => {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryState('user').data?.data;
    const getDoctors = async () => API.get(`hospitals/${user?.hospital.id}`);
    const addPlan = async (data) => {
        await API.post('invoice', {
            patientId: patient.id,
            topics: topics.map((topic) => {
                return { id: topic };
            }),
            intensityId: intensityId,
            planPaid,
            dpEducatorId,
            dpCasehandlerId
        });
        router.push('/overview');
    };

    const addPlanList = async (data) => {
        setLoading(true)
        return await API.post('invoice/invoiceList', {
            patientIds: patientList.map((patient) => {
                return { id: patient.id };
            }),
            topics: topics.map((topic) => {
                return { id: topic };
            }),
            intensityId: intensityId,
            planPaid,
            dpEducatorId,
            dpCasehandlerId
        }).then((result) => {
                setLoading(false)
                router.push('/overview');
            })
            .catch((error) => {
                setLoading(false);
                console.log("ERROR inside list:" + error);
                return error;
            });
    };

    const { t } = useTranslation('create-patient');
    const router = useRouter();
    const [current, setCurrent] = React.useState(0);
    const [form] = Form.useForm();
    const [patientCSVfile, setPatientCSVfile] = useState(null);
    const { Option } = Select;
    const [planStatus, setPlanStatus] = useState('plan');
    const [loading, setLoading] = useState(false);
    const [topics, setTopics] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [patient, setPatinet] = useState({});
    const [patientList, setPatinetList] = useState([]);
    const [intensitiesArray, setIntensitiesArray] = useState(['aaa', 'bbb']);
    const [intensityId, setIntensityId] = useState('');
    const [dpEducatorId, setEducatorId] = useState('');
    const [dpCasehandlerId, setCasehandlerId] = useState('');
    const [planPaid, setPlanPaid] = useState(false);

    useEffect(() => {
        const intensitiesQuery = queryClient.getQueryState('intensities').data;
        const doctorsQuery = queryClient.getQueryState('doctors').data;
        if (intensitiesQuery) {
            setIntensitiesArray(intensitiesQuery?.data?.enumeration?.intesities);
        }
        if (doctorsQuery) {
            setDoctors(doctorsQuery?.data?.users);
        }
    }, [getDoctors]);

    const addPatient = async (data) => {
        setLoading(true);
        const patient = await API.post('patient/createPatient', {
            ...formValues
        }).then((result) => {
            setLoading(false)
            setCurrent(current + 1);
            return result;
        });
        setPatinet(patient.data);
    };

    const addPatientList = async ({ data, file }) => {
        var formData = new FormData();
        formData.append("file", file);
        formData.append('doctorId', data.doctorId);
        formData.append('educatorId', data.educatorId);

        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                charsets: "utf-8",
            },
        };
        setLoading(true)
        const patients = await API.post("/patient/createPatientList", formData, config)
            .then((result) => {
                setLoading(false)
                setCurrent(current + 1);
                if (result.status === 201)
                    return result.data;
            })
            .catch((error) => {
                setLoading(false);
                toastr.error(error.response?.data?.error?.message?.en);
                return error;
            });
        setPatinetList(patients);
    }

    const { data } = useQuery('doctors', () => getDoctors(), {
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
    const { data: intensities } = useQuery('intensities', () => getIntensity(), {
        onSuccess: (data) => {
            return data;
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
        }
    });
    const { data: diseases=[] } = useQuery('diseasesTypes', () => getDiseases(), {
        onSuccess: (data) => {
            return data;
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
        }
    });
    const { data: casehandlers=[] } = useQuery('casehandlers', () => getCaseHandlers(), {
        onSuccess: (data) => {
            return data;
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
    const { mutate: addPlanMutate } = useMutation((data) => !patientCSVfile ? addPlan(data): addPlanList({data}), {
        onSuccess: () => {
            // router.push('/overview');
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
    const { mutate: addPatientMutate } = useMutation('patient', (data) => !patientCSVfile ? addPatient(data) : addPatientList({data, file:patientCSVfile}) , {
        onSuccess: (data) => {
            console.log(data);
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
                    <Col span={24}>
                        <Form.Item
                            name="doctorId"
                            className={`w-100 ${FormStyles.form_item}`}
                            label={<p className={FormStyles.label_form}>{t('doctor')}</p>}
                            rules={[{ required: true, message: 'Please select doctor' }]}>
                            <Select allowClear className="w-100" onChange={(e) => {}}>
                                {doctors?.map((doctor) => (
                                    <Option key={doctor.id} value={doctor.id}>
                                        {doctor.name ? doctor.name : doctor.email}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="educatorId"
                            className={`w-100 ${FormStyles.form_item}`}
                            label={<p className={FormStyles.label_form}>{t('app casehandler')}</p>}
                            rules={[{ required: true, message: 'Please select a casehandler' }]}>
                            <Select allowClear className="w-100" onChange={(e) => setCasehandlerId(e)}>
                                {casehandlers.data && casehandlers.data?.filter((ch) => ch.isCaseHandler).map((doctor) => (
                                    <Option key={doctor.id} value={doctor.id}>
                                        {doctor.name ? doctor.name : doctor.email}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Form.Item
                        name="name"
                        label={<p className={FormStyles.label_form}>{t('Full Name')}</p>}
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
                                pattern: /^(5)(0|1|2|3|4|5|6|7|8|9)([0-9]{7})$/,
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
                            {diseases.data && diseases.data.map((type) => {
                                return (
                                    <Option key={type.id} value={type.name}>
                                        {type.name}
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
                                <Col span={12}>
                                    <Form.Item
                                        name="intensityId"
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
                                                {intensitiesArray?.length &&
                                                    intensitiesArray
                                                        ?.sort(
                                                            (a, b) =>
                                                                a?.intensityDuration -
                                                                b?.intensityDuration
                                                        )
                                                        ?.map((intensity) => {
                                                            return (
                                                                <Radio
                                                                    key={intensity?.intensityId}
                                                                    value={intensity?.intensityId}
                                                                    onChange={(e) => {
                                                                        setIntensityId(
                                                                            e.target.value
                                                                        );
                                                                    }}>
                                                                    <span>
                                                                        {intensity?.intensityTitle},{' '}
                                                                        {
                                                                            intensity?.intensityDuration
                                                                        }{' '}
                                                                        Months
                                                                    </span>
                                                                </Radio>
                                                            );
                                                        })}
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="dpEducatorId"
                                        className={`w-100 ${FormStyles.form_item}`}
                                        label={
                                            <p className={FormStyles.label_form}>{t('app specialist')}</p>
                                        }
                                        rules={[
                                            { required: true, message: 'Please select specialist' }
                                        ]}>
                                        <Select
                                            placeholder="Please select specialist"
                                            allowClear
                                            className="w-100"
                                            onChange={(e) => setEducatorId(e)}>
                                            {casehandlers.data && casehandlers.data?.filter((ch) => !ch.isCaseHandler).map((doctor) => (
                                                <Option key={doctor.id} value={doctor.id}>
                                                    {doctor.name ? doctor.name : doctor.email}
                                                </Option>
                                            ))}
                                        </Select>
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
                                            onChange={(e) => setTopics(e)}>
                                            {topicsData?.data &&
                                                topicsData?.data.map((topic, i) => (
                                                    <Option key={topic.id} value={topic.id}>
                                                        {topic.title}
                                                    </Option>
                                                ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item>
                                        <Checkbox
                                            onChange={() => {
                                                setPlanPaid((prevState) => {
                                                    return !prevState;
                                                });
                                            }}
                                            name="planPaid">
                                            {t('Pre Paid Plan')}
                                        </Checkbox>
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
    const onCreatePatient = () => {
        if (!patientCSVfile)
            // MUST Change back when using other accounts
            form.validateFields(['name', 'phoneNumber', 'diabetesType', 'doctorId', 'educatorId'])
            // form.validateFields(['name', 'phoneNumber', 'doctorId'])
                .then(() => {
                    // setFormValues({ ...form.getFieldsValue() });
                    setFormValues({ name: form.getFieldsValue().name,  phoneNumber: form.getFieldsValue().phoneNumber, doctorId: form.getFieldsValue().doctorId});
                    addPatientMutate(form.getFieldsValue());
                })
                .catch((err) => console.log({ err }));
        else
            form.validateFields(['doctorId', 'educatorId'])
                .then(() => {
                    setFormValues({ ...form.getFieldsValue() });
                    addPatientMutate(form.getFieldsValue());
                })
                .catch((err) => console.log({ err }));
    };
    const onCreatePlan = () => {
        form.validateFields(['intensityId', 'planDuration', 'dpEducatorId'])
            .then(() => {
                setFormValues((prev) => {
                    return {
                        ...prev,
                        ...form.getFieldsValue(),
                        topics: topics.map((topic) => {
                            return { id: topic[0] };
                        }),
                        intensityId,
                        dpEducatorId
                    };
                });
            })
            .then(() => {
                addPlanMutate(formValues);
            })
            .catch((err) => console.log({ err }));
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
                            {/* <Radio value={'recommendation'}>
                                <span className="radio-title">{t('askForRecommendation')} </span>
                            </Radio> */}
                        </Space>
                    </Radio.Group>
                )}
                {planStatus === 'plan' && (
                    <div className={Styles.content}>{steps[current].content}</div>
                )}
                <div className={Styles.action}>
                    {current < steps.length - 1 && (
                        <>
                            <CustomButton
                                text="Next"
                                handleButtonClick={() => onCreatePatient()}
                                className="pinkBG w-50 mr-10"
                                loading={loading}
                            />
                            <UploadCSVfile setFile={setPatientCSVfile} t={t} />

                        </>

                    )}
                    {current === steps.length - 1 && (
                        <>
                            <CustomButton
                                text="Done"
                                className="pinkBG w-50"
                                handleButtonClick={() => onCreatePlan()}
                                loading={loading}
                            />
                            <CustomButton
                                text="Don't create a plan"
                                className="whiteBG w-50"
                                handleButtonClick={() => router.push('/overview')}
                                loading={loading}
                            />
                        </>

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
    await qClient.prefetchQuery('diseasesTypes', () => getDiseases());

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
