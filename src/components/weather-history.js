import React, { Component } from "react";
import axios from "axios"
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from "moment"
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weather_report: '',
        };
    }

    async componentDidMount() {
        var weather_history = [];
        for(var i = 1;i<9;i++)
        {
            var date = moment().subtract(i, 'days').format("YYYY-MM-DD").toString()
            let resp = await axios.get(
                `http://api.apixu.com/v1/history.json?key=${process.env.REACT_APP_APIXU_WEATHER_API_KEY}&q=${this.props.latitude},${this.props.longitude}&dt=${date}`
            );
            var weather_report = {};
            // console.log(resp.data.forecast.forecastday[0].day)
            weather_report.date = date;
            weather_report.avghumidity = resp.data.forecast.forecastday[0].day.avghumidity;
            weather_report.avgtemp_c = resp.data.forecast.forecastday[0].day.avgtemp_c;
            weather_report.totalprecip_mm = resp.data.forecast.forecastday[0].day.totalprecip_mm;
            weather_history.push(weather_report)
        }
        await this.setState({weather_report: weather_history})
        // console.log(this.props)
    }

    render() {
        return (
            <div>
                {!this.state.weather_report &&
                    <CircularProgress className="loader"/>
                }
                {this.state.weather_report &&
                    <LineChart width={730} height={250} data={this.state.weather_report}
                               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="avgtemp_c" stroke="#8884d8" />
                        <Line type="monotone" dataKey="avghumidity" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="totalprecip_mm" stroke="#F08080" />
                    </LineChart>
                }
            </div>

        )
    }
}

export default App;