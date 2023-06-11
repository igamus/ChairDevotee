import './StarRatingInput.css';
import { useEffect, useState } from 'react';

function StarRatingInput({stars, onChange}) {
    const [activeStar, setActiveStar] = useState(stars);

    useEffect(() => {
        setActiveStar(stars);
    }, [stars]);

    const star = number => {
        return (
            <span
                key={number}
                className={activeStar >= number ? 'filled' : 'empty'}
                onMouseEnter={() => setActiveStar(number)}
                onMouseLeave={() => setActiveStar(stars)}
                onClick={() => onChange(number)}
            >
                <i className='fa fa-star' />
            </span>
        )
    }

    return <>{[1,2,3,4,5].map(number => star(number))}</>
}

export default StarRatingInput;
