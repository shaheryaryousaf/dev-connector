import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";
import { Link } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";


const CommentItem = ({ postId, comment: { _id, text, user, avatar, name, date }, auth, deleteComment }) => {

    return (
        <Fragment>
            <div className="card mb-3" style={{ width: '100%' }}>
                <div className="row g-0">
                    <div className="col-md-3">
                        <img src={avatar} alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Comment By: <Link to={`/profiles/${user}`}>{name}</Link></h5>
                            <p className="card-text mb-2">{text}</p>
                            <p className="card-text mb-2"><small className="text-muted">Posted on <Moment format="DD/MM/YYYY">{date}</Moment></small>
                            </p>
                            {!auth.loading && user === auth.user._id && (
                                <button onClick={(e) => deleteComment(postId, _id)} type="button" className="btn btn-danger">Delete Comment</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};


CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem);
