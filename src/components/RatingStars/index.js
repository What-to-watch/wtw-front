import React, {useState} from 'react';
import getClassName from '../../utils/getClassName';

import './styles.scss';

const RatingStars = (props) => {
    const [ hover, setHover ] = useState(null);
    const { onChange, rating } = props

    const handleRating = (number) => () => {
        onChange(number);
    }

    return (
        <div className="rating-stars">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                const classes = getClassName({
                    'rating-stars__star': true,
                    'opacity': hover && ratingValue > hover && ratingValue <= rating,
                })
                return (
                    <label key={`star${i}`}>
                        <input 
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={handleRating(ratingValue)}
                        />
                        <img 
                            className={classes}
                            src={ ratingValue <= hover || ratingValue <= rating ? 'icons/fullStar.svg' : 'icons/Star.svg' }
                            alt="star"
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                        
                    </label>
                )
            })}
        </div>
    )
}

export default RatingStars;