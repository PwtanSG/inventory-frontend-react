import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FaTrashAlt } from 'react-icons/fa'

const ModalPopUp = ({ showModal, handleClose, onModalClickHandler, modalTitle, modalBody, buttonName }) => {
    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><FaTrashAlt />{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={onModalClickHandler}>
                        {buttonName}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalPopUp
