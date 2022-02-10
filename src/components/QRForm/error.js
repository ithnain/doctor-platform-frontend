import { Col, Row, Space, Typography } from 'antd';

import Image from 'next/image';
import styles from './QR.module.scss';

const QRError = () => {
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
                            <Image
                                preview={false}
                                width={180}
                                height={180}
                                src="/assets/error.svg"
                            />
                        </Col>
                        <Col xs={24}>
                            <Text className={styles.welcome} strong>
                                حدث خطأ ما
                            </Text>
                        </Col>
                        <Col xs={24}>
                            <Text>
                                نعمل جاهدين لمعرفة المشكلة و ايجاد الحل نرجو الخروج من الصفح أو
                                تواصل معنا{' '}
                            </Text>
                        </Col>
                        <Col xs={24}>
                            <Text className={`${styles.welcome} ${styles['center-box']}`} strong>
                                تواصل معنا
                            </Text>
                        </Col>
                    </Space>
                </Row>
            </Space>
        </div>
    );
};

QRError.propTypes = {};

export default QRError;
