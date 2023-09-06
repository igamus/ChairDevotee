import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllSpotsThunk, loadFilteredSpotsThunk } from '../../store/spots';
import sequelizelogo from './sequelizelogo.png';
import './SpotsIndex.css';
import SpotsIndexCard from '../SpotsIndexCard';
import OpenModalButton from '../OpenModalButton';
import FilterModal from '../FilterModal';
import { useFilterParams } from '../../context/FilterParams';

function SpotsIndex() {
    const dispatch = useDispatch();

    let { page, setPage, size, setSize, urlSuffix, setSuffix } = useFilterParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [leftClass, setLeftClass] = useState("fa-solid fa-chevron-left browse-button");
    const [rightClass, setRightClass] = useState("fa-solid fa-chevron-right browse-button");

    useEffect(() => {
        console.log('urlsuffix:', urlSuffix)
        dispatch(loadFilteredSpotsThunk(urlSuffix)).then(() => setIsLoaded(true));
    }, [dispatch, urlSuffix]);

    const spots = useSelector(state => Object.values(state.spots.allSpots));

    return isLoaded && (
        <>
            <div id='spot-index-header'>
                <div className='tech-box'>
                    <i className="fa-brands fa-html5" />
                    <div className='tech-name'>HTML5</div>
                </div>
                <div className='tech-box'>
                    <i className="fa-brands fa-css3-alt" />
                    <div className='tech-name'>CSS3</div>
                </div>
                <div className='tech-box'>
                    <i className="fa-brands fa-square-js" />
                    <div className='tech-name'>JavaScript</div>
                </div>
                <div className='tech-box'>
                    <i className="fa-brands fa-react" />
                    <div className='tech-name'>React.js</div>
                </div>
                <div className='tech-box'>
                    {/* https://icons8.com/ */}
                    <img width="24" height="24" src="https://img.icons8.com/ios/50/c1c1c/redux.png" alt="redux"/>
                    <div className='tech-name'>Redux</div>
                </div>
                <div className='tech-box'>
                    {/* https://icons8.com/ */}
                    <img width="24" height="24" src="https://img.icons8.com/external-outline-juicy-fish/60/external-sql-coding-and-development-outline-outline-juicy-fish.png" alt="external-sql-coding-and-development-outline-outline-juicy-fish"/>
                    <div className='tech-name'>SQL</div>
                </div>
                <div className='tech-box'>
                    {/* https://brandslogos.com/s/sequelize-logo-black-and-white/ */}
                    <img width="24" height="24" src={sequelizelogo} alt="Sequelize" />
                    <div className='tech-name'>Sequelize</div>
                </div>
                <div className='tech-box'>
                    <i className="fa-brands fa-node" />
                    <div className='tech-name'>Node.js</div>
                </div>
                <OpenModalButton id='filter-button' buttonText={<span id='filter-text'><i className="fa-solid fa-filter" />Filters</span>} modalComponent={<FilterModal />} />
            </div>
            <div id='browse-buttons'>
                <i className={leftClass} id="nav-left" />
                <i className={rightClass} id="nav-right" />
            </div>
            <section id='spot-index'>
                {spots.map(spot => <SpotsIndexCard key={`spot-card-${spot.id}`} spot={spot} />)}
            </section>
            <section id='pagination-footer'>
                {/* does this need to be a form? */}
                {/* implement placeholder */}
                {/* make form work */}
                <form id='size-setter-form' onSubmit={(e) => setSuffix()}>
                    <label htmlFor='size-setter'>Spots per page:</label>
                    <input
                        id='size-setter'
                        type='number'
                        step="1"
                        min="1"
                        max="20"
                        value={size}
                        onChange={e => setSize(e.target.value)}
                    />
                    <label htmlFor='page-select'>Current Page:</label>
                    <input
                        id='page-select'
                        type='number'
                        min='1'
                        max='10'
                        value={page}
                        onChange={e => {setPage(e.target.value)}}
                    />
                </form>
                <span id='max'>(Max Page Index: 10)</span>
            </section>
        </>
    );
};

export default SpotsIndex;
