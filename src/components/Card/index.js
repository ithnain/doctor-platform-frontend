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

// import Link from 'next/link';

const Card = ({ doctor, actions, profile }) => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const { Title, Text } = Typography;
    const { id, email, name, speciality, hospital, phone_number } = doctor;
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
                                <Title className={styles.card__blueText} level={5}>
                                    {name}
                                </Title>
                                <Space direction="vertical">
                                    <Text>
                                        {t('id')}:{' '}
                                        <span className={styles.card__blueText}>{id}</span>
                                    </Text>
                                    <Text>
                                        {t('email')}:{' '}
                                        <span className={styles.card__blueText}>{email}</span>
                                    </Text>
                                    <Text>
                                        Ant Design: <span>value</span>
                                    </Text>
                                    {profile && (
                                        <>
                                            <Text>
                                                {t('speciality')}:{' '}
                                                <span className={styles.card__blueText}>
                                                    {speciality}
                                                </span>
                                            </Text>
                                            <Text>
                                                Hospital Name:
                                                <span className={styles.card__blueText}>
                                                    {hospital.name}
                                                </span>
                                            </Text>
                                            <Text>
                                                {t('phone')}:{' '}
                                                <span className={styles.card__blueText}>
                                                    {' '}
                                                    {phone_number}
                                                </span>
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
                </Col>
                {actions && (
                    <Col span={24} className={styles.card__content__actions}>
                        <Row gutter={[2, 0]} justify="end" align="bottom">
                            <Col xs={11} md={8} flex>
                                <CustomButton
                                    className={`${styles.card__btn} redBtn--outline`}
                                    text={t('reject')}
                                    handleClick={() => {
                                        API.get(`/supervisor/doctors/reject?doctor=${doctor.id}`, {
                                            headers: {
                                                Authorization: `Bearer ${
                                                    initializeStore().getState().user?.token
                                                }`
                                            }
                                        }).then(() => {
                                            toastr.success('User rejected successfully');
                                            router.push('/doctors/1');
                                        });
                                    }}
                                />
                            </Col>
                            <Col xs={11} md={8} offset={1} flex>
                                <CustomButton
                                    className={`${styles.card__btn} greenBtn`}
                                    text={t('accept')}
                                    handleClick={() => {
                                        API.get(`/supervisor/doctors/accept?doctor=${doctor.id}`, {
                                            headers: {
                                                Authorization: `Bearer ${
                                                    initializeStore().getState().user?.token
                                                }`
                                            }
                                        }).then(() => {
                                            router.push('/doctors/1');
                                            toastr.success('User accepted successfully');
                                        });
                                    }}
                                />
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
    profile: PropTypes.bool.isRequired
};

export default Card;
