import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import Image from 'next/image';
import { TeamOutlined, UserOutlined, UploadOutlined, VideoCameraOutlined,MenuUnfoldOutlined,
MenuFoldOutlined } from '@ant-design/icons';
import styles from './Layout.module.scss';
const { Content, Footer, Sider ,Header} = Layout;
// import Sidebar from './Sidebar';
function SliderLayout({ title, keywords, description, children }) {
    const [collapsed, setCollapsed] = useState(false);
 const toggle = () => {
 setCollapsed(!collapsed)
  };
    return (
        <Layout>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>
            <Sider
                 breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
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
                <Menu className={styles.sider__menu} mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item
                        className={styles.sider__menu__item}
                        key="1"
                        icon={<VideoCameraOutlined />}>
                        <span className="nav-text">nav 1</span>
                    </Menu.Item>
                    <Menu.Item
                        className={styles.sider__menu__item}
                        key="2"
                        icon={<UploadOutlined />}>
                        <span className="nav-text">nav 2</span>
                    </Menu.Item>
                    <Menu.Item className={styles.sider__menu__item} key="3" icon={<UserOutlined />}>
                        <span className="nav-text">nav 3</span>
                    </Menu.Item>
                    <Menu.Item
                        className={`sideMenuItem ${styles.sider__menu__item}`}
                        key="4"
                        icon={<TeamOutlined />}>
                        <span className="nav-text">nav 4</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
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
                <Footer className="textCenter">Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}
SliderLayout.defaultProps = {
    title: 'Doctor Platform',
    description: 'Follow up patients',
    keywords: 'patient,doctor'
};

SliderLayout.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    keywords: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};
export default SliderLayout;
