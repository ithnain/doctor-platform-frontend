import React from 'react';
import { connect } from 'react-redux';
import router from 'next/router';

const authenticatedRoute = (Component = null, options = {}) => {
    class AuthenticatedRoute extends React.Component {
        state = {
            loading: true
        };

        componentDidMount() {
            if (router.pathname === '/login' && this.props.isLoggedIn) {
                router.push('/overview');
                return;
            }
            if (this.props.isLoggedIn) {
                this.setState({ loading: false });
            } else {
                this.setState({ loading: false });
                router.push('/login');
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

    return connect((state) => ({
        isLoggedIn: state?.user.token
    }))(AuthenticatedRoute);
};

export default authenticatedRoute;
