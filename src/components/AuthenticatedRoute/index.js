import React, { useState } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

const authenticatedRoute = (Component = null, options = {}) => {
    class AuthenticatedRoute extends React.Component {
        state = {
            loading: true
        };
        componentDidMount() {
            if (this.props.isLoggedIn) {
                this.setState({ loading: false });
            } else {
                Router.push('/login');
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
