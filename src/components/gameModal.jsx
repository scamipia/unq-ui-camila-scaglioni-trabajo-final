import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './gameModal.css'

const GameModal = ({ show, title, handleClose, correctAnswer, isGameOver}) => {

    const modalClassName = isGameOver ? 'game-over-modal' : (correctAnswer ? 'game-modal-correct' : 'game-modal-incorrect');

    return (
        <Modal className={modalClassName} show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <button className='modal-button' variant="secondary" onClick={handleClose}>
                    Continue
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default GameModal;