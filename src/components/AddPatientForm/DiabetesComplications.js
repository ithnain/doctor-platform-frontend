import { Checkbox, Col, Form, Input, Radio, Row, Space } from 'antd';

import PropTypes from 'prop-types';

const DiabetesComplications = ({ styles, t, acuteShow, diabeticKetoacidosis, chronicShow }) => {
    return (
        <Form.Item
            name="diabetesComplications"
            className={styles.form_item}
            label={<p className={styles.label_form}>{t('Any Diabetes complications?')}</p>}>
            {/* TO DO CHANGE ALIGN TEXT IF LANG CHANGE */}
            <Checkbox.Group className={styles.align_left}>
                <Space direction="vertical">
                    <Checkbox value="Acute">
                        <p className={`gotLight ${styles.label_form}`} level={5}>
                            {t('Acute')}
                        </p>
                    </Checkbox>
                    {acuteShow && (
                        <Form.Item name="acuteSelect" className={`ml-2 ${styles.form_item}`}>
                            {/* TO DO CHANGE ALIGN TEXT IF LANG CHANGE */}
                            <Checkbox.Group className={styles.align_left}>
                                <Space direction="vertical">
                                    <Checkbox value="RECURRENT_HYPOS">
                                        <p className={`gotLight ${styles.label_form}`}>
                                            {t('Recurrent Hypos')}
                                        </p>
                                    </Checkbox>
                                    <Checkbox value="RECURRENT_HYPERS">
                                        <p className={`gotLight ${styles.label_form}`}>
                                            {t('Recurrent Hypers')}
                                        </p>
                                    </Checkbox>
                                    <Checkbox value="HYPEROSMOLAR_HYPERGLYCAEMIC_STATE">
                                        <p className={`gotLight ${styles.label_form}`}>
                                            {t('Hyperosmolar Hyperglycaemic State(HHS)')}
                                        </p>
                                    </Checkbox>

                                    <Checkbox value="DIABETIC_KETOACIDOSIS">
                                        <p className={`gotLight ${styles.label_form}`}>
                                            {t('Diabetic ketoacidosis')}
                                        </p>
                                    </Checkbox>
                                    {diabeticKetoacidosis && (
                                        <div className={styles.diabetesKet}>
                                            <Row className="">
                                                <Col sm={24}>
                                                    <Form.Item
                                                        className="w-100 m-0"
                                                        name="DKAtimes"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please select DKA TIMES'
                                                            }
                                                        ]}>
                                                        <Input
                                                            placeholder="How many times?"
                                                            className="m-0 w-100"
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={24}>
                                                    <Form.Item
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input severity'
                                                            }
                                                        ]}
                                                        name="Severity"
                                                        label={
                                                            <p className={styles.label_form}>
                                                                {t('Severity of the latest one')}
                                                            </p>
                                                        }>
                                                        <Radio.Group
                                                            className={styles.radio_container}>
                                                            <Radio value="MILD">
                                                                {
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t('Mild')}
                                                                    </p>
                                                                }
                                                            </Radio>
                                                            <Radio value="MODERATE">
                                                                {
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t('Moderate')}
                                                                    </p>
                                                                }
                                                            </Radio>
                                                            <Radio value="SEVERE">
                                                                {
                                                                    <p
                                                                        className={`gotLight ${styles.label_form}`}>
                                                                        {t('Severe')}
                                                                    </p>
                                                                }
                                                            </Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}
                                </Space>
                            </Checkbox.Group>
                        </Form.Item>
                    )}
                    <Checkbox value="Chronic">
                        <p className={`gotLight ${styles.label_form}`}>{t('Chronic')}</p>
                    </Checkbox>
                    {chronicShow && (
                        <Form.Item name="chronicSelect" className={`ml-2 ${styles.form_item}`}>
                            {/* TO DO CHANGE ALIGN TEXT IF LANG CHANGE */}
                            <Checkbox.Group className={styles.align_left}>
                                <Space direction="vertical">
                                    <Checkbox value="EYE_PROBLEMS">
                                        <p className={`gotLight ${styles.label_form}`}>
                                            {t('Eye problems (retinopathy)')}
                                        </p>
                                    </Checkbox>
                                    <Checkbox value="FOOT_PROBLEMS">
                                        <p className={`gotLight ${styles.label_form}`}>
                                            {t('Foot problems')}
                                        </p>
                                    </Checkbox>

                                    <Checkbox value="HEART_ATTACK_AND_STROKE">
                                        <p className={`gotLight ${styles.label_form}`}>
                                            {t('Heart attack and stroke')}
                                        </p>
                                    </Checkbox>
                                    <Checkbox value="KIDNEY_PROBLEMS">
                                        <p className={`gotLight ${styles.label_form}`}>
                                            {t('Kidney problems')}
                                        </p>
                                    </Checkbox>
                                    <Checkbox value="NERVE_DAMAGE">
                                        <p className={`gotLight ${styles.label_form}`}>
                                            {t('Nerve damage (neuropathy)')}
                                        </p>
                                    </Checkbox>
                                    <Checkbox value="GUM_DISEASE">
                                        <p className={`gotLight ${styles.label_form}`}>
                                            {t('Gum disease')}
                                        </p>
                                    </Checkbox>
                                    <Checkbox value="SEXUAL_PROBLEMS_IN_WOMEN">
                                        <p className={`gotLight ${styles.label_form}`}>
                                            {t('Sexual problems in women')}
                                        </p>
                                    </Checkbox>
                                    <Checkbox value="SEXUAL_PROBLEMS_IN_MEN">
                                        <p className={`gotLight ${styles.label_form}`}>
                                            {t('Sexual problems in men')}
                                        </p>
                                    </Checkbox>
                                </Space>
                            </Checkbox.Group>
                        </Form.Item>
                    )}
                </Space>
            </Checkbox.Group>
        </Form.Item>
    );
};

DiabetesComplications.propTypes = {
    styles: PropTypes.object,
    t: PropTypes.func,
    acuteShow: PropTypes.bool,
    chronicShow: PropTypes.bool,
    diabeticKetoacidosis: PropTypes.bool
};

export default DiabetesComplications;
