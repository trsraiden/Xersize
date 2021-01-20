import React, {useRef, useState} from 'react'
import {Container,Form, Alert} from 'react-bootstrap'
import {useUser} from '../contexts/UserSessionContext'
import {Link, useHistory} from 'react-router-dom'


export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {signup} = useUser()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e){
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Failed to create an account: Password and confirmation password do not match')
    }
    
    try{
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push('/home')
    } catch (error) { 
      console.log(error.message)
      setError('Failed to create an account: '  +error.message)
      setLoading(false)
    }
    //created the memory leak
    // setLoading(false)
  }

    return (
        <div className='enterAppDiv markerSection'>
          <Container className='d-flex' style={{maxWidth:'500px'}}>
              <div className='w-100'>
                <h2 className='w-100 text-center mt-2'>Sign Up</h2>
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
                    <Form.Group id='passwordConfirm'>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type='password' ref={passwordConfirmRef} required/>
                    </Form.Group>
                    <button disabled={loading} className='generalButton w-100' type='submit'>Sign Up</button>
                </Form>
            </div>
          </Container>
          <div className='w-100 text-center mt-2'>
              Already have an account? <Link className='navLink' to='/' >Log In</Link>
          </div> 
        </div>
    )
}
