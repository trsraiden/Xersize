import React, {useRef, useState} from 'react'
import {Container,Form, Alert} from 'react-bootstrap'
import {useUser} from '../contexts/UserSessionContext'
import {useHistory} from 'react-router-dom'

export default function ForgotPassword() {
  const emailRef = useRef()
  const {resetPassword} = useUser()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()


  async function handleSubmit(e){
    e.preventDefault()

    try{
      setMessage('')
      setLoading(true)
      setError('')
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions')
    } catch { 
      setError('Failed to reset password')
      setLoading(false)
    }
  }

  function handleLogin(){
    history.push('/')
  }

  function handleSignup(){
    history.push('/signup')
  }

  return (
      <div className='enterAppDiv markerSection' >
        <Container className='d-flex ' style={{maxWidth:'500px'}}>
            <div className='w-100'>
              <h2 className='w-100 text-center mt-2'>Reset Password</h2>
              {message && <Alert variant='success'>{message}</Alert>}
              {error && <Alert variant='danger'>{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                  <Form.Group id='emailAddress'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required/>
                  </Form.Group>
                  <button disabled={loading} className='generalButton w-100' type='submit'>Reset Password</button>
              </Form> 
          </div>
        </Container>
        <div className='w-100 text-center mt-2'>
          <p>Remember your password? <button disabled={loading} onClick={handleLogin} className='generalButton'>Login</button></p>
          <p>Don't have an account? <button disabled={loading} onClick={handleSignup} className='startButton'>Sign Up</button></p>          
        </div> 
      </div>
  )
}