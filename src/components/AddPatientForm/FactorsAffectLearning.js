import { Form, Radio, Space } from 'antd';

import PropTypes from 'prop-types';
import React from 'react';

const FactorsAffectLearning = ({ styles, t }) => {
    return (
        <Form.Item
            name="factorsEffectinglearning"
            className={` ${styles.form_item}`}
            label={<p className={styles.label_form}>{t('Factors which may affect Learning')}</p>}
            rules={[
                {
                    required: true,
                    message: 'Please select Factors which may affect Learning'
                }
            ]}>
            <Radio.Group className={`w-100 ${styles.align_left}`}>
                <Space direction="vertical">
                    <Radio value="INTERPRETER_REQUIRED">
                        {
                            <p className={`gotLight ${styles.label_form}`}>
                                {t('Interpreter required')}
                            </p>
                        }
                    </Radio>

                    <Radio value="VISUAL_IMPAIRMENT">
                        {
                            <p className={`gotLight ${styles.label_form}`}>
                                {t('Visual impairment')}
                            </p>
                        }
                    </Radio>
                    <Radio value="AUDITORY_IMPAIRMENT">
                        {
                            <p className={`gotLight ${styles.label_form}`}>
                                {t('Auditory impairment')}
                            </p>
                        }
                    </Radio>
                </Space>
            </Radio.Group>
        </Form.Item>
    );
};
FactorsAffectLearning.propTypes = { styles: PropTypes.object, t: PropTypes.func };

export default FactorsAffectLearning;
