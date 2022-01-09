import { Col, Row } from 'antd';
import React, { useEffect } from 'react';

// import API from '@utils/axios';
// import PropTypes from 'prop-types';
import QRForm from '@src/components/QRForm';

const QRFormPage = () => {
    useEffect(() => {
        // check for props id
    }, []);
    // if (!doctor) return <h1>{t('NotFOund')}</h1>;
    return (
        <Row justify="space-around">
            <Col xs={12}>
                <QRForm />
            </Col>
        </Row>
    );
};

// export async function getServerSideProps({ params, req }) {
//     let doctor;
//     try {
//         const res = await API.get(`patient/patient?id=${params.id}`, {
//             headers: {
//                 Authorization: `Bearer ${req.cookies.token}`
//             }
//         });
//         doctor = res.data;
//     } catch (error) {
//         doctor = null;
//     }

//     return { props: { doctor } };
// }

// QRForm.propTypes = {
//     doctor: PropTypes.string.isRequired
// };

export default QRFormPage;
