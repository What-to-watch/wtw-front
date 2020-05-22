import React, { useState } from 'react'
import SearchField from '../../components/SearchField'
import FilterModal from '../../components/FilterModal'
import "./styles.scss"
import logo from './wtw_logo.svg'
import filterIcon from './filter.svg'

const TopBar = (props) => {
    const { onSearchChange=x=>x, onGenreChange=x=>x } = props

    const [open, setOpen] = useState(false)
    return (
        <header className="topbar">
            <figure className="topbar__logo">
                <img src={logo} alt="logo"/>
            </figure>
            <section className="topbar__left-content">
                <figure className="topbar__left-content__filter" onClick={() => setOpen(!open)}>
                    <img src={filterIcon} alt="filter"/>
                </figure>
                <SearchField onChange={onSearchChange} />
                <FilterModal open={open} onGenreChange={onGenreChange} />
            </section>
        </header>
    )
}

export default TopBar