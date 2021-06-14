import PropTypes from 'prop-types';
import { Form, Input, Row, Col, Image, Typography } from 'antd';
import Placeholder from '@components/Placeholder';
import CustomButton from '@src/components/CustomBtn';
import Link from 'next/link';
import en from '@src/i18n/en';
import ar from '@src/i18n/ar';
const { Text } = Typography;
import authStyles from '@styles/Auth.module.scss';

const Login = ({ lang, setLang }) => {
    const t = lang === 'en' ? en : ar;
    const onFinish = ({ email, password }) => {
        console.log({
            email,
            password
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
            <Col
                xs={24}
                md={12}
                type="flex"
                justify="center"
                align="center"
                direction="column"
                className={authStyles.authRightSide}>
                <Row type="flex" justify="center" align="middle">
                    {/* <LangChanger setLang={setLang} /> */}
                    <Col span={24}>
                        <Row justify="center">
                            <Image
                                preview={false}
                                width={100}
                                src="/assets/logo-dark-notext.png"
                                className="logo-Login"
                            />
                        </Row>
                        <Row justify="space-around">
                            <p className="title-1 dark-blue">{t.DoctorRegistration}</p>
                        </Row>
                        <Form
                            // {...layout}
                            name="basic"
                            className="form-container"
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}>
                            <Row justify="space-around" align="middle">
                                <Col span={23}>
                                    <Form.Item
                                        label={t.email}
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

                                <Col span={23}>
                                    <Form.Item
                                        label={t.password}
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

                            <Form.Item>
                                <CustomButton
                                    htmlType="submit"
                                    text="Register"
                                    className={`${authStyles.btnRegister} btn-text`}
                                    // loading={loadingLogin}
                                />
                            </Form.Item>
                            <Text type="secondary" className="gothic">
                                {t.newHere}
                                <span className="regular-font">?</span>&nbsp;
                                <Link className="blue pointer" href="/signup">
                                    <a>
                                        {t.register}&nbsp;
                                        {t.now}
                                    </a>
                                </Link>
                            </Text>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
Login.propTypes = {
    lang: PropTypes.string.isRequired,
    setLang: PropTypes.func.isRequired
};
export default Login;
