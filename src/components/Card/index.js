import { Col, Row } from 'antd';
import { Space, Typography } from 'antd';

import API from '@utils/axios';
import CustomButton from '@components/CustomBtn';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { initializeStore } from '@redux/store';
import styles from './Card.module.scss';
import toastr from 'toastr';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

const Card = ({ doctor, actions, patient = null, canEdit = false, addPatient = false, direction, profile}) => {
    // Patient => if the card came form myPatient View or Hospital View the patient object will not be null;
    // canEdit => by default it is false, unless it came from myPatients view, when it is true small edit icon will appear on the top right corner of the card;
    // addPatient => by default it is false, unless it came from Hospital View then it wii appear in the bottom right corner of the card;
    const { t } = useTranslation('common');
    const router = useRouter();
    const { Title, Text } = Typography;
    // define the variable globbaly , I think if we use state it wii be better, then use useEffect to assign the values;
    let name, id, email, age, diabetesType, watcher;

    // check if it has doctor object or no;
    if (doctor?.id) {
        id = doctor.id;
        email = doctor.email;
        name = doctor.name;
    }

    // check if it has patient object or no;
    let isPatientCard = false;
    if (patient?.id) {
        age = patient.age;
        diabetesType = patient.diabetesType;
        watcher = patient.watcher;
        name = patient.name;
        isPatientCard = true;
    }

    // add patient to Doctor
    const addPatientToDoctor = async () => {
        try {
        const config = {
            headers: {
                Authorization: `Bearer ${
                    initializeStore().getState().user?.token
                }`
            }
        }
        const data = { patientId: patient.id }
       const result = await  API.patch(
            `/patient/addPatientToDoctor`, data, config  
        );
        toastr.success('patient added successfully');
        router.push('/patients/1');
        
    } catch (err) {
        let message = 'Server Error';
        if(err?.response?.data?.error?.message?.en){
            if(direction === 'rtl'){
                message = err?.response?.data?.error?.message?.ar;
            }else {
                message = err?.response?.data?.error?.message?.en;
            }
        }
        toastr.error(message);
    }
    }

    return (
        <div className={styles.card}>
            <Row className={styles.card__content} justify="start" align="top">
                <Col span={24}>
                    <Row justify="start">
                        {profile ? (
                            <Col span={2} flex>
                                <div className={styles.card__img}>
                                    <Image
                                        width={75}
                                        height={75}
                                        src="/assets/images/doctor-200.jpg"
                                    />
                                </div>
                            </Col>
                        ) : (
                            <Col span={6} flex>
                                <div className={styles.card__img}>
                                    <Image
                                        width={75}
                                        height={75}
                                        src="/assets/images/doctor-200.jpg"
                                    />
                                </div>
                            </Col>
                        )}
                        <Col flex span={17} offset={1} align="start">
                            <>
                                <div className={styles.card__header_wrapper}>
                                    <Title className={styles.card__blueText} level={5}>
                                        {name}
                                    </Title>
                                    {/* If can edit true display edit icon */}
                                    {canEdit ? (
                                        <Image
                                            onClick={() => router.push(`/patient/${patient.id}`)}
                                            width={20}
                                            height={20}
                                            src="/assets/icons/edit.svg"
                                            className={styles.card__pointer}
                                        />
                                    ) : null}
                                </div>
                                <Space direction="vertical">
                                    {/* In case of patent card */}
                                    {isPatientCard ? (
                                        <>
                                            <Text>
                                                {t('age')}:{' '}
                                                <span className={styles.card__blueText}>{age}</span>
                                            </Text>
                                            <Text>
                                                {t('patientType')}:{' '}
                                                <span className={styles.card__blueText}>
                                                    {diabetesType}
                                                </span>
                                            </Text>
                                            <Text>
                                                {t('responsibleOfPatient')}:{' '}
                                                <span className={styles.card__blueText}>
                                                    {watcher}
                                                </span>
                                            </Text>
                                        </>
                                    ) : (
                                        <>
                                            {/* In case of Doctor card */}
                                            <Text>
                                                {t('id')}:{' '}
                                                <span className={styles.card__blueText}>{id}</span>
                                            </Text>

                                            <Text>
                                                {t('email')}:{' '}
                                                <span className={styles.card__blueText}>
                                                    {email}
                                                </span>
                                            </Text>
                                            <Text>
                                                Ant Design: <span>value</span>
                                            </Text>
                                        </>
                                    )}
                                    {/* <Link href="/overview">View resume</Link> */}
                                </Space>
                            </>
                        </Col>
                        {profile && (
                            <Col span={4} flex>
                                <div className={styles.card__img}>
                                    <div className={styles.card__img}>
                                        <CustomButton
                                            className={`${styles.card__btn} redBtn redBtn--outline`}
                                            text={t('editProfile')}
                                            // handleClick={() => {
                                            //     API.get(
                                            //         `/supervisor/doctors/reject?doctor=${doctor.id}`,
                                            //         {
                                            //             headers: {
                                            //                 Authorization: `Bearer ${
                                            //                     initializeStore().getState().user?.token
                                            //                 }`
                                            //             }
                                            //         }
                                            //     ).then(() => {
                                            //         toastr.success('User rejected successfully');
                                            //         router.push('/doctors/1');
                                            //     });
                                            // }}
                                        />
                                    </div>
                                </div>
                            </Col>
                        )}
                    </Row>
                    {/* In Case of patient card display last session and number of Session */}
                    {isPatientCard ? (
                        <Row className={styles.card__second_row}>
                            <Col flex offset={1} align="start">
                                <Space direction="vertical">
                                    <Text>
                                        {t('lastSessionDate')}:{' '}
                                        <span className={styles.card__blueText}>
                                            {new Date().toLocaleDateString()}
                                        </span>
                                    </Text>
                                    <Text>
                                        {t('numberOfSessionsCompleted')}:{' '}
                                        <span className={styles.card__blueText}>
                                            5
                                        </span>
                                    </Text>
                                </Space>
                            </Col>
                        </Row>
                    ) : null}
                </Col>
                {/* If action true */}
                {actions && (
                    <Col span={24} className={styles.card__content__actions}>
                        <Row gutter={[2, 0]} justify="end" align="bottom">
                            <Col xs={11} md={8} flex>
                                {/* If addPatient true  do not display this button 
                                else if addPatient false and actions is true display this button*/}
                                {addPatient ? null : (
                                    <CustomButton
                                        className={`${styles.card__btn} redBtn--outline`}
                                        text={t('reject')}
                                        handleClick={() => {
                                            API.get(
                                                `/supervisor/doctors/reject?doctor=${doctor.id}`,
                                                {
                                                    headers: {
                                                        Authorization: `Bearer ${
                                                            initializeStore().getState().user?.token
                                                        }`
                                                    }
                                                }
                                            ).then(() => {
                                                toastr.success('User rejected successfully');
                                                router.push('/doctors/1');
                                            });
                                        }}
                                    />
                                )}
                            </Col>
                            <Col xs={11} md={addPatient ? 16 : 8} offset={1} flex>
                                {/* If addPatient true display the button that add the hospital patient to logged in doctor */}
                                {addPatient ? (
                                    <CustomButton
                                        className={`${styles.card__btn} blueBtn`}
                                        text={t('addToMyPatient')}
                                        handleClick={addPatientToDoctor}
                                    />
                                ) : (
                                    // this case happen only if the Card will come form Doctors view, If addPatient false display the accept button for doctor
                                    <CustomButton
                                        className={`${styles.card__btn} greenBtn`}
                                        text={t('accept')}
                                        handleClick={() => {
                                            API.get(
                                                `/supervisor/doctors/accept?doctor=${doctor.id}`,
                                                {
                                                    headers: {
                                                        Authorization: `Bearer ${
                                                            initializeStore().getState().user?.token
                                                        }`
                                                    }
                                                }
                                            ).then(() => {
                                                router.push('/doctors/1');
                                                toastr.success('User accepted successfully');
                                            });
                                        }}
                                    />
                                )}
                            </Col>
                        </Row>
                    </Col>
                )}
            </Row>
        </div>
    );
};

Card.propTypes = {
    doctor: PropTypes.object.isRequired,
    actions: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    patient: PropTypes.object,
    canEdit: PropTypes.bool,
    addPatient: PropTypes.bool,
    direction: PropTypes.string,
    profile: PropTypes.bool.isRequired
};

export default Card;
