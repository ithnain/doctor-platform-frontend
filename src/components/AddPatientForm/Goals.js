import { Form, Input } from 'antd';

import PropTypes from 'prop-types';

const Goals = ({ styles, t }) => {
    return (
        <>
            <Form.Item
                name="short_term_goals"
                className="w-100"
                label={<p className={styles.label_form}>{t('Your short term goals')}</p>}>
                <Input.TextArea
                    className="w-100"
                    autoSize={{ minRows: 4, maxRows: 6 }}
                    placeholder={t(
                        'For example (my short term goal is reducing the oral medication)'
                    )}
                />
            </Form.Item>
            <Form.Item
                name="long_term_goals"
                className="w-100"
                label={<p className={styles.label_form}>{t('Your long term goals')}</p>}>
                <Input.TextArea
                    className="w-100"
                    autoSize={{ minRows: 4, maxRows: 6 }}
                    placeholder={t(
                        'For example (my long term goal is reducing the oral medication)'
                    )}
                />
            </Form.Item>
        </>
    );
};
Goals.propTypes = { styles: PropTypes.object, t: PropTypes.object };

export default Goals;
