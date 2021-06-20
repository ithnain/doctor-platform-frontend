import { Col, Row, Select } from 'antd';

import Link from 'next/link';
// import { toogleLang } from 'src/redux/reducers/langReducer';
import PropTypes from 'prop-types';
// import { useLocalStorage } from '@src/hooks/useLocalStorage';
import styles from './Lang.module.scss';
// import { useEffect } from 'react';
import { useRouter } from 'next/router';

const { Option } = Select;
function LangChanger({ abs }) {
    // const [storageLang] = useLocalStorage('storageLang', 'en');
    // if (!storageLang) {
    //     setLang('en');
    // }

    // const handleChangeLang = (lang) => {
    //     setLang(lang);
    //     // dispatch(toogleLang({ payload: lang }));
    // };
    const router = useRouter();

    return (
        <>
            {abs ? (
                <Row className={styles.languageDrop}>
                    <Col>
                        <div>
                            <Select
                                defaultValue={router.locale}
                                bordered={false}
                                className="language-drop"
                                size="small">
                                <Option value="en">
                                    <Link locale="en" href={router.pathname}>
                                        EN
                                    </Link>
                                </Option>
                                <Option value="ar">
                                    <Link locale="ar" href={router.pathname}>
                                        AR
                                    </Link>
                                </Option>
                            </Select>
                        </div>
                    </Col>
                </Row>
            ) : (
                <div>
                    <Select
                        defaultValue={router.locale}
                        bordered={false}
                        className="language-drop"
                        size="small">
                        <Option value="en">
                            <Link locale="en" href={router.pathname}>
                                EN
                            </Link>
                        </Option>
                        <Option value="ar">
                            <Link locale="ar" href={router.pathname}>
                                AR
                            </Link>
                        </Option>
                    </Select>
                </div>
            )}
        </>
    );
}

LangChanger.propTypes = {
    abs: PropTypes.bool.isRequired
};

export default LangChanger;
