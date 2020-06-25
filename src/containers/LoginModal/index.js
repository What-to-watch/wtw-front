import React, { useState, useEffect } from 'react'
import getClassName from "../../utils/getClassName";
import OutlineButton from '../../components/OutlineButton';
import Input from '../../components/Input';
import { useMutation } from '../../queries/hooks'
import { LOGIN, REGISTER } from '../../queries';
import { useDispatch } from 'react-redux';
import jwtDecode from '../../utils/jwt-decode';
import { loginSuccess } from '../../state/user';
import { Result } from '@juan-utils/ramda-structures'
import './styles.scss'

const validateForm = (data,keys) => {
    return Result.attempt(() => {
        if( !keys.map(k => data[k]).every(Boolean) ){
            throw Error("Please fill out all fields")
        }
        if( !data?.email?.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) ){
            throw Error("Invalid email")
        }
        return data
    })
}

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

    const [loginData, setLoginData] = useState({});
    const [regData  , setRegData] = useState({})

    const [loginValidationError, setLoginError] = useState(false);
    const [regValidationError, setRegError] = useState(false);
    const resetErrors = () => {
        setLoginError(false)
        setRegError(false)
    }

    const handleChange = (setter) => (value,{ name }) => {
        resetErrors()
        attemptRegister.reset()
        attemptLogin.reset()
        setter(d => ({ ...d, [name]: value }))
    }
    const handleChangeLogin = handleChange(setLoginData);
    const handleChangeReg = handleChange(setRegData)

    const [ attemptLogin, { data: successLogin, loading: loadingLog, error: errorLogin }] = useMutation(LOGIN);
    const [ attemptRegister, { data: successReg, loading: loadingReg, error: errorReg }] = useMutation(REGISTER);

    const handleSubmitReg = () => {
        validateForm(regData,["username","email","password"])
        .map(attemptRegister)
        .onError(({ message }) => setRegError(message))
    };

    const handleSubmitLog = () => {
        validateForm(loginData,["email","password"])
        .map(({ email, password }) => {
            return attemptLogin({},{
                headers: {
                    authorization: `Basic ${btoa(`${email}:${password}`)}`
                }
            })
        }).onError(({ message }) => setLoginError(message))
    };

    const dispatch = useDispatch();

    const loginErrorClass = getClassName({
        base: "login-modal__content__login__error",
        "&--shown": loginValidationError || errorLogin
    })
    const registerErrorClass = getClassName({
        base: "login-modal__content__signup__error",
        "&--shown": regValidationError || errorReg
    })

    useEffect(() => {
        const data = successReg || successLogin;
        if(data){
            attemptRegister.cancel()
            attemptLogin.cancel()
            const token = data.login?.token || data.register?.token
            jwtDecode(token)
            .map( ({ payload }) => {
                dispatch(loginSuccess({...payload, token, id: payload.sub }))
                return onClose()
            }).onFailure((e) => {
                console.error("Something went wrong in decoding",e)
            })
        }
    },[
        successLogin,successReg,
        attemptRegister,attemptLogin,
        dispatch, onClose
    ])

    return <div className={root} onClick={handleClose}>
        <main className="login-modal__content" onClick={handleContentClick}>
            <form className="login-modal__content__left" onSubmit={handleSubmitReg}>
                <header className="login-modal__content__header">
                    <h1 className="login-modal__content__header__title">Sign Up</h1>
                    <p className="login-modal__content__header__subtitle">to get recommendations tailored just for you!</p>
                </header>
                <div className="login-modal__content__signup">
                    <Input name="username" placeholder="Name" onChange={handleChangeReg}/>
                    <Input name="email" placeholder="Email Address" onChange={handleChangeReg}/>
                    <Input name="password" placeholder="Password" type="password" onChange={handleChangeReg}/>
                </div>
                <div className={registerErrorClass}>
                    { regValidationError || "Couldn't register. Please verify fields"}
                </div>
                <OutlineButton loading={loadingReg} onClick={handleSubmitReg}>Create Account</OutlineButton>
            </form>
            <div className="login-modal__content__division"/>
            <form className="login-modal__content__right" onSubmit={handleSubmitLog}>
                <header className="login-modal__content__header">
                    <h1 className="login-modal__content__header__title">Log In</h1>
                    <p className="login-modal__content__header__subtitle">Already have an account? <br/> Log in below</p>
                </header>
                <div className="login-modal__content__login">
                    <Input name="email" placeholder="Email Address" onChange={handleChangeLogin} />
                    <Input name="password" placeholder="Password" type="password" onChange={handleChangeLogin}/>
                </div>
                <div className={loginErrorClass}>
                    { loginValidationError || "Couldn't login. Please verify fields"}
                </div>
                <OutlineButton loading={loadingLog} onClick={handleSubmitLog} type="submit">Log In</OutlineButton>
            </form>
            <div className="login-modal__content__close" role="button" onClick={handleClose}>
                <img src="icons/close.svg" alt="x"/>
            </div>
        </main>
    </div>
}

export default LoginModal