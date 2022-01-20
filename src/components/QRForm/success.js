import { Col, Row, Space, Typography } from 'antd';

import Link from 'next/link';    
import Image from 'next/image';
import React from 'react';
import styles from './QR.module.scss';

const QRSucess = () => {
    const { Text } = Typography;

    return (
        <div className={styles.rtl}>
            <Space>
                <Row justify="space-between" className={styles.rtl}>
                    <Space direction="vertical">
                        <Col xs={24}>
                            <div className={styles.logo}>
                                <Image
                                    preview={false}
                                    width={80}
                                    height={80}
                                    src="/assets/logo-dark-notext.png"
                                />
                            </div>
                        </Col>
                        <Col xs={24}>
                            <Text className={styles.welcome} strong>
                                اهلا بك في اثنين
                            </Text>
                        </Col>

                        <Col xs={24}>
                            <div className={styles['d-flex']}>
                                <Image width={90} height={90} src="/assets/correct.svg" />
                            </div>
                        </Col>
                        <Col xs={24}>
                            <Text>
                                تم التسجيل بنجاح في تطبيق اثنين, سعيدون لانضمامك, نعمل جاهدين
                                لتثقيفك عن مرض السكري
                            </Text>
                        </Col>
                        <Col xs={24}>
                            <Text className={styles.welcome} strong>
                                كل ما عليك هو تحميل التطبيق الأن
                            </Text>
                        </Col>
                        <Col xs={24}>
                         <Link  href="https://play.google.com/store/apps/details?id=com.ithnain.ithnainapp" passHref={true}>
                            <div className={styles['center-box']}>
                                <Image width={120} height={120} src="/assets/google-play.png" />
                            </div>
                         </Link>
                        </Col>
                        <Col xs={24}>
                          <Link  href="https://apps.apple.com/us/app/ithnain-%D8%A5%D8%AB%D9%86%D9%8A%D9%86/id1478263137" passHref={true}>
                            <div className={styles['center-box']}>
                                <Image width={120} height={40} src="/assets/apple-store.png" />
                            </div>
                          </Link>
                        </Col>
                    </Space>
                </Row>
            </Space>
        </div>
    );
};

export default QRSucess;
