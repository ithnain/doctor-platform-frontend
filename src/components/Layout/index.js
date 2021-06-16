import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Layout, Menu, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import Image from 'next/image';
import Link from 'next/link';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import styles from './Layout.module.scss';
const { Content, Sider, Header } = Layout;
import { useRouter } from 'next/router';
import sideNavIcons from './sidenav.json';
import HeaderMenu from './Header';
function SliderLayout({ title, keywords, description, children }) {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const path = router.pathname;
    console.log(path);
    const toggle = () => {
        setCollapsed(!collapsed);
    };
    const role = 'admin';
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
                        className={`sideMenuItem ${styles.sider__menu__item} ${styles.lastMenuItem}`}>
                        <Image src="/assets/icons/logout.svg" width={40} height={40} />
                        <span className="nav-text">
                            <Link href="/cases">Log out</Link>
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
                            <HeaderMenu />
                        </Header>
                    </Col>
                </Row>
                <Content className={styles.content}>
                    <div>
                        <br />
                        content
                        <br />
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
    children: PropTypes.node.isRequired
};
export default SliderLayout;
