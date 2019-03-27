import PropTypes from "prop-types"
import React from "react"
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import axios from "axios"

const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
class GoogleSuggest extends React.Component {
    state = {
        search: "",
        value: "",
        temperature_array: null
    }

    handleInputChange(e) {
        this.setState({search: e.target.value, value: e.target.value})
    }

    async handleSelectSuggest(suggest) {
        var lat = suggest.geometry.location.lat();
        var long= suggest.geometry.location.lng();

        let res = await axios.get(
            // url
            // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`

        );
        var resp = res.data.list
        this.setState({search: "", value: suggest.formatted_address});

        this.props.getForecastWeather(res.data.list,lat,long);
    }

    render() {
        const {search, value} = this.state
        return (
            <ReactGoogleMapLoader
                params={{
                    key: API_KEY,
                    libraries: "places,geocode",
                }}
                render={googleMaps =>
                    googleMaps && (
                        <div>
                            <ReactGooglePlacesSuggest
                                autocompletionRequest={{input: search}}
                                googleMaps={googleMaps}
                                onSelectSuggest={this.handleSelectSuggest.bind(this)}
                            >
                                <input
                                    type="text"
                                    value={value}
                                    placeholder="Search a location"
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </ReactGooglePlacesSuggest>
                            <div>

                            </div>
                        </div>
                    )
                }
            />
        )
    }
}

GoogleSuggest.propTypes = {
    googleMaps: PropTypes.object,
}

export default GoogleSuggest