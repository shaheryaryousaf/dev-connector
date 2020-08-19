import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import Alert from "../layout/Alert";

// RESUX
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";

const Posts = ({ getPosts, post: { posts, loading } }) => {

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <Fragment>
            {loading ? (<Spinner />) :
                (<Fragment>
                    <Alert />
                    <h1>Posts</h1>
                    <span id="custom-heading">Welcome to the community!</span>
                    <PostForm />
                    <div id="posts" className="mt-4">
                        {posts.map(post => (
                            <PostItem key={post._id} post={post} />
                        ))}
                    </div>
                </Fragment>)}
        </Fragment>
    );
};


Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);
