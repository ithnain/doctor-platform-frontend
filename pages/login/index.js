// import PropTypes from 'prop-types';

import { Col, ConfigProvider, Form, Image, Input, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';

import {api , addTokenToReq} from '@utils/network';
import CustomButton from '@src/components/CustomBtn';
import LangChanger from '@src/components/LangToggle';
import Link from 'next/link';
import Placeholder from '@components/Placeholder';
import authStyles from '@styles/Auth.module.scss';
import toastr from 'toastr';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { parseJwt } from '@src/utils/helpers';
import { useDispatch } from 'react-redux';
import { setUser } from '@src/redux/actions/user';

const { Text } = Typography;

const Login = () => {
    const { t } = useTranslation(['login', 'common']);
    const dispatch = useDispatch();
    const router = useRouter();
    const [direction, setdirection] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        router.locale === 'ar' ? setdirection('rtl') : setdirection('ltr');
    }, [router.locale]);
    const onFinish = ({ email, password }) => {
        console.log({
            email,
            password
        });

        setLoading(true);

        api.post('auth/signin', {
            email,
            password
        })
            .then((res) => {
                try {
                    setLoading(false);
                    console.log(res);

                    if (res?.status === 201) {
                        const {id, role, name} = parseJwt(res.data.accessToken)
                        dispatch(setUser({id, role, name}));
                        addTokenToReq(res?.data?.accessToken)
                        switch (role) {
                            case 'DOCTOR':
                                router.push('/doctor')
                                break;
                            case 'SUPERVISOR':
                                // router.push('/????')
                                break;
                            case 'CASE_HANDLER':
                                // router.push('/????')
                                break;
                            case 'ADMIN':
                                // router.push('/???')
                                break;
                        
                            default:
                                break;
                        }
                        // router.push('/doctor');
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
                                onFinishFailed={onFinishFailed}>
                                <Row justify="space-around" align="middle">
                                    <Col span={23}>
                                        <Form.Item
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
                                            className="mb-1"
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t('emptyPassword')
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

export default Login;
