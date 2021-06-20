// import PropTypes from 'prop-types';
import LangToggle from '@components/LangToggle';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { Row } from 'antd';
// import en from '@src/i18n/en';
// import ar from '@src/i18n/ar';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Layout.module.scss';
import { Typography, Badge, Menu, Dropdown } from 'antd';
import { BellOutlined } from '@ant-design/icons';

function Header() {
    const { Text } = Typography;
    const [, setLang] = useLocalStorage('storageLang', 'en');
    // const t = storageLang === 'en' ? en : ar;
    return (
        <Row align="middle" justify="end">
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
            <Text>Abdallah Ali</Text>
        </Row>
    );
}

Header.propTypes = {};

export default Header;
