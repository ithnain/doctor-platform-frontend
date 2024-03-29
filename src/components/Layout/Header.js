import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Typography, Button } from 'antd';

import Image from 'next/image';
import LangToggle from '@components/LangToggle';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import styles from './Layout.module.scss';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { roles } from '@src/utils/ROLE';

function Header({ name, userRole }) {
    const { Text } = Typography;
    const router = useRouter();
    const [, setLang] = useLocalStorage('storageLang', 'en');
    const { t } = useTranslation('common');
    const [loadingCreatePatient, setloadingCreatePatient] = useState(false);

    return (
        <Row align="middle" justify="end">
            {userRole === roles.doctor && (
                <Button
                    className={styles.header__btn}
                    loading={loadingCreatePatient}
                    onClick={async () => {
                        if (router.pathname === '/create-patient') {
                            return;
                        }
                        setloadingCreatePatient(true);
                        await router.push('/create-patient');
                    }}>
                    {`${t('registerPatient')} + `}
                </Button>
            )}
            {userRole === roles.REPRESENTATIVE && (
                <Button
                    className={styles.header__btn}
                    loading={loadingCreatePatient}
                    onClick={async () => {
                        if (router.pathname === '/create-patient') {
                            return;
                        }
                        setloadingCreatePatient(true);
                        await router.push('/representative-create-patient');
                    }}>
                    {`${t('registerPatient')} + `}
                </Button>
            )}

            {/* <div className={styles.header__notifications}>
                 <Badge size="small" offset={[0, 12]} count={5}>
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
             </div> */}
            <div className={styles.header__lang}>
                <LangToggle setLang={setLang} />
            </div>

            <Link href="/doctor/profile">
                <div className={styles.header__img}>
                    <Image width={30} height={30} src="/assets/images/doctor-150.jpg" />
                </div>
            </Link>
            {name && <Text> {name} </Text>}
        </Row>
    );
}

Header.propTypes = {
    userRole: PropTypes.string,
    name: PropTypes.string,
    textBtn: PropTypes.string
};

export default Header;
