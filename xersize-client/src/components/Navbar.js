import React, {useState} from 'react';
import {useUser} from '../contexts/UserSessionContext'
// import {Link, useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'


export default function Navigation(props){
    const [error, setError] = useState('')
    const {logout} = useUser()
    // const history = useHistory()
    
    async function handleLogout(){
        setError('')

        try{
            await logout()
            // created the memory leak
            // history.pushState('/')
        } catch{
            setError('Failed to log out')
        }

    }

    return(
        <nav className="sectionTitle navbarColour navbar navbar-expand-lg">
            {error && alert(error)}
            <Link to="/home" className="navWebTitle">Xersize</Link>
            <ul className="navbar-nav ml-auto">
                <li className="markerSection navbar-item">
                    <Link to="/routines" className="navLink">Routines</Link>
                </li>
                <li className="markerSection navbar-item">
                    <Link to="/sessions" className="navLink">Sessions</Link>
                </li>
                <li className="markerSection navbar-item">
                    <Link to="/manageAccount" className="navLink">Manage {props.user}</Link>
                </li>
                <li className="markerSection navbar-item">
                    <button variant='link' className="navLogoutButton navLink" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    )
    
}