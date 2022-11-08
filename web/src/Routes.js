// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { StripeProvider } from 'redwoodjs-stripe/web'

import { useAuth } from '@redwoodjs/auth'
import { Router, Route, Set } from '@redwoodjs/router'

import AuthRedirect from 'src/components/AuthRedirect'
import MainLayout from 'src/layouts/MainLayout'

const Routes = () => {
  const { currentUser } = useAuth()
  console.log('CURRENT USER: ', currentUser)
  return (
    <Router>
      <Route path="/stripe-demo" page={StripeDemoPage} name="stripeDemo" />
      <Set wrap={[StripeProvider, MainLayout]} customer={{ search: '' }}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/success" page={SuccessPage} name="success" />
        <Route path="/failure" page={FailurePage} name="failure" />

        <Set wrap={AuthRedirect}>
          <Route path="/login" page={LoginPage} name="login" />
          <Route path="/signup" page={SignupPage} name="signup" />
          <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
          <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        </Set>
      </Set>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
