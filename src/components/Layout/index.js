import 'antd/dist/antd.css';

import { Col, Layout, Menu, Row } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

import Head from 'next/head';
import HeaderMenu from './Header';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { clearUser } from '@redux/actions/user';
import sideNavIcons from './sidenav.json';
import styles from './Layout.module.scss';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const { Content, Sider, Header } = Layout;
function SliderLayout({ title, keywords, description, children }) {
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const path = router.pathname;
    console.log(path, "Path");
    const toggle = () => {
        setCollapsed(!collapsed);
    };
    const role = 'admin';
    const logoutHandler = () => {
        dispatch(clearUser());
        router.push('/login');
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
                trigger={null}
                collapsible
                collapsed={collapsed}
                onCollapse={() => setCollapsed(!collapsed)}
                className={styles.sider}>
                <div className={styles.sider__logo}>
                    <Image
                        preview={false}
                        width={80}
                        height={80}
                        src="/assets/logo-dark-notext.png"
                    />
                </div>
                <Menu className={styles.sider__menu} mode="inline" defaultSelectedKeys={[path]}>
                    {sideNavIcons[role].sidenavData.map((item) => (
                        <Menu.Item className={styles.sider__menu__item} key={`/${item.link}`}>
                            <Image src={`/assets/icons/${item.image}`} width={40} height={40} />
                            <span className="nav-text">
                                <Link href={`/${item.link}`}>{item.title}</Link>
                            </span>
                        </Menu.Item>
                    ))}

                    <Menu.Item
                        onClick={logoutHandler}
                        className={`sideMenuItem ${styles.sider__menu__item} ${styles.lastMenuItem}`}>
                        <Image src="/assets/icons/logout.svg" width={40} height={40} />
                        <span className="nav-text">
                            <button
                                // href="/login"
                                handleClick={logoutHandler}>
                                Log out
                            </button>
                        </span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Row justify="s tart">
                    <Col xs={24}>
                        <Header className={styles.header}>
                            {collapsed ? (
                                <MenuUnfoldOutlined className="trigger" onClick={toggle} />
                            ) : (
                                <MenuFoldOutlined className="trigger" onClick={toggle} />
                            )}
                            <HeaderMenu btnText={btnText} showAddPatientBtn={showAddPatientBtn}  />
                        </Header>
                    </Col>
                </Row>
                <Content className={styles.content}>
                    <>{children}</>
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
    children: PropTypes.node.isRequired
};
export default SliderLayout;
