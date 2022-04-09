import { useRef } from 'react'
import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  EmailField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const LoginPage = () => {
  const { logIn } = useAuth()

  const usernameRef = useRef()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await logIn({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <MetaTags title="Login" />
      <main>
        <Form onSubmit={onSubmit}>
          <Label
            name="username"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Email address
          </Label>
          <EmailField
            name="username"
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            ref={usernameRef}
            validation={{
              required: {
                value: true,
                message: 'Email address is required',
              },
            }}
          />

          <FieldError name="username" className="rw-field-error" />

          <Label
            name="password"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Password
          </Label>
          <PasswordField
            name="password"
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            autoComplete="current-password"
            validation={{
              required: {
                value: true,
                message: 'Password is required',
              },
            }}
          />

          <div className="rw-forgot-link">
            <Link to={routes.forgotPassword()} className="rw-forgot-link">
              Forgot Password?
            </Link>
          </div>

          <FieldError name="password" className="rw-field-error" />

          <div className="rw-button-group">
            <Submit className="rw-button rw-button-blue">Login</Submit>
          </div>
        </Form>
        <p>
          Don&apos;t have an account?{' '}
          <Link to={routes.signup()} className="rw-link">
            Sign up!
          </Link>
        </p>
      </main>
    </>
  )
}

export default LoginPage
