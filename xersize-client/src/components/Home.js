import React from 'react';

export default function Home(props) {
    return(
        <div className='container'>
            <h1>Hi {props.user}!</h1>
            <span className='robotoSection' >Welcome to the Xersize Tracker web app!</span>
            <div className='appSection row'>
                <div className='homeSectionDiv col-sm-4'>
                    <h2 className='markerSection' >Sessions</h2>
                    <i className="homeIcon fas fa-chart-line"></i>
                    <p className='robotoSection' >Track your progress to make sure you're getting results.</p>
                </div>
                <div className='homeSectionDiv col-sm-4'>
                    <h2 className='markerSection' >Routines</h2>
                    <i className="homeIcon far fa-clipboard"></i>
                    <p className='robotoSection' >Discover routines created by other users or create your own!</p>
                </div>
                <div className='homeSectionDiv col-sm-4'>
                    <h2 className='markerSection' >Manage</h2>
                    <i className="homeIcon fas fa-users-cog"></i>
                    <p className='robotoSection' >Change your password or delete your account.</p>
                </div>
            </div>
        </div>
    )
}