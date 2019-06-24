import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    signup(name: $name, email: $email, password: $password, confirmPassword: $confirmPassword) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    name: '',
    email: '',
    password: '',
    // confirmPassword: ''
  }

  render() {
    const { login, name, email, password } = this.state
    return (
      <div>
        <h3>{login ? 'Login' : 'Sign Up'}</h3>
        <div>
          {!login && (
            <input
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Name"
            />
          )}
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Password"
            />
          {/* {!login && (
          <input
            value={confirmPassword}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Confirm Password"
          />
          )} */}
        </div>
        <div>
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ name, email, password }}
          onCompleted={data => this._confirm(data)}
        >
          {mutation => (
            <div onClick={mutation}>
              {login ? <button>Login</button> : <button>Register</button>}
            </div>
          )}
        </Mutation>
          <div
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? <button>Create an Account</button>
              : <button>Return to Login Page</button>}
          </div>
        </div>
      </div>
    )
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push('/')
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login