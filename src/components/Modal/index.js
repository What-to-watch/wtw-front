import React from 'react';
import "./styles.scss"
import getClassName from '../../utils/getClassName';

const Modal = (props) => {
    const { children, open, componentProps } = props;

    const cl = getClassName({
        "modal": true,
        "modal--open": open
    })

    return <main className={cl} {...componentProps}>
        {children}
    </main>
}

export default Modal;