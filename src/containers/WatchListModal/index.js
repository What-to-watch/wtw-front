import React, { useState, useEffect } from 'react';
import getClassName from "../../utils/getClassName";
import OutlineButton from '../../components/OutlineButton';
import Input from '../../components/Input';
import { useMutation } from '../../queries/hooks';
import { createAuthClientOptions } from '../../utils/createAuthClientOptions';
import { CREATE_WATCH_LIST } from '../../queries';

import './styles.scss';

const WatchListModal = ({open, handleClose=()=>{}, userData, refresh=()=>{}}) => {
    const [title, setTitle] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [icon, setIcon] = useState('top');
    const [ createWatchListMutation, { data, loading, error } ] = useMutation(CREATE_WATCH_LIST);

    const iconArray = [
        'top',
        'boat',
        'worm',
        'knife',
        'arrow',
        'soap',
        'stairs',
        'thunder'
    ];

    const initStatus = () => {
        setIcon('top');
        setIsPublic(false);
        setTitle('');
    }

    useEffect(()=>{
        if(data && !error) {
            createWatchListMutation.cancel();
            initStatus();
            handleClose();
        } else if ( error ) {
            createWatchListMutation.cancel();
            initStatus();
            handleClose();
        }
    }, [data, error, createWatchListMutation, handleClose, refresh])

    const handleSubmit = () => {
        if(title !== '') {
            createWatchListMutation({name: title, icon, isPublic}, createAuthClientOptions(userData.token));
            refresh();
        }
    }

    const handleChangeTitle = (value) => {
        setTitle(value);
        createWatchListMutation.reset();
    }

    const handleChangePublic = (value) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsPublic(value);
        createWatchListMutation.reset();
    }

    const handleChangeIcon = (value) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIcon(value);
        createWatchListMutation.reset();
    }

    const root = getClassName({
        base: "watchlist-modal",
        "&": true,
        "&--open": open
    })

    return (
        <div className={root}>
            <div className="watchlist-modal__content">
                <form onSubmit={handleSubmit}>
                    <header className="watchlist-modal__content__header">
                        <h1>New Watch List</h1>
                    </header>
                    <div className="watchlist-modal__content__form">
                        <Input name='name' placeholder="Watch list Name" onChange={handleChangeTitle}/>
                        <div className="watchlist-modal__content__form__isPublic">
                            <button onClick={handleChangePublic(!isPublic)} className={ !isPublic ? 'selected' : ""}>Private</button>
                            <button onClick={handleChangePublic(!isPublic)} className={ isPublic  ? 'selected' : ""}>Public</button>
                        </div>
                        <div className="watchlist-modal__content__form__picture">
                            <p>Select a Picture</p>
                            <div className="watchlist-modal__content__form__picture--buttons">
                                {iconArray.map(iconName => {
                                    return (
                                        <button 
                                            key={iconName}
                                            onClick={handleChangeIcon(iconName)}
                                            className={ iconName === icon ? 'selected' : ""}
                                        >
                                            <img src={`icons/watchList/${iconName}.svg`} alt={iconName} />
                                            { iconName === icon && (
                                                <div className="selected">
                                                    <img src="icons/check.svg" alt="check"/>
                                                </div> 
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="watchlist-modal__content__form__buttons">
                            <OutlineButton onClick={handleClose} white>Cancel</OutlineButton>
                            <OutlineButton onClick={handleSubmit} loading={loading}>Create Watch list</OutlineButton>
                        </div>
                    </div>
                </form>
                <div className="watchlist-modal__content__close" role="button" onClick={handleClose}>
                    <img src="icons/close.svg" alt="x"/>
                </div>
            </div>
        </div>
    )
};

export default WatchListModal;