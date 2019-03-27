import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleSuggest from "./components/google-places-search";
import ForeCast from "./components/forecast"

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weather_report: '',
        };
        this.getForecastWeather = this.getForecastWeather.bind(this);
    }
    getForecastWeather = (weather_report) => {
        console.log(weather_report)
        this.setState({weather_report: weather_report});
    };
  render() {
    return (
      <div className="App">
          <GoogleSuggest
              getForecastWeather={this.getForecastWeather}
          />

          {this.state.weather_report &&
              <ForeCast
                  weather_report={this.state.weather_report}
              />
          }

      </div>
    );
  }
}

export default App;
