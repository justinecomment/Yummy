import React, { Component } from 'react';
import './Container.css';
import SelectFruit from '../SelectFruit/SelectFruit';

class Container extends Component {

  render() {
    return (
      <div className="Container">
        <svg width="600" height ="300" viewBox="0 300 600 1">
          <SelectFruit />
        </svg>
        <svg width="600" height ="300" viewBox="0 300 600 1">
          <SelectFruit />
        </svg>
        <svg width="600" height ="300" viewBox="0 300 600 1">
          <SelectFruit />
        </svg>

        <svg height="100%" width="600" className="rondBlanc">
          <circle cx="300" cy="450" r="400" fill="#fff" />
        </svg>

      </div>
    );
  }
}

export default Container;