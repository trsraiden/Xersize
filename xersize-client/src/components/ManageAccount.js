import React from 'react';
import {Container} from 'react-bootstrap';
import {Link} from 'react-router-dom'


export default function ManageAccount() {

    return(
        <div className='markerSection container'>
            <h1>Manage Account</h1>
            <Container className='d-flex align-items-center justify-content-center' style={{maxWidth:'500px'}}>
                <div className='w-100'>
                    <Link to='/changepassword' className='w-100 generalButton'>Change Password</Link>
                    <Link to='/deleteaccount' className='w-100 deleteButton'>Delete Account</Link>
                </div>
            </Container>
        </div>
    )
}