import { Form, Input } from 'antd';

import PropTypes from 'prop-types';

const RecommendationGlycemicRange = ({ styles, t }) => {
    return (
        <Form.Item
            name="recommendationGlycemicRange"
            className={`${styles.form_item} w-100 create`}
            label={
                <p className={`w-100 ${styles.label_form}`}>{t('recommendationGlycemicRange')}</p>
            }>
            <Input.TextArea
                className={`w-100`}
                autoSize={{ minRows: 1, maxRows: 1 }}
                placeholder="Glycemic Range"
            />
        </Form.Item>
    );
};

RecommendationGlycemicRange.propTypes = { styles: PropTypes.object, t: PropTypes.func };

export default RecommendationGlycemicRange;
