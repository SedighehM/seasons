import React from "react";
import ReacDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
import './style/App.css'

class App extends React.Component {
  state = {
    lat: null,
    errorMessage: "",
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
        });
      },
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  }
  renderContent() {
    if (this.state.lat && !this.state.errorMessage) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    if (!this.state.lat && this.state.errorMessage) {
      return <div>Error:{this.state.errorMessage}</div>;
    }
    return <Spinner message="Please accept the location request" />;
  }
  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}
ReacDOM.render(<App />, document.querySelector("#root"));
