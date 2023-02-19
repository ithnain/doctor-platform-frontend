import PropTypes from 'prop-types';
import React from 'react';
import SliderLayout from '@components/Layout';
import router from 'next/router';
import { withCookies } from 'react-cookie';

function authenticatedRoute(Component = null) {
    class AuthenticatedRoute extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true
            };
        }
        componentDidMount() {
            fetch('/api/auth/getToken')
                .then((res) => res.json())
                .then((data) => {
                    if (!data.token) {
                        this.setState({ loading: true });
                        router.push({ pathname: '/login', options: { shallow: true } }).then(() => {
                            this.setState({ loading: false });
                        });
                        return;
                    } else {
                        if (
                            (router.pathname === '/login' && data.token) ||
                            (router.pathname === '/' && data.token)
                        ) {
                            router.push({ pathname: '/overview', options: { shallow: true } });
                            return;
                        } else if (router.pathname === '/' && !data.token) {
                            this.setState({ loading: true });
                            router
                                .push({ pathname: '/login', options: { shallow: true } })
                                .then(() => {
                                    this.setState({ loading: false });
                                });
                        }
                        if (data?.token) {
                            this.setState({ loading: false });
                            return;
                        }
                    }
                })
                .catch(() => {
                    this.setState({ loading: true });
                    router.push({ pathname: '/login', options: { shallow: true } }).then(() => {
                        this.setState({ loading: false });
                    });
                });
        }
        render() {
            const { loading } = this.state;

            if (loading) {
                return (
                    <SliderLayout title="loading">
                        <div />
                    </SliderLayout>
                );
            }

            return <Component {...this.props} />;
        }
    }
    AuthenticatedRoute.propTypes = {
        isLoggedIn: PropTypes.bool,
        cookies: PropTypes.any
    };

    return withCookies(AuthenticatedRoute);
}

export default authenticatedRoute;
