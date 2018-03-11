import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "./base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  // validation - Video 23
  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    // 1. reinstat our local storage
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. set the new fishes object to state
    this.setState({
      fishes // same as fishes: fishes. ES6 provides this shorthand
    });
  };

  updateFish = (key, updatedFish) => {
    // 1. take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. update that state
    fishes[key] = updatedFish;
    // 3. set that to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. make copy of state
    const fishes = { ...this.state.fishes };
    // 2. update state
    fishes[key] = null;
    // 3. set state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = key => {
    // 1. take a copy of the current state
    const order = { ...this.state.order };
    // 2. update order
    order[key] = order[key] + 1 || 1;
    // 3. setState
    this.setState({ order });
  };

  removeFromOrder = key => {
    // 1. make copy of state
    const order = { ...this.state.order };
    // 2. remove item from order
    delete order[key]; // I can use delete here since I'm not mirroring this to firebase
    // 3. set state
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="kilinkis" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
