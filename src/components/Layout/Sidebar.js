import { Layout, Image, Typography } from 'antd';
// import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { Text } = Typography;
import styles from './Sidenav.module.scss';
const SideNav = ({ tapItems, selectedTap, setSelectedTap }) => {
    return (
        <Sider className={styles.SideNav}>
            <div className="side-wrapper">
                <div className="bg-light sider-items-container">
                    {tapItems?.length ? (
                        tapItems.map((item, i) => {
                            let selected = selectedTap === item.text;
                            return (
                                <div
                                    key={`${i}-${item.text}`}
                                    className={`tap-container ${
                                        selected ? 'selected-tap' : ''
                                    } pointer my-font`}
                                    onClick={() => setSelectedTap(item.text)}>
                                    <Image preview={false} width={50} src={item.image} />
                                    <Text className="title-3">{t(item.text)}</Text>
                                </div>
                            );
                        })
                    ) : (
                        <LoadingOutlined />
                    )}
                </div>

                <div
                    onClick={() => console.log('Handle log out')}
                    className="sign-out-wrapper pointer my-font">
                    <Image
                        preview={false}
                        width={30}
                        src="/assets/icons/log-out.png"
                        style={{ marginBottom: 5 }}
                    />
                    {/* <Text className="title-3">{t('Log Out')}</Text> */}
                </div>
            </div>
        </Sider>
    );
};

export default SideNav;
