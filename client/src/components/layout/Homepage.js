import React from "react"
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Homepage = ({ isAuthenticated }) => {
    if (isAuthenticated)
        return <Redirect to="/dashboard"/>;

    return (
            <section className="homepage">
                <div className="homepage-dark-background">
                    <div className="homepage-inner">
                        <h1>Social Network</h1>
                        <label>Create your personal profile, increase your social network and improve you skills</label>
                        <div className="homepage-link-wrapper">
                            <Link to="/login" className="homepage-link">Sign In</Link>
                            <Link to="/register" className="homepage-link">Register</Link>
                        </div>
                    </div>
                </div>
            </section>

    )

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null && state.profile.error === null
});

export default connect(mapStateToProps)(Homepage)