import React, { Component } from 'react';
import './Container.css';
import SelectFruit from '../SelectFruit/SelectFruit';
import JsonFruits from '../../Assets/svgFruits.json';
import JsonGlass from '../../Assets/svgGlass.json';

class Container extends Component {

  render() {
    return (
      <div className="Container">
        <svg width="100%" height ="100%" viewBox="30 0 600 200">
          <SelectFruit item={JsonFruits} />
        </svg>
        <svg width="100%" height ="100%" viewBox="30 0 600 200">
          <SelectFruit item={JsonFruits} />
        </svg>
        <svg width="100%" height ="100%" viewBox="30 0 600 200">
          <SelectFruit item={JsonFruits} />
        </svg>

        <svg width="100%" height ="100%" viewBox="30 0 600 200">
          <SelectFruit item={JsonGlass} />
        </svg>

        <svg height="100%" width="100%" className="rondBlanc">
          <circle cx="50%" cy="450" r="400" fill="#fff" />
        </svg>
      </div>
    );
  }
}

export default Container;