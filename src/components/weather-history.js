import React, { Component } from "react";
import axios from "axios"
import moment from "moment"

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        var weather_history = [];
        for(var i = 1;i<8;i++)
        {
            var date = moment().subtract(i, 'days').format("YYYY-MM-DD").toString()
            let resp = await axios.get(
                `http://api.apixu.com/v1/history.json?key=${process.env.REACT_APP_APIXU_WEATHER_API_KEY}&q=${this.props.latitude},${this.props.longitude}&dt=${date}`
            );
            weather_history.push(resp.data.forecast.forecastday[0].day)
        }
        console.log(weather_history)
        // console.log(this.props)
    }

    render() {
        return (
            <p> Hi </p>
        )
    }
}

export default App;