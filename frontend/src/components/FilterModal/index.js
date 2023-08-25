import "./FilterModal.css";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadFilteredSpotsThunk } from "../../store/spots";

function FilterModal() {
    const { closeModal } = useModal();
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(50000);
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();

        const res = await dispatch(loadFilteredSpotsThunk(`minPrice=${minPrice}&maxPrice=${maxPrice}`));
        if (res.message) {
            setError(res.message);
        } else {
            closeModal();
        };
    };

    return (
        <div id='filter-modal'>
            <div id='filter-modal-header'>
                <div className="close-button" onClick={() => closeModal()}>X</div>
                <h2 style={{fontSize: "14pt", padding: "0 200px 0 180px", margin: "0"}}>Filter</h2>
            </div>
            <hr />
            <form className="price-filter" onSubmit={handleSubmit}>
                <div id='filter-modal-body'>
                    <div id='filter-price'>
                        <h3 id='filter-price-header'>Price range</h3>
                        <p id='filter-price-subheader'>Seat rental prices before fees and taxes</p>
                        <p className="error" style={{margin: "0", marginBottom: "1em"}}>{error}</p>
                        <div id='filter-price-inputs-container'>
                            <div id='min-price-container'>
                                <label id='min-price-label' htmlFor="min-price">Minimum</label>
                                <span>$<input id='min-price' min="0" max="50000" placeholder='1' value={minPrice} onChange={e => setMinPrice(e.target.value)} type='number'></input></span>
                            </div>
                            <div style={{color: "#b7b7b7"}}>---</div>
                            <div id='max-price-container'>
                                <label id='max-price-label' htmlFor="min-price">Maximum</label>
                                <span>$<input id='max-price' min="0" max="50000" placeholder='1300+' value={maxPrice} onChange={e => setMaxPrice(e.target.value)} type='number'></input></span>
                            </div>
                        </div>
                        <p></p>
                    </div>
                </div>
            <hr />
                <div id='filter-modal-footer'>
                    <div id='filter-clear' onClick={() => {
                        setMinPrice(1);
                        setMaxPrice(50_000);
                    }}>Clear all</div>
                    <button id='form-button' type='submit'>Show places</button>
                </div>
            </form>
        </div>
    );
};

export default FilterModal;
