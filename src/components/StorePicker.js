import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef();
  static propTypes = {
    history: PropTypes.object
  };

  goToStore = e => {
    e.preventDefault();
    const storeName = this.myInput.value.value;
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a Store</h2>
        <input
          required
          type="text"
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={this.myInput}
        />
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}

export default StorePicker;