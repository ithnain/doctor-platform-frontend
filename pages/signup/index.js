import { Col, Form, Image, Input, Radio, Row, Select, Space, Typography } from 'antd';

import API from '@src/utils/axios';
import { ConfigProvider } from 'antd';
import CustomButton from '@src/components/CustomBtn';
import LangChanger from '@src/components/LangToggle';
import Link from 'next/link';
import Placeholder from '@components/Placeholder';
import PropTypes from 'prop-types';
import authStyles from '@styles/Auth.module.scss';
import toastr from 'toastr';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useQuery, useMutation } from 'react-query';

const getHospitals = async () => await API.get(`/hospitals`);
const { Text } = Typography;
const SignUp = ({ direction }) => {
    const { t, lang } = useTranslation('signup');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [doctorStatus, setDoctorStatus] = useState('partner');
    const requiredField = t('common:requiredInput');
    const { data: hospitals } = useQuery('allPatients', getHospitals);

    const setUser = async (credintials) => {
        await API.post('auth/signUp', {
            email: credintials.email,
            password: credintials.password,
            name: credintials.name,
            nationalId: credintials.nationalId,
            specialty: credintials.specialty,
            phoneNumber: credintials.phoneNumber,
            hospital: credintials.hospital,
            gender: credintials.gender,
            role: doctorStatus === 'partner' ? 'REPRESENTATIVE' : 'DOCTOR'
        });
    };
    const { mutate: signMutate } = useMutation((credintials) => setUser(credintials), {
        onSuccess: () => {
            toastr.success('User registed successfully');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        },
        onError: (err) => {
            if (err.response) {
                const { data = {} } = err.response;
                const { error = {} } = data;
                const { message = 'Something went wrong' } = error;
                toastr.error(message[`${lang}`]);
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
    const onFinish = ({
        email,
        password,
        name,
        nationalId,
        specialty,
        phoneNumber,
        hospital,
        gender
    }) => {
        setLoading(true);
        let selectedHospital;
        hospitals?.data.map((h) => {
            if (h.id === hospital) {
                selectedHospital = h;
            } else {
                return;
            }
        });
        signMutate({
            email,
            password,
            name,
            nationalId,
            specialty,
            phoneNumber,
            hospital: selectedHospital,
            gender
        });
    };
    const handleDoctorStatus = (newState) => {
        setDoctorStatus(newState);
    };
    return (
        <Row>
            <Col
                xs={0}
                md={12}
                type="flex"
                justify="center"
                align="center"
                className={authStyles.authLeftSide}>
                <Placeholder />
            </Col>
            <ConfigProvider direction={direction}>
                <Col
                    xs={24}
                    md={12}
                    type="flex"
                    justify="center"
                    align="center"
                    direction="column"
                    className={authStyles.authRightSide}>
                    <Row type="flex" justify="center" align="middle">
                        <LangChanger abs={true} />
                        <Col span={18} type="flex" justify="start">
                            <Row justify="start">
                                <Image width={100} height={45} src="/assets/logo-dark-notext.png" />
                            </Row>
                            <Row justify="start">
                                <p className="title-1 dark-blue">{t('DoctorRegistration')}</p>
                            </Row>
                            <Row justify="start">
                                <Radio.Group
                                    className="toggle"
                                    onChange={(e) => handleDoctorStatus(e.target.value)}
                                    value={doctorStatus}>
                                    <Space direction="vertical">
                                        <Radio value={'individual'}>
                                            <span className="radio-title">
                                                {t('individualDoctor')}
                                            </span>{' '}
                                            {t('ifIndividual')}
                                        </Radio>
                                        <Radio value={'partner'}>
                                            <span className="radio-title">
                                                {t('partnerDoctor')}{' '}
                                            </span>
                                            {t('ifPartner')}
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Row>
                            <Form
                                name="basic"
                                className="form-container"
                                layout="vertical"
                                onFinish={onFinish}>
                                {doctorStatus === 'partner' && (
                                    <Row justify="start">
                                        <Col span={22}>
                                            <Form.Item
                                                label={t('HospitalName')}
                                                name="hospital"
                                                className="dark-blue mb-1"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: requiredField
                                                    }
                                                ]}>
                                                <Select size="medium">
                                                    {hospitals?.data?.length ? (
                                                        hospitals?.data.map((hospital) => {
                                                            return (
                                                                <Select.Option
                                                                    key={hospital.id}
                                                                    value={hospital.id}>
                                                                    {hospital.name}
                                                                </Select.Option>
                                                            );
                                                        })
                                                    ) : (
                                                        <Select.Option key={Math.random()} disabled>
                                                            {t('noHospitals')}
                                                        </Select.Option>
                                                    )}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )}
                                <Row justify="start">
                                    <Col span={22}>
                                        <Form.Item
                                            label={t('DoctorName')}
                                            name="name"
                                            className="dark-blue mb-1"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: requiredField
                                                }
                                            ]}>
                                            <Input className={authStyles.input} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row justify="start">
                                    <Col span={22}>
                                        <Form.Item
                                            label={t('Specialty')}
                                            name="specialty"
                                            className="dark-blue mb-1"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: requiredField
                                                }
                                            ]}>
                                            <Input className={authStyles.input} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row justify="start">
                                    <Col span={22}>
                                        <Form.Item
                                            label={t('email')}
                                            name="email"
                                            className="dark-blue mb-1"
                                            rules={[
                                                {
                                                    required: true,
                                                    type: 'email',
                                                    message: requiredField
                                                }
                                            ]}>
                                            <Input className={authStyles.input} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row justify="start">
                                    <Col span={22}>
                                        <Form.Item
                                            label={t('Phone')}
                                            name="phoneNumber"
                                            className="dark-blue mb-1"
                                            rules={[
                                                {
                                                    required:
                                                        doctorStatus === 'partner' ? true : false,
                                                    message: requiredField
                                                },
                                                {
                                                    pattern: /^(0|2|3|4|5|6|7|8|9)([0-9]{8})$/,
                                                    message: t('invalidPhone')
                                                }
                                            ]}>
                                            <Input
                                                className={authStyles.input}
                                                placeholder="5xxxxxxxx"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row justify="start">
                                    <Col span={22}>
                                        <Form.Item
                                            label={t('password')}
                                            className="mb-1"
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: requiredField
                                                },
                                                {
                                                    pattern:
                                                        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                                                    message: t('weakPassword')
                                                }
                                            ]}>
                                            <Input.Password className={authStyles.input} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item>
                                    <CustomButton
                                        htmlType="submit"
                                        text="Register"
                                        className={`${authStyles.btnRegister} btn-text`}
                                        loading={loading}
                                    />
                                </Form.Item>
                                <Text type="secondary" className="gothic">
                                    {t('alreadyUser')}
                                    <span className="regular-font"></span>&nbsp;
                                    <Link className="blue pointer" href="/login">
                                        <a>
                                            {t('login')}&nbsp;
                                            {t('now')}
                                        </a>
                                    </Link>
                                </Text>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </ConfigProvider>
        </Row>
    );
};
export const getStaticProps = async () => {
    try {
        const { data } = await API.get(`/hospitals`);
        return {
            props: {
                hospitals: data
            }
        };
    } catch (error) {
        return {
            props: {
                hospitals: []
            }
        };
    }
};
SignUp.propTypes = {
    direction: PropTypes.string.isRequired,
    hospitals: PropTypes.array.isRequired
};
export default SignUp;
