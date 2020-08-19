import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from "../layout/Spinner";

// REDUX
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";

const ProfileGithub = ({ getGithubRepos, repos, username }) => {

    useEffect(() => {
        getGithubRepos(username);
    }, [getGithubRepos, username]);

    return (
        <Fragment>
            {repos === null ? (<Spinner />) : (
                <Fragment>
                    {repos.map(repo => (
                        <div className="card mb-3" key={repo.id} style={{ width: '100%' }}>
                            <div className="card-body">
                                <h5 className="card-title"><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></h5>
                                <p className="card-text">{repo.description}</p>
                                <span className="badge bg-primary">Stars: {repo.stargazers_count}</span>&nbsp;
                                <span className="badge bg-secondary">Watchers: {repo.watchers_count}</span>&nbsp;
                                <span className="badge bg-success">Forks: {repo.forks_count}</span>
                            </div>
                        </div>
                    ))}
                </Fragment>
            )}
        </Fragment>
    );
};


ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
