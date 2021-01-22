import React, {useRef, useState, useEffect} from 'react'
import {Container,Form, Alert} from 'react-bootstrap'
import {useUser} from '../contexts/UserSessionContext'
import {useHistory} from 'react-router-dom'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const {login, googleLogin, currentUser} = useUser()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  useEffect(()=> {
    if (currentUser){
      window.location = '/home'
    }
  }, [currentUser])

  async function handleSubmit(e){
    e.preventDefault()

    try{
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('/home')
    } catch { 
      setError('Failed to sign in')
      setLoading(false)
    }
  }

  async function handleGoogleLogin(e){
    e.preventDefault()

    try{
      setError('')
      setLoading(true)
      await googleLogin()
      history.push('/home')
    } catch { 
      setError('Failed to sign in')
      setLoading(false)
    }
  }

  function handleReset() {
    history.push('/forgotpassword')
  }

  function handleSignup() {
    history.push('/signup')
  }

  return (
    <div className='welcomeDisplay markerSection'>
        <div className='col-md-5' >
              <div>
                  <h1 className='welcomeWebTitle robotoSection' >Xersize</h1>
              </div>

              <div className='welcomeGreetingDiv'>
                  <p className='welcomeWebGreeting' >Start tracking your journey today!</p>
              </div>                
        </div>
        <div className='enterAppDiv col-md-7' >
        <Container className='d-flex align-items-center justify-content-center' style={{maxWidth:'500px'}}>
            <div className='w-100'>
              <h2 className='w-100 text-center mt-2'>Log In</h2>
              {error && <Alert variant='danger'>{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                  <Form.Group id='emailAddress'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required/>
                  </Form.Group>
                  <Form.Group id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} required/>
                  </Form.Group>
                  <button disabled={loading} className='generalButton w-100' type='submit'>Log In</button>
              </Form> 
              <button disabled={loading} onClick={handleGoogleLogin} className='deleteButton w-100'>Google Login</button>
          </div>
        </Container>
        <div className='w-100 text-center mt-2'>
          <p>Forgot your password? <button disabled={loading} onClick={handleReset} className='generalButton'>Reset</button></p>
          <p>Don't have an account? <button disabled={loading} onClick={handleSignup} className='startButton'>Sign Up</button></p>
        </div> 
        </div>
      </div>
  )
}
