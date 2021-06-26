import { Col, Row, Select } from 'antd';

import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './Lang.module.scss';
import { useRouter } from 'next/router';

const { Option } = Select;
function LangChanger({ abs }) {
    const router = useRouter();
    const comp = (
        <div>
            <Select
                defaultValue={router.locale}
                bordered={false}
                className="language-drop"
                size="small">
                <Option value="en">
                    <Link locale="en" href={router.asPath}>
                        EN
                    </Link>
                </Option>
                <Option value="ar">
                    <Link locale="ar" href={router.asPath}>
                        AR
                    </Link>
                </Option>
            </Select>
        </div>
    );
    return (
        <>
            {abs ? (
                <Row className={styles.languageDrop}>
                    <Col>{comp}</Col>
                </Row>
            ) : (
                <> {comp}</>
            )}
        </>
    );
}

LangChanger.propTypes = {
    abs: PropTypes.bool.isRequired
};

export default LangChanger;
