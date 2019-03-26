import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleSuggest from "./components/google-places-search";

console.log(process.env.REACT_APP_GOOGLE_PLACES_API_KEY);

class App extends Component {
  render() {
    return (
      <div className="App">
          <GoogleSuggest/>

      </div>
    );
  }
}

export default App;
