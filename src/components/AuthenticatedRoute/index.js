import PropTypes from 'prop-types';
import React from 'react';
import SliderLayout from '@components/Layout';
import { connect } from 'react-redux';
import router from 'next/router';

const authenticatedRoute = (Component = null) => {
    class AuthenticatedRoute extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                active: ''
            };
        }

        componentDidMount() {
            this.setState({ active: router.pathname });
            if (
                (router.pathname === '/login' && this.props.isLoggedIn) ||
                (router.pathname === '/' && this.props.isLoggedIn)
            ) {
                router.push({ pathname: '/overview', options: { shallow: true } });
                return;
            } else if (router.pathname === '/' && !this.props.isLoggedIn) {
                this.setState({ loading: true });
                router.push({ pathname: '/login', options: { shallow: true } }).then(() => {
                    this.setState({ loading: false });
                });
            }
            if (this.props.isLoggedIn) {
                this.setState({ loading: false });
                return;
            }
            if (this.props.isLoggedIn === '') {
                this.setState({ loading: true });
                router.push({ pathname: '/login', options: { shallow: true } }).then(() => {
                    this.setState({ loading: false });
                });
                return;
            }
        }
        render() {
            const { loading } = this.state;

            if (loading) {
                return (
                    <SliderLayout
                        title={this.state.active}
                        keywords={'doctor,platform,any word'}
                        description={'this is the doctor overview'}
                        active={`/${this.state.active}`}>
                        <div />
                    </SliderLayout>
                );
            }

            return <Component {...this.props} />;
        }
    }
    AuthenticatedRoute.propTypes = {
        isLoggedIn: PropTypes.string.isRequired
    };

    return connect((state) => ({
        isLoggedIn: state?.user.accessToken
    }))(AuthenticatedRoute);
};

export default authenticatedRoute;
