import React, {useRef, useState} from 'react'
import {Container,Form, Alert} from 'react-bootstrap'
import {useUser} from '../contexts/UserSessionContext'
import {Link} from 'react-router-dom'


export default function DeleteAccount(props) {
    const emailRef = useRef()
    const emailConfirmRef = useRef()
    const {deleteAccount} = useUser()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    async function handleSubmit(e){
        e.preventDefault()
        setError('')

        if (emailRef.current.value !== emailConfirmRef.current.value){
            return setError('Emails do not match')
        }

        if (emailRef.current.value !== props.user){
            return setError('Email address entered does not match the current logged in user.')
        }

        setLoading(true)

        try{
            await deleteAccount()
        }catch (error){
            setError(error.message)
            setLoading(false)
        }
        
    }

    return (
        <div className='markerSection'>
            <Container className='d-flex align-items-center justify-content-center' style={{maxWidth:'500px'}}>
                <div className='w-100'>
                    <h2 className='w-100 text-center mt-2'>Delete Account</h2>
                    <div className='notices'>
                        <p>*Permanently erases all your app information and cannot be undone.*</p>
                        {error && <Alert variant='danger'>{error}</Alert>}
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' ref={emailRef} />
                        </Form.Group>
                        <Form.Group id='passwordConfirm'>
                        <Form.Label>Confirm Email Address</Form.Label>
                        <Form.Control type='email' ref={emailConfirmRef} />
                        </Form.Group>
                        <button disabled={loading} className='generalButton w-100' type='submit'>Delete Account</button>
                    </Form>
                </div>
            </Container>
            <Container className='d-flex align-items-center justify-content-center' style={{maxWidth:'500px'}}>
                <Link className='deleteButton w-100' to='/manageaccount'>Cancel</Link> 
            </Container>
        </div>
    )
}
