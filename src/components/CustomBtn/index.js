import { Button } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Custom.module.scss';

function CustomButton({ text, handleButtonClick, loading, className, ...props }) {
    return (
        <Button
            {...props}
            onClick={handleButtonClick}
            className={`${className} ${styles.customBtn}`}
            loading={loading}>
            {text}
        </Button>
    );
}

CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
    handleButtonClick: PropTypes.func,
    loading: PropTypes.bool,
    className: PropTypes.string
};
export default CustomButton;
