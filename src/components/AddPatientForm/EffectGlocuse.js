import { Form, Radio, Space } from 'antd';

import PropTypes from 'prop-types';

const EffectGlocuse = ({ styles, t }) => {
    return (
        <Form.Item
            name="medicationEffectingGlucose"
            label={
                <p className={styles.label_form}>
                    {t('Is the patient on medication that may affect blood glucose ?')}
                </p>
            }>
            <Radio.Group className={styles.radio_container}>
                <Space direction="vertical">
                    <Radio value="Yes">
                        {<p className={`gotLight ${styles.label_form}`}>{t('Yes')}</p>}
                    </Radio>
                    <Radio value="No">
                        {<p className={`gotLight ${styles.label_form}`}>{t('No')}</p>}
                    </Radio>
                </Space>
            </Radio.Group>
        </Form.Item>
    );
};

EffectGlocuse.propTypes = { styles: PropTypes.object, t: PropTypes.object };

export default EffectGlocuse;
