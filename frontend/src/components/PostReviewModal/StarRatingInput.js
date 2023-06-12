import './StarRatingInput.css';
import { useEffect, useState } from 'react';

function StarRatingInput({stars, onChange}) {
    const [activeStar, setActiveStar] = useState(stars);

    useEffect(() => {
        setActiveStar(stars);
        console.log(activeStar)
    }, [stars]);

    const star = number => {
        return (
            <span
                key={number}
                id={activeStar >= number ? 'filled' : 'empty'}
                className='star'
                onMouseEnter={() => setActiveStar(number)}
                onMouseLeave={() => setActiveStar(stars)}
                onClick={() => onChange(number)}
            >
                <i className='fa-regular fa-star' />
            </span>
        )
    }

    return <>{[1,2,3,4,5].map(number => star(number))}</>
}

export default StarRatingInput;
