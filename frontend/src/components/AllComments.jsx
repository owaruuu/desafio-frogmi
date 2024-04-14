import React from "react";

const AllComments = ({ comments }) => {
    const commentsComponents = comments.map((comment) => {
        return (
            <div key={comment}>
                <p>comment content</p>
                <p>comment date</p>
                <div>divider</div>
            </div>
        );
    });
    console.log(
        "🚀 ~ commentsComponents ~ commentsComponents:",
        commentsComponents
    );
    return <div>{commentsComponents}</div>;
};

export default AllComments;
