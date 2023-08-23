import "./FilterModal.css";
import { useModal } from "../../context/Modal";

function FilterModal() {
    const { closeModal } = useModal();

    return (
        <div id='filter-modal'>
            <div id='filter-modal-header'>
                <div className="close-button" onClick={() => closeModal()}>x</div>
                <h2 style={{fontSize: "14pt", padding: "0 200px 0 180px"}}>Filter</h2>
            </div>
            <div id='filter-modal-body'>
                {/* price */}
                {/* min input -- max input */}
            </div>
            <div id='filter-modal-footer'>

            </div>
        </div>
    );
};

export default FilterModal;
