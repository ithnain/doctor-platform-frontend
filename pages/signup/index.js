import { Col, Form, Image, Input, Row, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';

import API from '@utils/axios';
import { ConfigProvider } from 'antd';
import CustomButton from '@src/components/CustomBtn';
import LangChanger from '@src/components/LangToggle';
import Link from 'next/link';
import Placeholder from '@components/Placeholder';
import PropTypes from 'prop-types';
import authStyles from '@styles/Auth.module.scss';
import { setUser } from '@redux/actions/user';
import toastr from 'toastr';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

const { Text } = Typography;
const SignUp = ({ hospitals }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation('signup');
    const router = useRouter();
    const [direction, setdirection] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        router.locale === 'ar' ? setdirection('rtl') : setdirection('ltr');
    }, [router.locale]);
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
        hospitals.map((h) => {
            if (h.id === hospital) {
                selectedHospital = h;
            } else {
                return;
            }
        });
        API.post('auth/signup', {
            email,
            password,
            name,
            nationalId,
            specialty,
            phoneNumber,
            hospital: selectedHospital,
            gender,
            role: 'DOCTOR'
        })
            .then((res) => {
                try {
                    setLoading(false);
                    console.log(res);

                    if (res?.status === 201) {
                        dispatch(setUser(res.data));
                        // router.push('/login');
                        toastr.success('User registed successfully');
                    }
                } catch (error) {
                    toastr.error('something went wrong');
                }
            })
            .catch((err) => {
                if (err.response?.data?.message) {
                    toastr.error(err.response.data?.message);
                } else if (err.message) {
                    toastr.error(err.message);
                } else if (err.request) {
                    toastr.error(err.request);
                }
                setLoading(false);
            });
    };
    const onFinishFailed = (errorInfo) => {
        toastr.warning(errorInfo.data.message);

        console.log('Failed:', errorInfo);
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
                        <Col span={24} type="flex" justify="start">
                            <Row justify="center">
                                <Image
                                    preview={false}
                                    width={100}
                                    src="/assets/logo-dark-notext.png"
                                    className="logo-signup"
                                />
                            </Row>
                            <Row justify="space-around">
                                <p className="title-1 dark-blue">{t('DoctorRegistration')}</p>
                            </Row>
                            <Form
                                // {...layout}
                                name="basic"
                                className="form-container"
                                layout="vertical"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}>
                                <Row justify="space-around" align="middle">
                                    <Col span={11}>
                                        <Form.Item
                                            label={t('DoctorName')}
                                            name="name"
                                            className="dark-blue mb-1"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Name!'
                                                }
                                            ]}>
                                            <Input className={authStyles.input} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={11}>
                                        <Form.Item
                                            label={t('ID')}
                                            name="nationalId"
                                            className="dark-blue mb-1"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Your ID must be 10 digits',
                                                    min: 10
                                                }
                                            ]}>
                                            <Input className={authStyles.input} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row justify="space-around" align="middle">
                                    <Col span={11}>
                                        <Form.Item
                                            label={t('Phone')}
                                            name="phoneNumber"
                                            className="dark-blue mb-1"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Phone'
                                                },
                                                {
                                                    pattern: /^(0|2|3|4|5|6|7|8|9)([0-9]{8})$/,
                                                    message: 'Phone number is not valid'
                                                }
                                            ]}>
                                            <Input
                                                className={authStyles.input}
                                                placeholder="5xxxxxxxx"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={11}>
                                        <Form.Item
                                            label={t('gender')}
                                            name="gender"
                                            className="dark-blue mb-1"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Gender'
                                                }
                                            ]}>
                                            <Select size="medium">
                                                <Select.Option key={'male'} value={'male'}>
                                                    {t('male')}
                                                </Select.Option>
                                                <Select.Option key={'female'} value={'female'}>
                                                    {t('female')}
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row justify="space-around" align="middle">
                                    <Col span={11}>
                                        <Form.Item
                                            label={t('email')}
                                            name="email"
                                            className="dark-blue mb-1"
                                            rules={[
                                                {
                                                    required: true,
                                                    type: 'email',
                                                    message: 'Please input your email!'
                                                }
                                            ]}>
                                            <Input className={authStyles.input} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={11}>
                                        <Form.Item
                                            label={t('password')}
                                            className="mb-1"
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!'
                                                },
                                                {
                                                    pattern:
                                                        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                                                    message: 'Password too weak'
                                                }
                                            ]}>
                                            <Input.Password className={authStyles.input} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row justify="space-around" align="middle">
                                    <Col span={11}>
                                        <Form.Item
                                            label={t('Specialty')}
                                            name="specialty"
                                            className="dark-blue mb-1"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Specialty'
                                                }
                                            ]}>
                                            <Input className={authStyles.input} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={11}>
                                        <Form.Item
                                            label={t('HospitalName')}
                                            name="hospital"
                                            className="dark-blue mb-1"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Hospital'
                                                }
                                            ]}>
                                            <Select size="medium">
                                                {hospitals?.length ? (
                                                    hospitals.map((hospital) => {
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
                                        </Form.Item>{' '}
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
    hospitals: PropTypes.array.isRequired
};
export default SignUp;
