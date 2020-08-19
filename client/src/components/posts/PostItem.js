import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";
import { Link } from "react-router-dom";

// REDUX 
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({ addLike, removeLike, deletePost, showActions, auth, post: { _id, text, name, avatar, date, user, likes, comments } }) => {
    return (
        <div className="card mb-3" style={{ width: '100%' }}>
            <div className="row g-0">
                <div className="col-md-3">
                    <img src={avatar} alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Author: <Link to={`/profiles/${user}`}>{name}</Link></h5>
                        <p className="card-text mb-2">{text}</p>
                        <p className="card-text mb-2"><small className="text-muted">Posted on <Moment format="DD/MM/YYYY">{date}</Moment></small>
                        </p>
                        {showActions && <Fragment>
                            <button onClick={(e) => addLike(_id)} type="button" className="btn btn-info"><i className="fa fa-thumbs-up"></i> {likes.length}</button> &nbsp;
                            <button onClick={(e) => removeLike(_id)} type="button" className="btn btn-info"><i className="fa fa-thumbs-down"></i></button>&nbsp;
                            <Link to={`/posts/${_id}`} className="btn btn-primary">
                                Discussion {comments.length > 0 && (<Fragment>{comments.length}</Fragment>)}
                            </Link> &nbsp;
                            {!auth.loading && user === auth.user._id && (
                                <button onClick={e => deletePost(_id)} type="button" className="btn btn-danger">Delete Post</button>
                            )}
                        </Fragment>}
                    </div>
                </div>
            </div>
        </div>
    );
};

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
