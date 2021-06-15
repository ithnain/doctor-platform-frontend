import { Select, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
// import { toogleLang } from 'src/redux/reducers/langReducer';
import PropTypes from 'prop-types';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import styles from './Lang.module.scss';
const { Option } = Select;

function LangChanger({ setLang, abs }) {
    const [storageLang] = useLocalStorage('storageLang', 'en');
    if (!storageLang) {
        setLang('en');
    }
    const dispatch = useDispatch();

    const handleChangeLang = (lang) => {
        setLang(lang);
        // dispatch(toogleLang({ payload: lang }));
    };
    return (
        <>
            {abs ? (
                <Row className={styles.languageDrop}>
                    <Col>
                        <div>
                            <Select
                                defaultValue={storageLang}
                                bordered={false}
                                className="language-drop"
                                onChange={(lang) => {
                                    handleChangeLang(lang);
                                }}
                                size="small"
                                style={{ borderRadius: 7 }}>
                                <Option value="en">En</Option>
                                <Option value="ar">Ar</Option>
                            </Select>
                        </div>
                    </Col>
                </Row>
            ) : (
                <div>
                    <Select
                        defaultValue={storageLang}
                        bordered={false}
                        className="language-drop"
                        onChange={(lang) => {
                            handleChangeLang(lang);
                        }}
                        size="small"
                        style={{ borderRadius: 7 }}>
                        <Option value="en">En</Option>
                        <Option value="ar">Ar</Option>
                    </Select>
                </div>
            )}
        </>
    );
}

LangChanger.propTypes = {
    setLang: PropTypes.func.isRequired
};

export default LangChanger;
