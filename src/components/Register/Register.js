import React from 'react';


class Register extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      email: ''

    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onSubmitRegister = () => {
    fetch('https://mysterious-hollows-09736.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user)
        this.props.onPageChange('home')
      }
    })
  }


	render() {
    return (
	  <article className="mw6 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5">
	    <main className="pa4 black-80">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 pl1" htmlFor="text" style={{display:'flex', justifyContent: 'flex-start'}}>Name:</label>
                <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
                type="text" 
                name="name-address"  
                id="name-address"
                onChange={this.onNameChange} />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6 pl1" htmlFor="password" style={{display:'flex', justifyContent: 'flex-start'}}>Password:</label>
                <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
                type="password" 
                name="password"  
                id="password"
                onChange={this.onPasswordChange} />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6 pl1" htmlFor="email-address" style={{display:'flex', justifyContent: 'flex-start'}}>Email:</label>
                <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
                type="email" 
                name="email-address"  
                id="email-address"
                onChange={this.onEmailChange} />
              </div>
            </fieldset>
            <div className="">
            <input 
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Register"
              onClick={this.onSubmitRegister} />
            </div>
            <div className="lh-copy mt3">
              <div 
                className="f6 link dim black db pointer"
                onClick={() => this.props.onPageChange('signin')}>Signin</div>
            </div>
        </main>
      </article>

	  )
  }
}

export default Register;