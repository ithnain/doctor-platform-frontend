import 'antd/dist/antd.css';

import { Col, Layout, Menu, Row } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { QueryClient, dehydrate, useMutation, useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';

import API from '@utils/axios';
import Head from 'next/head';
import HeaderMenu from './Header';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import moment from 'moment';
import sideNavIcons from './sidenav.json';
import styles from './Layout.module.scss';
import { useRouter } from 'next/router';

const { Content, Sider, Header } = Layout;
const getUserData = async () => {
    return API.get(`auth/profile`);
};
function SliderLayout({ title, keywords, description, active, children }) {
    const { data: userData } = useQuery('user', getUserData, {
        enabled: title !== 'loading'
    });
    const refreshRequest = async () => {
        await API.post('auth/refrsh', {
            token: `${userData?.data.refreshToken}`
        })
            .then((res) => {
                fetch('/api/auth/login', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: res.data.accessToken })
                });
            })
            .catch(() => {
                logoutHandler();
            });
    };

    const { mutate: refreshTokenMutate } = useMutation(() => refreshRequest());

    useEffect(() => {
        if (moment(userData?.data.refreshTokenDate) <= moment() && userData?.data.refreshToken) {
            refreshTokenMutate();
        }
    }, [userData?.data.refreshToken]);

    const router = useRouter();

    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const logoutHandler = () => {
        router.push('/login').then(() => {
            fetch('/api/auth/logout', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
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
                    <Image width={80} height={80} src="/assets/logo-dark-notext.png" />
                </div>
                <Menu className={styles.sider__menu} mode="inline" defaultSelectedKeys={[active]}>
                    {userData?.data.role &&
                        sideNavIcons[userData?.data.role]?.sidenavData?.map((item) => (
                            <Menu.Item className={styles.sider__menu__item} key={`/${item.link}`}>
                                <div className={styles.icon_container}>
                                    <img src={`/assets/icons/${item.image}`} width={35} height={35} />
                                </div>
                                <span className="nav-text">
                                    <Link href={`/${item.link}`}>{item.title}</Link>
                                </span>
                            </Menu.Item>
                        ))}

                    <Menu.Item
                        key={`item-logout`}
                        onClick={logoutHandler}
                        className={`sideMenuItem ${styles.sider__menu__item} ${styles.lastMenuItem}`}>
                        <div className={styles.icon_container}>
                            <img src={`/assets/icons/logout.svg`} width={35} height={35} />
                        </div>

                        <span className="nav-text">
                            <button onClick={logoutHandler}>Log out</button>
                        </span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Row justify="s tart">
                    <Col xs={24}>
                        <Header
                            className={styles.header}
                            name={userData?.data.name}
                            gender={userData?.data.gender}
                            image={userData?.data.image}>
                            {collapsed ? (
                                <MenuUnfoldOutlined className="trigger" onClick={toggle} />
                            ) : (
                                <MenuFoldOutlined className="trigger" onClick={toggle} />
                            )}
                            <HeaderMenu userRole={userData?.data.role} />
                        </Header>
                    </Col>
                </Row>
                {userData && (
                    <Content className={styles.content}>
                        {React.Children.map(children, (child) => {
                            return React.cloneElement(child, { userdata: userData.data });
                        })}
                    </Content>
                )}
            </Layout>
        </Layout>
    );
}
SliderLayout.defaultProps = {
    title: ' ',
    description: 'Follow up patients',
    keywords: 'patient,doctor'
};

SliderLayout.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
    keywords: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    active: PropTypes.string,
    textBtn: PropTypes.string
};

export const getServerSideProps = async () => {
    const qClient = new QueryClient();
    await qClient.prefetchQuery('user', getUserData);

    return {
        props: {
            dehydratedState: dehydrate(qClient)
        }
    };
};
export default SliderLayout;
