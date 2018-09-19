import React, { Component } from 'react';
import Snap from 'snapsvg-cjs';

class Test extends Component {

  componentDidMount(){
    this.animTransform();
  }

  clicked = () => {
    let svg = Snap.select('#svg');
    let firstPath = Snap.select('#firstPath');
    let circle = svg.path("M 250, 200 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0");
    firstPath.animate({ d: circle }, 1000);  
  }

  

  render() {
    return (
    <div className="test">
      <svg id="svg" width="100%" height="50%" viewBox="0 0 500 500">
          <path id="firstPath" d="M266.094,78.14c0,0,32.751,3.333,50.084,70s20.708,60.667,38.041,86.667
            s68.688,109.999,6.688,175.333c-46,37.334-127.989,34.001-182.655,21.334s-85.328-71.335-67.328-137.334
            c19.333-48.667,40.669-66,53.336-91.333s16.668-58.667,25.334-79.333s21.167-40.667,36.5-45.333c0,0-29.499-4-39.499,0V34.807
            C186.594,34.807,258.844,19.474,266.094,78.14z" />
      </svg>
    </div>
    );
  }
}

export default Test;