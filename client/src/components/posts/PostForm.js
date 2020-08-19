import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// REDUX
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
    const [text, setText] = useState('');
    return (
        <Fragment>
            <div id="create-post">
                <div className="alert alert-dark mt-3" role="alert">
                    Say Something...
                        </div>

                <form className="mt-3" onSubmit={e => {
                    e.preventDefault();
                    addPost({ text });
                    setText('')
                }
                }>
                    <div className="mb-3">
                        <textarea className="form-control" rows="6" placeholder="Create a Post" name="text" value={text} onChange={e => setText(e.target.value)} required="required"></textarea>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary">Create Post</button>
                    </div>
                </form>
            </div>
        </Fragment >
    );
};


PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);