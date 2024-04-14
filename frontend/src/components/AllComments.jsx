import React from "react";

const AllComments = ({ comments }) => {
    const commentsComponents = comments.map((comment) => {
        const date = new Date(comment.created_at);
        return (
            <div key={comment.id} className="comment">
                <p>"{comment.content}"</p>
                <p>{date.toLocaleString()}</p>
                <div className="commentDivider"></div>
            </div>
        );
    });
    return <div>{commentsComponents}</div>;
};

export default AllComments;
