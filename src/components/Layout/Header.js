import { Badge, Dropdown, Menu, Typography } from 'antd';

import { BellOutlined } from '@ant-design/icons';
import Image from 'next/image';
import LangToggle from '@components/LangToggle';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import styles from './Layout.module.scss';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import useTranslation from 'next-translate/useTranslation';

// import CustomButton from '../CustomBtn';
// import en from '@src/i18n/en';
// import ar from '@src/i18n/ar';

// import CustomButton from '../CustomBtn';
// import en from '@src/i18n/en';
// import ar from '@src/i18n/ar';

// import en from '@src/i18n/en';
// import ar from '@src/i18n/ar';

function Header({ name, hospitalName, showAddPatientBtn }) {
    const { Text } = Typography;
    const [, setLang] = useLocalStorage('storageLang', 'en');
    const { t } = useTranslation('common');

    // const t = storageLang === 'en' ? en : ar;
    return (
        <Row align="middle" justify="end">
            {showAddPatientBtn ? (
                <span className={styles.header__btn}>
                    <Link href={`/create-patient`} className={styles.linkText}>
                        {`${t('registerPatient')} + `}
                    </Link>
                </span>
            ) : null}

            <div className={styles.header__notifications}>
                <Badge size="small" offset={[0, 12]} count={5}>
                    {/* <BellOutlined /> */}
                    <Dropdown.Button
                        className="dropdown-btn"
                        overlay={
                            <Menu>
                                <Menu.Item key="1">Item 1</Menu.Item>
                                <Menu.Item key="2">Item 2</Menu.Item>
                                <Menu.Item key="3">Item 3</Menu.Item>
                            </Menu>
                        }
                        icon={<BellOutlined />}></Dropdown.Button>
                </Badge>
            </div>
            <div className={styles.header__lang}>
                <LangToggle setLang={setLang} />
            </div>

            <Link href="/">
                <div className={styles.header__img}>
                    <Image width={30} height={30} src="/assets/images/doctor-150.jpg" />
                </div>
            </Link>
            <Text>{name || hospitalName}</Text>
        </Row>
    );
}

Header.propTypes = {
    showAddPatientBtn: PropTypes.bool,
    name: PropTypes.string.isRequired,
    hospitalName: PropTypes.string.isRequired,
    textBtn: PropTypes.string
};

export default Header;
