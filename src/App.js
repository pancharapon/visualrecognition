import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';


const ParticleOption = {
	particles: {
	  number: {
		  value: 60,
		  density: {
			  enable: true,
			  value_area: 800
		  }
	  },
	  line_linked: {
	  	enable_auto: true,
	  	distance: 120,
	  	color: '#061e6e',
	  	opacity: 0.4
	  }
	}
}

const resetState = {
  	input: '',
    imageUrl: '',
    box: '',
    page: 'signin',
    signIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}

class App extends Component {
  
  constructor() {
  	super()
  	this.state = {
  		input: '',
      imageUrl: '',
      box: '',
      page: 'signin',
      signIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }

  	}
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
  	this.setState({imageUrl: this.state.input})
    fetch('https://mysterious-hollows-09736.herokuapp.com/imageapi', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://mysterious-hollows-09736.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onPageChange = (page) => {
    if (page === 'home') {
      this.setState({signIn: true})
    }else {
      this.setState(resetState)
    }
    this.setState({page: page})
  }



  render() { 
    return (
  	  <div className='App'>
  	    <Particles 
          params={ParticleOption}
          className='Particle' />
  	    <Navigation onPageChange={this.onPageChange} signIn={this.state.signIn}/>
        { this.state.page === 'home'
          ? <div>
               <Logo />
               <Rank name={this.state.user.name} entries={this.state.user.entries}/>
               <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
               <FaceRecognition box={this.state.box}  imageUrl={this.state.imageUrl}/>
            </div>
          :  (
                this.state.page === 'signin'
                ?  <Signin loadUser={this.loadUser} onPageChange={this.onPageChange}/>
                :  <Register loadUser={this.loadUser} onPageChange={this.onPageChange}/>
             )
         
        }
  	  </div>
    );
  }
}

export default App;
