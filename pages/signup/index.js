import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Row, Col, Image, Typography, Select, Alert } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import Placeholder from '@components/Placeholder';
import CustomButton from '@src/components/CustomBtn';
import Link from 'next/link';
// import { signUpAction, getAllHospitalAction } from 'src/redux/reducers/authReducer';
// import LangChanger from 'src/components/LangChange';
// import { useLocalStorage } from '../../src/utils/hooks/useLocalStorage';
import en from '../../src/i18n/en';
import ar from '../../src/i18n/ar';
const { Text } = Typography;
import authStyles from "@styles/Auth.module.scss"
import styles from "./Signup.module.scss";
const SignUp = ({lang,setLang}) => {
    // const [storageLang, setLang] = useLocalStorage('storageLang', 'en');
    // const dispatch = useDispatch();
    // let { hospitals, loadingSignUp, errorSignUp, successfulSignUp, errorMessageSignUp } =
    //     useSelector((state) => state?.auth);
    const t = lang === 'en' ? en : ar;

    // useEffect(() => {
    //     dispatch(getAllHospitalAction());
    // }, []);

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
        // const data = {
        //     email,
        //     password,
        //     name,
        //     nationalId,
        //     specialty,
        //     phoneNumber,
        //     hospital
        // };
        // dispatch(signUpAction(data));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row>
            <Col xs={0} md={12} type="flex" justify="center" align="center" className={authStyles.authLeftSide}>
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
                {/* {errorSignUp ? (
                    <Alert
                        className="my-alert"
                        message={t.errorMessageSignUp ? errorMessageSignUp : t.errorSignUp}
                        type="error"
                    />
                ) : null} */}
                {false ? (
                    // <div type="flex" justify="center" align="center">
                    //     <CheckCircleTwoTone style={{ fontSize: 80, marginBottom: 20 }} />
                    //     <br />
                    //     <Text className="title-3">{t.signUpSuccessfullyMessage}</Text>
                    // </div>
                    <div>ssss</div>
                ) : (
                    <Row type="flex" justify="center" align="middle" className="bg-white">
                        {/* <LangChanger setLang={setLang} /> */}
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
                                            <Input className={styles.input} />
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
                                            <Input className={styles.input} />
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
                                    <Input className={styles.input} placeholder="5xxxxxxxx" />
                                        </Form.Item></Col>
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
                                            <Input className={styles.input} />
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
                                            <Input.Password className={styles.input} />
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
                                            <Input className={styles.input} />
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
                                            <Select size="large" style={{ borderRadius: 7 }}>
                                                {/* {hospitals?.length ? (
                                                    hospitals.map((hospital) => {
                                                        return (
                                                            <Select.Option
                                                                key={hospital.id}
                                                                value={hospital.id}>
                                                                {hospital.name}
                                                            </Select.Option>
                                                        );
                                                    })
                                                ) : ( */}
                                                    <Select.Option key={Math.random()} disabled>
                                                        No hospitals available
                                                    </Select.Option>
                                                {/* )} */}
                                            </Select>
                                        </Form.Item>{' '}
                                    </Col>
                                </Row>

                                <Form.Item>
                                    <CustomButton
                                        htmlType="submit"
                                        text="Register"
                                        className={`${styles.btnRegister} btn-text`}
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
                )}
            </Col>
        </Row>
    );
};

export default SignUp;
