import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleSuggest from "./components/google-places-search";
import ForeCast from "./components/forecast"
import WeatherHistory from "./components/weather-history"

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weather_report: '',
            latitude: '',
            longitude: '',
            displayHistoricWeather: false
        };
        this.getForecastWeather = this.getForecastWeather.bind(this);
        this.showWeatherHistory = this.showWeatherHistory.bind(this);
    }
    getForecastWeather = async (weather_report,latitude,longitude) => {
        await this.setState(
            {weather_report: weather_report, latitude: latitude, longitude:longitude});
    };

    showWeatherHistory = async () => {
        await this.setState({displayHistoricWeather: !this.state.displayHistoricWeather})
        // console.log(this.state)
    }
  render() {
    return (
      <div className="App">
          <GoogleSuggest
              getForecastWeather={this.getForecastWeather}
          />

          {this.state.weather_report &&
              <ForeCast
                  weather_report={this.state.weather_report}
                  showWeatherHistory = {this.showWeatherHistory}
              />
          }
          {this.state.displayHistoricWeather &&
              <WeatherHistory
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}

              />
              }
      </div>
    );
  }
}

export default App;
