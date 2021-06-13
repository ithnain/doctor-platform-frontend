import React from 'react';
import { Button } from 'antd';
import styles from "./Custom.module.scss";
function CustomButton({ text, handleClick, loading, className, ...props }) {

    return (
        <Button
            {...props}
            onClick={handleClick}
            className={`${className} ${styles.customBtn}`}
            loading={loading}>
            {text}
        </Button>
    );
}

export default CustomButton;
