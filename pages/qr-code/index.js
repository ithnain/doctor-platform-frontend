import PropTypes from 'prop-types';
import SliderLayout from '@components/Layout';
import { dehydrate, QueryClient } from 'react-query';
import authenticatedRoute from '@components/AuthenticatedRoute';
import { Col, ConfigProvider, Row, Typography, Space } from 'antd';
import CustomButton from '@src/components/CustomBtn';
import QRCode from 'react-qr-code';
import print from '@utils/helpers/print';
import { useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';

function QRCodeComp({ direction, userdata }) {
    const printQR = useRef('');
    const { Title, Paragraph } = Typography;
    const { t } = useTranslation('qr-code');

    return (
        <SliderLayout
            title={'Overview'}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor overview'}
            active={`/overview`}>
            <ConfigProvider direction={direction}>
                <Col xs={24} md={12}>
                    <Space direction="vertical">
                        <Col xs={16}>
                            <Title level={3} align="start">
                                {t('yourCode')}
                            </Title>
                            <Paragraph align="start">{t('codeText')}</Paragraph>
                        </Col>
                        <Row gutter={[20, 8]} justify="start" align="middle">
                            <Col ref={printQR} xs={16}>
                                <QRCode
                                    value={`${window.origin}/create-patient-qr/${userdata?.data.id}?name=${userdata?.data.name}`}
                                />
                            </Col>
                            <Col xs={24}>
                                <Row gutter={[20, 8]} justify="start" align="middle">
                                    <Col xs={8}>
                                        <CustomButton
                                            type="button"
                                            text={t('print')}
                                            handleButtonClick={() => {
                                                print(printQR.current);
                                            }}
                                            className="pinkBG w-75"
                                        />
                                    </Col>
                                    <Col xs={8}>
                                        <CustomButton
                                            type="button"
                                            text={t('downlod')}
                                            className="pinkBorder w-75"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Space>
                </Col>
            </ConfigProvider>
        </SliderLayout>
    );
}

QRCodeComp.propTypes = {
    direction: PropTypes.string.isRequired,
    userdata: PropTypes.object
};
export const getServerSideProps = async () => {
    const qClient = new QueryClient();

    return {
        props: {
            dehydratedState: dehydrate(qClient)
        }
    };
};
export default authenticatedRoute(QRCodeComp);
