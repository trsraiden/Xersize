import React from 'react';

export default function Home(props) {
    return(
        <div className='container'>
            <p>Hi {props.user}!</p>
            <p className='robotoSection' >Welcome to the Xersize web app!</p>
            <div className='appSection row'>
                <div className='homeSectionDiv col-md-4'>
                    <h2 className='markerSection' >Routines</h2>
                    <i className="homeIcon far fa-clipboard"></i>
                    <p className='robotoSection' >Create your own routine, or use one from the community to start a new session.</p>
                </div>
                <div className='homeSectionDiv col-md-4'>
                    <h2 className='markerSection' >Sessions</h2>
                    <i className="homeIcon fas fa-chart-line"></i>
                    <p className='robotoSection' >Track the results from you sessions to make sure you're getting results.</p>
                </div>
                <div className='homeSectionDiv col-md-4'>
                    <h2 className='markerSection' >Manage</h2>
                    <i className="homeIcon fas fa-users-cog"></i>
                    <p className='robotoSection' >Change your password or delete your account.</p>
                </div>
            </div>
        </div>
    )
}