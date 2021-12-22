import PropTypes from 'prop-types';
import { Spin } from 'antd';
import styles from './Loader.module.scss';

const Loader = ({ loading = false }) => {
    return <div className={styles.loading}>{loading ? <Spin /> : null}</div>;
};

Loader.propTypes = {
    loading: PropTypes.bool
};

export default Loader;
