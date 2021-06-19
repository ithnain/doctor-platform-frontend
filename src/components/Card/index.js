import { Col, Row } from 'antd';
import { Space, Typography } from 'antd';

import CustomButton from '@components/CustomBtn';
import Image from 'next/image';
import Link from 'next/link';
// import PropTypes from 'prop-types';
import styles from './Card.module.scss';

const Card = () => {
    const { Title, Text } = Typography;

    return (
        <div className={styles.card}>
            <Row className={styles.card__content} justify="start" align="middle">
                <Col span={24}>
                    <Row justify="start">
                        <Col span={6} flex>
                            <div className={styles.card__img}>
                                <Image width={75} height={75} src="/assets/images/doctor-200.jpg" />
                            </div>
                        </Col>
                        <Col flex span={17} offset={1} align="start">
                            <>
                                <Title level={5}>DR. Name</Title>
                                <Space direction="vertical">
                                    <Text>
                                        Ant Design: <span>value</span>
                                    </Text>
                                    <Text>
                                        Ant Design: <span>value</span>
                                    </Text>
                                    <Text>
                                        Ant Design: <span>value</span>
                                    </Text>
                                    <Link href="/overview">View resume</Link>
                                </Space>
                            </>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[2, 0]} justify="end" align="middle">
                        <Col xs={11} md={8} flex>
                            <CustomButton
                                className={`${styles.card__btn} redBtn--outline`}
                                text="Reject"></CustomButton>
                        </Col>
                        <Col xs={11} md={8} offset={1} flex>
                            <CustomButton
                                className={`${styles.card__btn} greenBtn`}
                                text="Accept"></CustomButton>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

// Card.propTypes = { children: PropTypes.node.isRequired };

export default Card;
