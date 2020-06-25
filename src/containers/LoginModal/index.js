import React, { useState } from 'react'
import getClassName from "../../utils/getClassName";
import OutlineButton from '../../components/OutlineButton';
import Input from '../../components/Input';
import './styles.scss'

const LoginModal = (props) => {
    const { open, onClose=()=>{} } = props;

    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation()
        onClose()
    }

    const handleContentClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const root = getClassName({
        base: "login-modal",
        "&": true,
        "&--open": open
    })

    const [loadingReg, setLoadingReg] = useState(false);
    const [loadingLog, setLoadingLog] = useState(false);
    const createMock = fn => () => {
        fn(true)
        setTimeout(() => fn(false),1000)
    }
    const handleClickReg = createMock(setLoadingReg);
    const handleClickLog = createMock(setLoadingLog);

    return <div className={root} onClick={handleClose}>
        <main className="login-modal__content" onClick={handleContentClick}>
            <form className="login-modal__content__left" >
                <header className="login-modal__content__header">
                    <h1 className="login-modal__content__header__title">Sign Up</h1>
                    <p className="login-modal__content__header__subtitle">to get recommendations tailored just for you!</p>
                </header>
                <div className="login-modal__content__signup">
                    <Input placeholder="Name" />
                    <Input placeholder="Email Address" />
                    <Input placeholder="Password" type="password" />
                </div>
                <OutlineButton loading={loadingReg} onClick={handleClickReg}>Create Account</OutlineButton>
            </form>
            <div className="login-modal__content__division"/>
            <form className="login-modal__content__right">
                <header className="login-modal__content__header">
                    <h1 className="login-modal__content__header__title">Log In</h1>
                    <p className="login-modal__content__header__subtitle">Already have an account? <br/> Log in below</p>
                </header>
                <div className="login-modal__content__login">
                    <Input placeholder="Email Address" />
                    <Input placeholder="Password" type="password" />
                </div>
                <OutlineButton loading={loadingLog} onClick={handleClickLog} type="submit">Log In</OutlineButton>
            </form>
            <div className="login-modal__content__close" role="button" onClick={handleClose}>
                <img src="icons/close.svg" alt="x"/>
            </div>
        </main>
    </div>
}

export default LoginModal