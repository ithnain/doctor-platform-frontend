import { Col, Row, Select } from "antd";

import Link from "next/link";
// import { toogleLang } from 'src/redux/reducers/langReducer';
import PropTypes from "prop-types";
// import { useLocalStorage } from '@src/hooks/useLocalStorage';
import styles from "./Lang.module.scss";
// import { useEffect } from 'react';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setIsRtl } from "../../redux/actions/rtl";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";

const { Option } = Select;
function LangChanger({ abs }) {
  const dispatch = useDispatch();
  const { t, lang } = useTranslation();
  const router = useRouter();

  const handleLangeChange = async (isRtl) => {
    await setLanguage(!lang);
    dispatch(setIsRtl(isRtl));
  };

  // const [storageLang] = useLocalStorage('storageLang', 'en');
  // if (!storageLang) {
  //     setLang('en');
  // }

  // const handleChangeLang = (lang) => {
  //     setLang(lang);
  //     // dispatch(toogleLang({ payload: lang }));
  // };

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
                size="small"
                onChange={(e) => {
                  handleLangeChange(e == "ar" ? true : false);
                }}
              >
                <Option value="en">
                  <Link locale="en" href="">
                    EN
                  </Link>
                </Option>
                <Option value="ar">
                  <Link locale="ar" href="">
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
            size="small"
            onChange={(e) => {
              handleLangeChange(e == "ar" ? true : false);
            }}
          >
            <Option value="en">
              <Link locale="en" href="#">
                EN
              </Link>
            </Option>
            <Option value="ar">
              <Link locale="ar" href="#">
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
  setLang: PropTypes.func.isRequired,
  abs: PropTypes.bool.isRequired,
};

export default LangChanger;
