import React from 'react';
import "./styles.scss"
import getClassName from '../../utils/getClassName';

const Modal = (props) => {
    const { children, open, componentProps, className="" } = props;

    const cl = getClassName({
        "modal": true,
        "modal--open": open,
        [className]: Boolean(className),
    })

    return <main className={cl} {...componentProps}>
        {children}
    </main>
}

export default Modal;