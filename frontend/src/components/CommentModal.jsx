import React from "react";
import Modal from "react-bootstrap/Modal";

const CommentModal = ({ show, type, body, title, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {type == 1
                        ? `"${title}" Comentarios:`
                        : `Nuevo Comentario para "${title}"`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
        </Modal>
    );
};

export default CommentModal;
