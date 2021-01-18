import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useUser} from '../contexts/UserSessionContext'
import Navigation from './Navbar'

export default function PrivateRoute({component: Component, ...rest}) {
    const {currentUser, setActiveID, getActiveID} = useUser()
    const user = currentUser

    return (
        <Route {...rest} render={props => {
            return currentUser ? 
            <div className='navigationDiv'>
                <Navigation/>
                <hr className='navigationHR'></hr>
                <Component 
                    uid={user.uid}
                    user={user.email} 
                    setActiveID={setActiveID}
                    getActiveID={getActiveID}
                    {...props}
                />
            </div> : <Redirect to='/'/>
        }}>

        </Route>
    )
}
