import PropTypes from 'prop-types';
import { Form, Input, Row, Col, Image, Typography, Select } from 'antd';
import Placeholder from '@components/Placeholder';
import CustomButton from '@src/components/CustomBtn';
import Link from 'next/link';
import API from '@src/utils/axios';
import en from '@src/i18n/en';
import ar from '@src/i18n/ar';
const { Text } = Typography;
import authStyles from '@styles/Auth.module.scss';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import LangChanger from '@src/components/LangToggle';
import { ConfigProvider } from 'antd';

const SignUp = ({ hospitals }) => {
    const [storageLang, setLang] = useLocalStorage('storageLang', 'en');
    const t = storageLang === 'en' ? en : ar;
    const onFinish = ({ email, password, name, nationalId, specialty, phoneNumber, hospital }) => {
        console.log({
            email,
            password,
            name,
            nationalId,
            specialty,
            phoneNumber,
            hospital
        });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row className={t === 'ar' ? 'arabic' : ''}>
            <Col
                xs={0}
                md={12}
                type="flex"
                justify="center"
                align="center"
                className={authStyles.authLeftSide}>
                <Placeholder />
            </Col>
            <ConfigProvider direction={storageLang === 'ar' ? 'rtl' : 'ltr'}>
                <Col
                    xs={24}
                    md={12}
                    type="flex"
                    justify="center"
                    align="center"
                    direction="column"
                    className={authStyles.authRightSide}>
                    <Row type="flex" justify="center" align="middle">
                        <LangChanger setLang={setLang} abs={true} />
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
                                    <Col span={11}>
                                        <Form.Item
                                            label={t.DoctorName}
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
                                            label={t.ID}
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

                                {/* <Form.Item
                  label={t("Specialty")}
                  name="specialty"
                  className="dark-blue mb-1"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Specialty",
                    },
                  ]}
                >
                  <Select size="large" style={{ borderRadius: 7 }}>
                    {hospitals?.length ? (
                      hospitals.map((hospital) => {
                        return (
                          <Select.Option key={hospital.id} value={hospital.id}>
                            {hospital.name}
                          </Select.Option>
                        );
                      })
                    ) : (
                      <Select.Option key={Math.random()} disabled>
                        No hospitals available
                      </Select.Option>
                    )}
                  </Select>
                </Form.Item> */}
                                <Row justify="space-around" align="middle">
                                    <Col span={23}>
                                        <Form.Item
                                            label={t.Phone}
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
                                </Row>
                                <Row justify="space-around" align="middle">
                                    <Col span={11}>
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
                                    <Col span={11}>
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
                                <Row justify="space-around" align="middle">
                                    <Col span={11}>
                                        <Form.Item
                                            label={t.Specialty}
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
                                            label={t.HospitalName}
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
                                                        No hospitals available
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
                                        // loading={loadingSignUp}
                                    />
                                </Form.Item>
                                <Text type="secondary" className="gothic">
                                    {t.AlreadyUser}
                                    <span className="regular-font">?</span>&nbsp;
                                    <Link className="blue pointer" href="/login">
                                        <a>
                                            {t.login}&nbsp;
                                            {t.now}
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
    lang: PropTypes.string.isRequired,
    setLang: PropTypes.func.isRequired,
    hospitals: PropTypes.array.isRequired
};
export default SignUp;
