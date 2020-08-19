import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

// REDUX
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
    const [text, setText] = useState('');
    return (
        <Fragment>
            <div id="create-post">
                <div className="alert alert-dark mt-3" role="alert">Leave a Comment</div>

                <form className="mt-3" onSubmit={e => {
                    e.preventDefault();
                    addComment(postId, { text });
                    setText('')
                }
                }>
                    <div className="mb-3">
                        <textarea className="form-control" rows="6" placeholder="Create a Post" name="text" value={text} onChange={e => setText(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary">Add Comment</button>
                    </div>
                </form>
            </div>
        </Fragment >
    );
};


CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
};


export default connect(null, { addComment })(CommentForm);
