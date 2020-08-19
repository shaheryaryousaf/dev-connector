import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Alert from "../layout/Alert";

// REDUX
import { connect } from "react-redux";
import { getPost } from "../../actions/post";

const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost, match])
    return (
        <Fragment>
            {loading || post === null ? (<Spinner />) :
                (
                    <Fragment>
                        <div id="posts" className="mt-4">
                            <Alert />
                            <PostItem post={post} showActions={false} />
                            <CommentForm postId={post._id} />
                        </div>
                        <div id="posts" className="mt-4">
                            {post.comments.map(comment => (
                                <CommentItem key={comment._id} comment={comment} postId={post._id} />
                            ))}
                        </div>
                    </Fragment>
                )}
        </Fragment>
    );
};


Post.propTypes = {
    getPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post);
