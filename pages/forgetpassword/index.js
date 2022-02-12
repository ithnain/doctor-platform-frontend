// import PropTypes from 'prop-types';

import { Col, ConfigProvider, Form, Image, Input, Row } from 'antd';

import API from '@utils/axios';
import CustomButton from '@src/components/CustomBtn';
import LangChanger from '@src/components/LangToggle';
import Placeholder from '@components/Placeholder';
import PropTypes from 'prop-types';
import Toast from '@components/ToastMsg';
import authStyles from '@styles/Auth.module.scss';
import toastr from 'toastr';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

const ForgetPassword = ({ direction }) => {
    const { t } = useTranslation('forgetpassword');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onFinish = ({ email }) => {
        setLoading(true);
        API.post('auth/signin', {
            email
        })
            .then((res) => {
                try {
                    setLoading(false);

                    if (res?.status === 201) {
                        router.push('/login');
                    }
                } catch (error) {
                    direction === 'rtl' ? Toast(error.ar) : Toast(error.en);
                }
            })
            .catch((err) => {
                if (err.response) {
                    const { data = {} } = err.response;
                    const { error = {} } = data;
                    const { message = 'Something went wrong' } = error;
                    direction === 'rtl' ? toastr.error(message.ar) : toastr.error(message.en);
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
                                <p className="title-1 dark-blue">{t('forgetPassword')}</p>
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
                                </Row>

                                <Row justify="center" align="middle">
                                    <Col span={24}>
                                        <Form.Item>
                                            <CustomButton
                                                htmlType="submit"
                                                text={t('resetPassword')}
                                                className={`${authStyles.btnRegister} btn-text`}
                                                loading={loading}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </ConfigProvider>
        </Row>
    );
};
ForgetPassword.propTypes = {
    direction: PropTypes.string.isRequired
};
// export default Login;
export default ForgetPassword;
