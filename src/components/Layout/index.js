import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import Image from 'next/image';
import Link from 'next/link';
// import Icon from "../../../public/assets/icons/icon.svg"
import {
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import styles from './Layout.module.scss';
const { Content, Footer, Sider, Header } = Layout;
// import Sidebar from './Sidebar';
function SliderLayout({ title, keywords, description, activeTab, children }) {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Layout>
            <Head>
                <title>Doctor Platform {title ? ` | ${title}` : ''}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                trigger={null}
                collapsible
                collapsed={collapsed}
                onCollapse={() => setCollapsed(!collapsed)}
                className={styles.sider}
                // style={{}}
            >
                <div className={styles.sider__logo}>
                    <Image
                        preview={false}
                        width={80}
                        height={80}
                        src="/assets/logo-dark-notext.png"
                    />
                </div>
                <Menu
                    className={styles.sider__menu}
                    mode="inline"
                    defaultSelectedKeys={[`${activeTab}`]}>
                    <Menu.Item className={styles.sider__menu__item} key="1">
                        <Image src="/assets/icons/icon.svg" width={40} height={40} />
                        <span className="nav-text">
                            <Link href="/overview">Overview</Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item className={styles.sider__menu__item} key="2">
                        <Image src="/assets/icons/hospital.svg" width={40} height={40} />
                        <span className="nav-text">
                            <Link href="/hospital">Hospital</Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item className={styles.sider__menu__item} key="3">
                        <Image src="/assets/icons/patient.svg" width={40} height={40} />
                        <span className="nav-text">
                            <Link href="/patients">My Patients</Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item className={`sideMenuItem ${styles.sider__menu__item}`} key="4">
                        <Image src="/assets/icons/question.svg" width={40} height={40} />
                        <span className="nav-text">
                            <Link href="/cases">My Support Cases</Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item
                        className={`sideMenuItem ${styles.sider__menu__item} ${styles.lastMenuItem}`}>
                        <Image src="/assets/icons/logout.svg" width={40} height={40} />
                        <span className="nav-text">
                            <Link href="/cases">Log out</Link>
                        </span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })} */}
                    {collapsed ? (
                        <MenuUnfoldOutlined className="trigger" onClick={toggle} />
                    ) : (
                        <MenuFoldOutlined className="trigger" onClick={toggle} />
                    )}
                </Header>
                <Content className={styles.content}>
                    <div style={{}}>
                        ...
                        <br />
                        Really
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        long
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ... ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ... ... ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ... ... ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ... ... ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ... ... ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        content
                        {children}
                    </div>
                </Content>
                {/* <Footer className="textCenter">Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
        </Layout>
    );
}
SliderLayout.defaultProps = {
    title: '',
    description: 'Follow up patients',
    keywords: 'patient,doctor'
};

SliderLayout.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
    keywords: PropTypes.string.isRequired,
    activeTab: PropTypes.string,
    children: PropTypes.node.isRequired
};
export default SliderLayout;
