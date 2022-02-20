import { Checkbox, Form, Input, Space } from 'antd';

import PropTypes from 'prop-types';

const HealthIssues = ({ styles, t }) => {
    return (
        <Form.Item
            name="otherHealthIssues"
            className={styles.form_item}
            label={<p className={styles.label_form}>{t('Any other critical health issues?')}</p>}
            rules={[
                {
                    required: false,
                    message: 'Please select other healt issues'
                }
            ]}>
            {/* TO DO CHANGE ALIGN TEXT IF LANG CHANGE */}
            <Checkbox.Group className={styles.align_left}>
                <Space direction="vertical">
                    <Checkbox value="Unawareness_hypoglycemia">
                        <p className={`gotLight ${styles.label_form}`}>
                            {t('Unawareness hypoglycemia')}
                        </p>
                    </Checkbox>

                    <Checkbox value="Other">
                        <p className={`gotLight ${styles.label_form}`}>{t('Other')}</p>
                    </Checkbox>
                    <Form.Item name="OotherHealthIssues">
                        <Input />
                    </Form.Item>
                </Space>
            </Checkbox.Group>
        </Form.Item>
    );
};
HealthIssues.propTypes = { styles: PropTypes.object, t: PropTypes.object };

export default HealthIssues;
