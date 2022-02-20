import { Checkbox, Form, Space } from 'antd';

import PropTypes from 'prop-types';
import React from 'react';

const ReasonsForRefeal = ({ styles, t }) => {
    return (
        <Form.Item
            name="reasonForReferral"
            className={styles.form_item}
            rules={[
                {
                    required: false,
                    message: 'Please select reasons of referral'
                }
            ]}
            label={<p className={styles.label_form}>{t('reasonOfReferal')}</p>}>
            {/* TO DO CHANGE ALIGN TEXT IF LANG CHANGE */}
            <Checkbox.Group className={styles.align_left}>
                <Space direction="vertical">
                    <Checkbox value="FOR_WEIGHT_LOSING">
                        <p className={`gotLight ${styles.label_form}`}>{t('forWeightLosing')}</p>
                    </Checkbox>
                    <Checkbox value="FOR_WEIGHT_GAINING">
                        <p className={`gotLight ${styles.label_form}`}>{t('forWeightgaining')}</p>
                    </Checkbox>
                    <Checkbox value="FOR_RECURRENTING_HYPOGLYCEMIA">
                        <p className={`gotLight ${styles.label_form}`}>
                            {t('forRecurrentingHypoglycemia')}
                        </p>
                    </Checkbox>
                    <Checkbox value="FOR_RECURRENTING_ELEVATED_BLOOD_GLUCOSE_LEVELS">
                        <p className={`gotLight ${styles.label_form}`}>
                            {t('forRecurrentingElevatedBloodGlucoseLevels')}
                        </p>
                    </Checkbox>
                    <Checkbox value="CURRENTLY_ON_MAX_ORAL_HYPOGLYCEMIC_AGENT">
                        <p className={`gotLight ${styles.label_form}`}>
                            {t('Currently on max oral hypoglycemic agent')}
                        </p>
                    </Checkbox>
                    {/* <Checkbox value="FOR_CARB_COUNTING_CLASSES">
                                                    <p className={`gotLight ${styles.label_form}`}>
                                                        {t('For Carb counting classes')}
                                                    </p>
                                                </Checkbox> */}
                    <Checkbox value="FOR_BASIC_CARB_COUNTING_CLASSES">
                        <p className={`gotLight ${styles.label_form}`}>
                            {t('For Basic carb counting classes')}
                        </p>
                    </Checkbox>
                    <Checkbox value="FOR_ADVANCED_CARB_COUNTING_CLASES">
                        <p className={`gotLight ${styles.label_form}`}>
                            {t('For Advanced Carb counting clases')}
                        </p>
                    </Checkbox>
                    <Checkbox value="FOR_INSULIN_INJECTION">
                        <p className={`gotLight ${styles.label_form}`}>
                            {t('For insulin injection')}
                        </p>
                    </Checkbox>
                    <Checkbox value="FOR_INSULIN_PUMP_PREPARING">
                        <p className={`gotLight ${styles.label_form}`}>
                            {t('For Insulin pump preparing')}
                        </p>
                    </Checkbox>
                    <Checkbox value="FOR_MEDICAL_PLAN_ADHERENCE">
                        <p className={`gotLight ${styles.label_form}`}>
                            {t('For Medical plan adherence')}
                        </p>
                    </Checkbox>
                    <Checkbox value="FOR_LIFESTYLE_MODIFICATION">
                        <p className={`gotLight ${styles.label_form}`}>
                            {t('For lifestyle modification')}
                        </p>
                    </Checkbox>
                </Space>
            </Checkbox.Group>
        </Form.Item>
    );
};
ReasonsForRefeal.propTypes = { styles: PropTypes.object, t: PropTypes.object };

export default ReasonsForRefeal;
