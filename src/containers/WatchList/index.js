import React, { useState } from 'react';
import { usePathSelector } from 'redux-utility';
import { useQuery } from '../../queries/hooks';
import WatchMoviesList from '../WatchMoviesList';
import WatchListModal from '../WatchListModal';
import WatchListCard from '../../components/WatchListCard';
import OutlineButton from '../../components/OutlineButton';
import { createAuthClientOptions } from '../../utils/createAuthClientOptions';
import { MY_WATCH_LISTS, PUBLIC_WATCH_LISTS } from '../../queries';

import './styles.scss';

const MyList = ({onClick, userData, refresh, deleted }) => {
    const [ open, setOpen ] = useState(false);
    const myLists = useQuery(MY_WATCH_LISTS, {},
        {
            disableCaching: true,
            clientOptions: createAuthClientOptions(userData.token)
        }
    );

    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

    const myListloading = (
        <div className="watch-list__section__loading">
            <img src="https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif" alt="loading"/>
        </div>
    );

    const refreshData = () => {
        myLists.refresh();
        refresh();
    }

    const myListContent = () => {
        return myLists.data.myWatchlists.filter(w => !deleted.includes(w.id)).length > 0 ? (
            <div className="watch-list__section__grid">
                {myLists.data.myWatchlists.filter(w => !deleted.includes(w.id)).map(((list,key) => { return (
                    <WatchListCard element data={list} key={key} onClick={()=>onClick(list,true)}/>
                )}))}
            </div>
        ) : (
            <div className="watch-list__section__error">
                <h2>You do not have any list yet</h2>
            </div>
        )
    };

    return (
        <section className="watch-list__section">
            <header>
                <h2>Your Watch Lists</h2>
                <OutlineButton white onClick={openModal}>New List</OutlineButton>
            </header>
            { myLists.loading ? myListloading : myListContent() }
            <WatchListModal open={open} handleClose={closeModal} userData={userData} refresh={refreshData}/>
        </section>
    );
}

const WatchList = ({onClickMovie}) => {
    const [ selectedWatchList, setSelectedWatchList ] = useState(null);
    const { authenticated, data } = usePathSelector('user');
    const [deleted, setDeleted] = useState([])
    const publicLists = useQuery(PUBLIC_WATCH_LISTS,{},{ disableCaching: true });

    const onSelectWatchList = (value,owned) => {
        if( owned ){
            setSelectedWatchList({ ...value, owned })
        } else {
            setSelectedWatchList(value);
        }
    }

    const handleDelete = (id) => {
        setDeleted([ ...deleted, id ])
        publicLists.refresh();
    }

    const publicListloading = (
        <div className="watch-list__section__loading">
            <img src="https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif" alt="loading"/>
        </div>
    );

    const publicListContent = () => {
        return publicLists.data.publicWatchlists.length > 0 ? (
            <div className="watch-list__section__grid">
                {publicLists.data.publicWatchlists.filter(p => !deleted.includes(p.id)).map(((list,key) => { return (
                    <WatchListCard element key={key} data={list} onClick={()=>onSelectWatchList(list)}/>
                )}))}
            </div>
        ) : (
            <div className="watch-list__section__error">
                <h2>No public lists yet</h2>
            </div>
        )
    };

    const renderPublicList = (
        <section className="watch-list__section">
            <header>
                <h2>Public Watch Lists</h2>
            </header>
            { publicLists.loading ? publicListloading : publicListContent() }
        </section>
    );

    const renderMovieList = (list) => ( 
        <WatchMoviesList 
            onClickMovie={onClickMovie}
            data={list}
            goBack={()=>onSelectWatchList(null)}
            onDelete={handleDelete}
        /> 
    );

    const render = () => {
        if (selectedWatchList) {
            return renderMovieList(selectedWatchList)
        } else {
            return (
                <div className="watch-list">
                    { authenticated && (<MyList deleted={deleted} refresh={publicLists.refresh} userData={data} onClick={onSelectWatchList}/>) }
                    { renderPublicList }
                </div>
            );
        }
    }
    
    return render();
}


export default WatchList;