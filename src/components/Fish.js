import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers.js";

class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  };
  handleClick = () => {
    this.props.addToOrder(this.props.index);
  };

  render() {
    const { image, name, price, desc, status } = this.props.details;

    const isAvailabe = status === "available";
    console.log(isAvailabe);
    return (
      <div className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">{name}</h3>
        <span className="price">{formatPrice(price)}</span>
        <p>{desc}</p>
        <button disabled={!isAvailabe} onClick={this.handleClick}>
          {isAvailabe ? "Add to Order" : "Sold out!"}
        </button>
      </div>
    );
  }
}

export default Fish;
