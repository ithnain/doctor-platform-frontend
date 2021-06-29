import 'antd/dist/antd.css';

import { Col, Layout, Menu, Row } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Head from 'next/head';
import HeaderMenu from './Header';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { clearUser } from '@redux/actions/user';
import { roles } from '@src/utils/ROLE';
import sideNavIcons from './sidenav.json';
import styles from './Layout.module.scss';
import { useRouter } from 'next/router';

const { Content, Sider, Header } = Layout;
function SliderLayout({ title, keywords, description, active, children }) {
    const dispatch = useDispatch();
    const { name, hospital, role, gender, image } = useSelector((state) => state.user.data);
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const path = router.pathname;
    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const [showAddPatientBtn, setShowAddPatientBtn] = useState(false);
    useEffect(() => {
        if (role === roles.doctor) {
            setShowAddPatientBtn(true);
        }
    }, [path, role]);

    const logoutHandler = () => {
        router.push('/login').then(() => {
            fetch('/api/auth/logout', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            }).then(() => {
                dispatch(clearUser());
            });
        });
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
                <Menu className={styles.sider__menu} mode="inline" defaultSelectedKeys={[active]}>
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
                            <button handleClick={logoutHandler}>Log out</button>
                        </span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Row justify="s tart">
                    <Col xs={24}>
                        <Header
                            className={styles.header}
                            name={name}
                            hospitalName={hospital.name}
                            gender={gender}
                            image={image}>
                            {collapsed ? (
                                <MenuUnfoldOutlined className="trigger" onClick={toggle} />
                            ) : (
                                <MenuFoldOutlined className="trigger" onClick={toggle} />
                            )}
                            <HeaderMenu showAddPatientBtn={showAddPatientBtn} />
                        </Header>
                    </Col>
                </Row>
                <Content className={styles.content}>
                    <>{children}</>
                </Content>
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
    children: PropTypes.node.isRequired,
    active: PropTypes.string.isRequired,
    textBtn: PropTypes.string.isRequired
};
export default SliderLayout;
