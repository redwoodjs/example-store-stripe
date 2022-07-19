import { useEffect, useRef } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, TextField, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import Button from 'src/components/Button'

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth()

  const usernameRef = useRef()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.envelope.to[0]
      )
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Forgot Password" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Forgot Password
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="text-left">
                    <Label
                      name="username"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      Email
                    </Label>
                    <TextField
                      name="username"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      ref={usernameRef}
                      validation={{
                        required: true,
                      }}
                    />

                    <FieldError name="username" className="rw-field-error" />
                  </div>

                  <Button>Submit</Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
