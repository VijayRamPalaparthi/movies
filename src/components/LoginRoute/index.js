import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginRoute extends Component {
  state = {showError: false, errorMsg: '', username: '', password: ''}

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  submitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({errorMsg, showError: true})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const fetchedData = await fetch(url, options)
    const data = await fetchedData.json()
    if (fetchedData.ok) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
    console.log(fetchedData)
  }

  render() {
    const {showError, errorMsg, username, password} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <img
          src="https://res.cloudinary.com/djlwgb6z2/image/upload/v1704261345/Movies%20Mini%20Projects/Group_7399_bzwfor.png"
          className="login-logo"
          alt="login website logo"
        />
        <div className="card-container">
          <div className="login-card">
            <h1 className="login-heading">Login</h1>
            <form className="form-container" onSubmit={this.onFormSubmit}>
              <div className="input-container">
                <label htmlFor="username" className="label">
                  USERNAME
                </label>
                <input
                  type="text"
                  className="input"
                  id="username"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-container">
                <label htmlFor="password" className="label">
                  PASSWORD
                </label>
                <input
                  type="password"
                  className="input"
                  id="password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              {showError && <p className="error-msg"> {errorMsg} </p>}
              <button className="login-button" type="submit">
                {' '}
                Login{' '}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginRoute
