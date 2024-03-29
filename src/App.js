import React, { Component } from 'react';
import Logo from './components/Logo/Logo';
import PhotoFinder from './components/PhotoFinder/PhotoFinder';
import Photos from './components/Photos/Photos';

import './App.css';

const initialState = {
  camera: null,
  sol: 1,
  maxSol: 2446,
  photos: []
}

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onCameraChange = (event) => {
    let camera = event.target.value;
    if (false === camera) {
      camera = null;
    }
    this.setState({camera: camera})
  }

  onSolChange = (event) => {
    let sol = event.target.value;
    if (sol > this.state.maxSol) {
      sol = this.state.maxSol;
    }
    if (sol < 1) {
      sol = 1;
    }
    this.setState({'sol': sol});
  }

  onButtonSubmit = (event) => {
    fetch(`${apiUrl}/photos`,  {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        camera: this.state.camera,
        sol: this.state.sol
      })
    })
    .then(response => response.json())
    .then(response => {
      this.setState({photos: response});
    })
    .catch(console.log)
  }

  render() {
    const {maxSol, sol, photos} = this.state
    return (
      <div className="App">
        <div className="flex flex-column">
          <Logo />
          <PhotoFinder
            apiUrl={apiUrl}
            maxSol={maxSol}
            sol={sol}
            onSolChange={this.onSolChange}
            onButtonSubmit={this.onButtonSubmit}
            onCameraChange={this.onCameraChange} />
            <Photos photos={photos} />
        </div>
      </div>
    )
  }
}

export default App;
