import "./FilterModal.css";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadAllSpotsThunk, loadFilteredSpotsThunk } from "../../store/spots";
import { useFilterParams } from "../../context/FilterParams";

function FilterModal() {
    const { closeModal } = useModal();
    const [error, setError] = useState('');

    const { minPrice, setMinPrice, maxPrice, setMaxPrice, urlSuffix, setSuffix } = useFilterParams();

    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        console.log('before:', urlSuffix);
        if (minPrice > maxPrice) return (setError("Minimum Price must be less than Maximum Price"));
        await setSuffix()

            console.log('you set it')
            console.log(urlSuffix);
            return;


        const res = await dispatch(loadFilteredSpotsThunk(urlSuffix));
        console.log('res:', res)
        console.log('res.message:', res.message)
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
                                <label id='max-price-label' htmlFor="max-price">Maximum</label>
                                <span>$<input id='max-price' min="0" max="50000" placeholder='1300+' value={maxPrice} onChange={e => setMaxPrice(e.target.value)} type='number'></input></span>
                            </div>
                        </div>
                        <p></p>
                    </div>
                </div>
            <hr />
                <div id='filter-modal-footer'>
                    <div id='filter-clear' onClick={() => {
                        dispatch(loadAllSpotsThunk());
                        setMinPrice(1);
                        setMaxPrice(50_000);
                    }}>Reset</div>
                    <button id='form-button' type='submit'>Show places</button>
                </div>
            </form>
        </div>
    );
};

// did you just break both buttons in the modal?

export default FilterModal;
