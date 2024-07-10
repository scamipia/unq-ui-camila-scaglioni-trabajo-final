import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './gameModal.css'
import "@fontsource/press-start-2p";
import "@fontsource/press-start-2p/400.css";


const GameModal = ({ show, title, handleClose, correctAnswer, isGameOver, score}) => {

    const modalClassName = isGameOver ? 'game-over-modal' : (correctAnswer ? 'game-modal-correct' : 'game-modal-incorrect');
    const titleClassName = isGameOver ? 'game-over-title' : '';

    return (
        <Modal className={modalClassName} show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title className={titleClassName}>{title}</Modal.Title>
                {isGameOver && <h3 className='score'>Your Score was: {score}</h3>}
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