import React from 'react';


class Signin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('https://mysterious-hollows-09736.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id) {
        this.props.loadUser(user)
        this.props.onPageChange('home')
      }
    })

  }


  render() {
    return (
    <article className="mw6 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5">
      <main className="pa4 black-80">
        <fieldset id="sign_up" className="ba  b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Sign In</legend>
          <div className="mt3">
            <label className="fw6 db lh-copy f6 pl1" htmlFor="email-address" style={{display:'flex', justifyContent: 'flex-start'}}>Email:</label>
            <input 
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
            type="text" 
            name="name-address"  
            id="name-address" 
            onChange={this.onEmailChange}/>
          </div>
          <div className="mv3">
            <label className="fw6 db lh-copy f6 pl1" htmlFor="password" style={{display:'flex', justifyContent: 'flex-start'}}>Password:</label>
            <input 
            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
            type="password" 
            name="password"  
            id="password"
            onChange={this.onPasswordChange}/>
          </div>
        </fieldset>
        <div className="">
        <input 
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
          type="submit" 
          value="Sign in"
          onClick={this.onSubmitSignIn} />
        </div>
        <div className="lh-copy mt3">
          <div 
            className="f6 link dim black db pointer"
            onClick={() => this.props.onPageChange('register')}>Register</div>
        </div>
      </main>
    </article>

    );
  }
}

export default Signin;