import { Checkbox, Form, Space } from 'antd';

import PropTypes from 'prop-types';

const MedicalHistory = ({ styles, t }) => {
    return (
        <Form.Item
            name="medicalHistory"
            className={`${styles.form_item}`}
            label={<p className={styles.label_form}>{t('Patients medical history')}</p>}
            rules={[
                {
                    required: false,
                    message: 'Please select medical history'
                }
            ]}>
            {/* TO DO CHANGE ALIGN TEXT IF LANG CHANGE */}
            <Checkbox.Group className={styles.align_left}>
                <Space direction="vertical">
                    <Checkbox value="Hypertension">
                        <p className={`gotLight ${styles.label_form}`}>{t('Hypertension')}</p>
                    </Checkbox>
                    <Checkbox value="Dyslipidemia">
                        <p className={`gotLight ${styles.label_form}`}>{t('Dyslipidemia')}</p>
                    </Checkbox>

                    <Checkbox value="Obesity">
                        <p className={`gotLight ${styles.label_form}`}>{t('Obesity')}</p>
                    </Checkbox>
                    <Checkbox value="Celiac">
                        <p className={`gotLight ${styles.label_form}`}>{t('Celiac')}</p>
                    </Checkbox>

                    <Checkbox value="Skin infection / wound">
                        <p className={`gotLight ${styles.label_form}`}>
                            {t('Skin infection / wound')}
                        </p>
                    </Checkbox>
                    <Checkbox value="MI or ACS  Date ....">
                        <p className={`gotLight ${styles.label_form}`}>{t('MI or ACS  Date')}</p>
                    </Checkbox>
                    <Checkbox value="TIA / CVA">
                        <p className={`gotLight ${styles.label_form}`}>{t('TIA / CVA')}</p>
                    </Checkbox>

                    <Checkbox value="PVD">
                        <p className={`gotLight ${styles.label_form}`}>{t('PVD')}</p>
                    </Checkbox>
                </Space>
            </Checkbox.Group>
        </Form.Item>
    );
};

MedicalHistory.propTypes = { styles: PropTypes.object, t: PropTypes.func };

export default MedicalHistory;
