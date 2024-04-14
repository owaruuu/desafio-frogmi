import React from "react";
import Spinner from "react-bootstrap/Spinner";

const NewCommentForm = ({ onSubmit, thinking, message }) => {
    return (
        <div className="newCommentForm">
            <form onSubmit={onSubmit}>
                <textarea
                    name="comment"
                    id="comment"
                    cols="30"
                    rows="10"
                    required
                    disabled={thinking}
                    autoFocus
                ></textarea>
                <div className="bottomArea">
                    <button type="submit" disabled={thinking}>
                        Crear
                    </button>
                    {thinking && (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )}
                    {message && <span>{message}</span>}
                </div>
            </form>
        </div>
    );
};

export default NewCommentForm;
