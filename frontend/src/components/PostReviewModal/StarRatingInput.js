import './StarRatingInput.css';
import { useEffect, useState } from 'react';

function StarRatingInput({stars, onChange}) {
    const [activeStar, setActiveStar] = useState(stars);

    useEffect(() => {
        setActiveStar(stars);
    }, [stars]);

    const star = number => {
        return (
            <i
                key={number}
                className={activeStar >= number ? 'fa-star fa-solid' : 'fa-star fa-regular'}
                onMouseEnter={() => setActiveStar(number)}
                onMouseLeave={() => setActiveStar(stars)}
                onClick={() => onChange(number)}
                style={{fontSize: '20pt'}}
            />
        )
    }

    return <span id='stars'>{[1,2,3,4,5].map(number => star(number))}</span>
}

export default StarRatingInput;
