import { Form, Input } from 'antd';

import PropTypes from 'prop-types';

const DoctorNote = ({ styles, t }) => {
    return (
        <Form.Item
            name="doctorNote"
            className="w-100"
            label={<p className={styles.label_form}>{t('Doctor recommendation & notes')}</p>}>
            <Input.TextArea className="w-100" autoSize={{ minRows: 4, maxRows: 6 }} />
        </Form.Item>
    );
};
DoctorNote.propTypes = { styles: PropTypes.object, t: PropTypes.func };

export default DoctorNote;
