import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import "./styles.scss"
import Modal from '../Modal'
import SearchField from '../SearchField'
import { equals, complement } from 'ramda'
import Chip from '../Chip'

const FilterModal = (props) => {
    const { 
        open, 
        onGenreChange = x => x,  
        top,
        bottom,
        left,
        right
    } = props;

    const modalProps = {
        top,
        bottom,
        left,
        right
    }

    const [genre, setNewGenre] = useState("");
    const [chips, setChips] = useState([]);
    const inputRef = useRef(undefined);

    const setGenres = newVal => {
        setChips(newVal)
        onGenreChange(newVal)
    }

    const addChip = (val) => {
        if( !chips.includes(val)){
            setGenres([...chips,val]);
        }
    }
    const removeChip = (val) => () => {
        setGenres(chips.filter(complement(equals(val))))
    }

    const clearSearch = (ref) => {
        if(ref.current){
            ref.current.clear()
        }
    }

    const handleClearAll = () => {
        setGenres([])
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addChip(genre);
        setNewGenre("")
        clearSearch(inputRef)
    }

    return <Modal open={open} {...modalProps}>
        <section className="filter-modal">
            <header className="filter-modal__header">
                <h3 className="filter-modal__header__title">Filter by genre</h3>
                <button className="filter-modal__header__action" onClick={handleClearAll}>Clear all</button>
            </header>
            <div className="filter-modal__division" />
            <section className="filter-modal__content">
                <form onSubmit={handleSubmit}>
                    <SearchField 
                        ref={inputRef}
                        onChange={({ target: { value } }) => setNewGenre(value)}
                    />
                </form>
                <div className="filter-modal__content__genres">
                    {
                        chips.map((text,id) => <Chip key={id} text={text} onClick={removeChip(text)} />)
                    }
                </div>
            </section>
        </section>
    </Modal>
}

FilterModal.propTypes = { 
    open: PropTypes.bool.isRequired, 
    onGenreChange: PropTypes.func.isRequired,  
    top: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
}

export default FilterModal;