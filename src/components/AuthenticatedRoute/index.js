import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import router from 'next/router';

const authenticatedRoute = (Component = null) => {
    class AuthenticatedRoute extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true
            };
        }

        componentDidMount() {
            if (router.pathname === '/login' && this.props.isLoggedIn) {
                router.push('/overview');
                return;
            }
            if (router.pathname === '/' && this.props.isLoggedIn) {
                router.push('/overview');
                return;
            } else if (router.pathname === '/' && !this.props.isLoggedIn) {
                this.setState({ loading: true });
                router.push('/login').then(() => {
                    this.setState({ loading: false });
                });
            }
            if (this.props.isLoggedIn) {
                this.setState({ loading: false });
                return;
            }
            if (this.props.isLoggedIn === '') {
                this.setState({ loading: true });
                router.push('/login').then(() => {
                    this.setState({ loading: false });
                });
                return;
            }
        }
        render() {
            const { loading } = this.state;

            if (loading) {
                return <div />;
            }

            return <Component {...this.props} />;
        }
    }
    AuthenticatedRoute.propTypes = {
        isLoggedIn: PropTypes.bool.isRequired
    };

    return connect((state) => ({
        isLoggedIn: state?.user.accessToken
    }))(AuthenticatedRoute);
};

export default authenticatedRoute;
