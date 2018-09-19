import React, { Component } from 'react';
import './Container.css';
import SelectItem from '../SelectItem/SelectItem';
import JsonFruits from '../../Assets/svgFruits.json';
import JsonGlass from '../../Assets/svgGlass.json';

class Container extends Component {

  state={
    clicked: false
  }

  clicked = () => {
    this.setState({
      clicked: true
    })
  }

  render() {
    let clicked1 = null;
    let clicked2 = null;
    let clicked3 = null;
    if(this.state.clicked){
      clicked1= "click1";
      clicked2= "click2";
      clicked3= "click3";
    }

    return (
      <div className="Container">
        <svg id="monsvg1" width="100%" height ="100%" viewBox="30 -30 600 250">
          <SelectItem item={JsonFruits} clicked={clicked1} />
        </svg>
         <svg id="monsvg2" width="100%" height ="100%" viewBox="30 -30 600 250">
          <SelectItem item={JsonFruits} clicked={clicked2} />
        </svg>
        <svg id="monsvg3"width="100%" height ="100%" viewBox="30 -30 600 250">
          <SelectItem item={JsonFruits} clicked={clicked3} />
        </svg>

        <svg id="monsvg" width="100%" height ="100%" viewBox="30 -50 600 250">
          <SelectItem item={JsonGlass} />
        </svg> 

        <button onClick={this.clicked}>click</button>

        <svg height="100%" width="100%" className="rondBlanc">
          <circle cx="50%" cy="450" r="400" fill="#fff" />
        </svg>
      </div>
    );
  }
}

export default Container;