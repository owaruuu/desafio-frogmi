import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AllComments from "./AllComments";
const CommentModal = ({ show, body, title, handleClose, comments }) => {
    console.log("🚀 ~ CommentModal ~ comments:", comments);
    return (
        <Modal show={show > 0} onHide={handleClose} className="modal show">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{body}</Modal.Body>
        </Modal>
    );
};

export default CommentModal;
