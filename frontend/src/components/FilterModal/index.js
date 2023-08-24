import "./FilterModal.css";
import { useModal } from "../../context/Modal";
import { useState } from "react";

function FilterModal() {
    const { closeModal } = useModal();
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const handleSubmit = async e => {
        e.preventDefault();
        // if under min or over max, force it

        closeModal();
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
                        <div id='filter-price-inputs-container'>
                            <div id='min-price-container'>
                                <label id='min-price-label' htmlFor="min-price">Minimum</label>
                                <span>$<input id='min-price' min="0" max="50000" placeholder='1' type='number'></input></span>
                            </div>
                            <div style={{color: "#b7b7b7"}}>---</div>
                            <div id='max-price-container'>
                                <label id='max-price-label' htmlFor="min-price">Maximum</label>
                                <span>$<input id='max-price' min="0" max="50000" placeholder='1300+' type='number'></input></span>
                            </div>
                        </div>
                    </div>
                </div>
            <hr />
                <div id='filter-modal-footer'>
                    <div id='filter-clear'>Clear all</div>
                    <button id='form-button' type='submit'>Show places</button>
                </div>
            </form>
        </div>
    );
};

export default FilterModal;
