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
                <div className="close-button" onClick={() => closeModal()}>x</div>
                <h2 style={{fontSize: "14pt", padding: "0 200px 0 180px"}}>Filter</h2>
            </div>
            <form className="price-filter" onSubmit={handleSubmit}>
                    {/* price */}
                    {/* min input -- max input */}
                <div id='filter-modal-footer'>
                    <button id='form-button' type='submit'>Show places</button>
                </div>
            </form>
        </div>
    );
};

export default FilterModal;
