import { Button } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Custom.module.scss';

function CustomButton({ text, handleClick: handleclick, loading, className, ...props }) {
    return (
        <Button
            {...props}
            onClick={handleclick}
            className={`${className} ${styles.customBtn}`}
            loading={loading}>
            {text}
        </Button>
    );
}

CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    loading: PropTypes.bool,
    className: PropTypes.string
};
export default CustomButton;
