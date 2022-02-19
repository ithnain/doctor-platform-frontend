import { Col, ConfigProvider, Form, Input, Row, Typography } from 'antd';
import API from '@utils/axios';
import CustomButton from '@src/components/CustomBtn';
import LangChanger from '@src/components/LangToggle';
import Link from 'next/link';
import Placeholder from '@components/Placeholder';
import PropTypes from 'prop-types';
import authStyles from '@styles/Auth.module.scss';
import authenticatedRoute from '@components/AuthenticatedRoute';
import toastr from 'toastr';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useMutation } from 'react-query';
import Image from 'next/image';

const { Text } = Typography;

const Login = ({ direction }) => {
    const { t, lang } = useTranslation('login');

    const getUser = async (credintials) =>
        await API.post('auth/signin', {
            email: credintials.email,
            password: credintials.password
        });

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { mutate } = useMutation(getUser, {
        onSuccess: (data) => {
            fetch('/api/auth/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: data.data.accessToken })
            }).then(() => {
                router.push('/overview');
            });
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
        onSettled: async () => {
            setLoading(false);
        }
    });

    const onFinish = ({ email, password }) => {
        setLoading(true);
        mutate({ email, password });
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
                        <Col span={18}>
                            <Row justify="center">
                                <Image width={100} height={45} src="/assets/logo-dark-notext.png" />
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
