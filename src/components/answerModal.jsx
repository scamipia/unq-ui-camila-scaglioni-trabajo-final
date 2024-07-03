import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './answerModal.css'

const AnswerModal = ({ show, title, handleClose }) => {

    return (
        <Modal className='answer-modal' show={show} onHide={handleClose}>
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

export default AnswerModal;