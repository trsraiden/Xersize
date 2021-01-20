import React, {useRef, useState} from 'react'
import {Container, Form, Alert} from 'react-bootstrap'
import {useUser} from '../contexts/UserSessionContext'
import {Link} from 'react-router-dom'

export default function ChangePassword() {
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {updatePassword} = useUser()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    // function handleSubmit(e){
    //     e.preventDefault()

    //     if (passwordRef.current.value !== passwordConfirmRef.current.value){
    //     return setError('Passwords do not match')
    //     }

    //     const promises = []
    //     setLoading(true)
    //     setSuccess('')
    //     setError('')

    //     if (passwordRef.current.value){
    //         promises.push(updatePassword(passwordRef.current.value))
    //     }

    //     Promise.all(promises)
    //         .then(() => {
    //             setSuccess('Successfully updated your password')
    //         })
    //         .catch(() => {
    //             setError('Failed to make updates')
    //         })
    //         .finally(() => {
    //             setLoading(false)
    //         })
    // }

    async function handleSubmit(e){
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
        return setError('Passwords do not match')
        }

        setLoading(true)
        setSuccess('')
        setError('')

        try{
            await updatePassword(passwordRef.current.value)
            setSuccess('Password Updated')
        }catch(error){
            setError(error.message)
            setLoading(false)
        }
    }

    return (
        <div className='markerSection'>
            <Container className='d-flex align-items-center justify-content-center' style={{maxWidth:'500px'}}>
                <div className='w-100'>
                    <h2 className='w-100 text-center mt-2'>Change Password</h2>
                    <div className='notices'>
                        {success && <Alert variant='success'>{success}</Alert>}
                        {error && <Alert variant='danger'>{error}</Alert>}
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='password'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} />
                        </Form.Group>
                        <Form.Group id='passwordConfirm'>
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} />
                        </Form.Group>
                        <button disabled={loading} className='generalButton w-100' type='submit'>Submit Changes</button>
                    </Form>
                </div>
            </Container>
            <Container className='d-flex align-items-center justify-content-center' style={{maxWidth:'500px'}}>
                <Link className='deleteButton w-100' to='/manageaccount'>Cancel Changes</Link> 
            </Container>
        </div>
    )
}
  
