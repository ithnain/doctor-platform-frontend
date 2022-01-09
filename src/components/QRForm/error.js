import { Col, Row, Space, Typography } from 'antd';

import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from './QR.module.scss';

const QRError = (props) => {
    const { Text } = Typography;

    return (
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
                </Space>
            </Row>
        </Space>
    );
};

QRError.propTypes = {};

export default QRError;
