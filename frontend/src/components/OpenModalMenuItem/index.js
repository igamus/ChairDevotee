import { useModal } from '../../context/Modal';
import './OpenModalMenuItem.css';

function OpenModalMenuItem ({ modalComponent, itemText, onItemClick, onModalClose, className, id }) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onItemClick) onItemClick();
    };

    return (
        <div className={'modalMenuItem'+` ${className}`} id={`${id}`} onClick={onClick}>{itemText}</div>
    );
};

export default OpenModalMenuItem;
