// import PropTypes from 'prop-types';

import { Col, ConfigProvider, Form, Image, Input, Row, Typography } from 'antd';

import API from '@utils/axios';
import CustomButton from '@src/components/CustomBtn';
import LangChanger from '@src/components/LangToggle';
import Link from 'next/link';
import Placeholder from '@components/Placeholder';
import PropTypes from 'prop-types';
import Toast from '@components/ToastMsg';
import authStyles from '@styles/Auth.module.scss';
import authenticatedRoute from '@components/AuthenticatedRoute';
import { setUser } from '@redux/actions/user';
import toastr from 'toastr';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

const { Text } = Typography;

const Login = ({ direction }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation('login');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onFinish = ({ email, password }) => {
        setLoading(true);
        API.post('auth/signin', {
            email,
            password
        })
            .then((res) => {
                try {
                    setLoading(false);

                    if (res?.status === 201) {
                        dispatch(setUser(res.data));
                        fetch('/api/auth/login', {
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ token: res.data.accessToken })
                        }).then(() => {
                            router.push('/overview');
                        });
                    }
                } catch (error) {
                    direction === 'rtl' ? Toast(error.ar) : Toast(error.en);
                    // toastr.error('something went wrong');
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
    // const onFinishFailed = (errorInfo) => {
    //     toastr.warning('Something went wrong');
    // };
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
                        <Col span={18}>
                            <Row justify="center">
                                <Image
                                    preview={false}
                                    width={100}
                                    src="/assets/logo-dark-notext.png"
                                    className="logo-Login"
                                />
                            </Row>
                            <Row justify="space-around">
                                <p className="title-1 dark-blue">{t('login')}</p>
                            </Row>
                            <Form
                                name="basic"
                                className="form-container"
                                layout="vertical"
                                onFinish={onFinish}
                                // onFinishFailed={onFinishFailed}
                            >
                                <Row justify="space-around" align="middle">
                                    <Col span={23}>
                                        <Form.Item
                                            validateTrigger={'onBlur'}
                                            label={t('email')}
                                            name="email"
                                            className="dark-blue mb-1"
                                            rules={[
                                                {
                                                    required: true,
                                                    type: 'email',
                                                    message: t('emailError')
                                                }
                                            ]}>
                                            <Input className={authStyles.input} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={23}>
                                        <Form.Item
                                            label={t('password')}
                                            className="mb-0"
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t('emptyPassword')
                                                }
                                            ]}>
                                            <Input.Password className={authStyles.input} />
                                        </Form.Item>
                                        <Row justify="end" className="mb-1">
                                            <Link className={`blue pointer`} href="/forgetpassword">
                                                <a>{t('forgetPassword')}</a>
                                            </Link>{' '}
                                        </Row>
                                    </Col>
                                </Row>

                                <Row justify="center" align="middle">
                                    <Col span={24}>
                                        <Form.Item>
                                            <CustomButton
                                                htmlType="submit"
                                                text={t('login')}
                                                className={`${authStyles.btnRegister} btn-text`}
                                                loading={loading}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Text type="secondary" className="gothic">
                                    {t('newHere')}
                                    &nbsp;
                                    <Link className="blue pointer" href="/signup">
                                        <a>
                                            {t('register')}&nbsp;
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
Login.propTypes = {
    direction: PropTypes.string.isRequired
};
// export default Login;
export default authenticatedRoute(Login);
