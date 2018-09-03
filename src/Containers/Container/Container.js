import React, { Component } from 'react';
import './Container.css';
import jsonsvg from '../../Assets/svgFruits.json';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liste: [],
      position: [],
      radiusCircle: 1000
    }
  }

  paths() {
    let allPaths = [];
    for (let svg in jsonsvg) {
      let fruits = jsonsvg[svg].svgPath;
      let d = [];
      for (let index in fruits) {
        let result = fruits[index];
        d.push(result)
      }
      allPaths.push(d);
    }
    this.state.liste = allPaths;
  }

  componentDidMount() {
    this.paths();
    this.drawCircle();
  }

  update = (newListe) => {
    this.state.liste = newListe
    this.drawCircle();
  }

  next = () => {
    let newListe = [];
    for (let i = 0; i < this.state.liste.length; i++) {
      let newIndex = i + 1;
      if (newIndex > this.state.liste.length - 1) {
        newIndex = 0
      }
      newListe.push(this.state.liste[newIndex]);
    }
    this.setState({
      liste: newListe
    })
    this.update(newListe);
  }

  previous = () => {
    let newListe = [];
    for (let i = 0; i < this.state.liste.length; i++) {
      let newIndex = i - 1;
      if (newIndex < 0) {
        newIndex = this.state.liste.length - 1
      }
      newListe.push(this.state.liste[newIndex]);
    }
    this.update(newListe);
  }

  drawCircle = () => {
    let nodeNumbers = this.state.liste.length;
    let element = this.state.liste;
    let circleRadius = this.state.radiusCircle;
    let circleWidth = circleRadius * 2;
    let circleheight = circleRadius * 2;
    let angle;
    let x;
    let y;
    let newPosition = [];

    for (let i = 0; i < nodeNumbers; i++) {
      angle = (i / (nodeNumbers / 2)) * Math.PI;
      x = (circleRadius * Math.cos(angle)) + (circleWidth / 2);
      y = (circleRadius * Math.sin(angle)) + (circleheight / 2);
      let indexCenter = jsonsvg[jsonsvg.length -2].id;
      let color = jsonsvg[i].color;     
      element = this.state.liste[i];
      
      newPosition.push({ element, x, y, indexCenter, color});
    }
    this.setState({
      position: newPosition
    })
  }

  render() {
    return (
      <div className="Container">
        <div className="button">
          <button onClick={this.previous}>
            <i className="fas fa-caret-left"></i>
          </button>
          <button onClick={this.next}>
            <i className="fas fa-caret-right"></i>
          </button>
        </div>

        <svg height="600" width="600">
          <circle cx="300" cy="500" r="400" fill="#fff" />
          <g className="firstCircle">
            {this.state.position.map((item, key) => {
              let x = item.x;
              let y = item.y;
              let color = "#D0D0D0";
              let newColor = item.color;
              console.log(item);
              

              if(key === item.indexCenter){
                color = newColor;
                console.log(item);
              }

              for (let elt in item) {
                let pathComplet = [];
                for(let index in item[elt]){
                  let path = <path fill={color} d={item[elt][index].d} key={index} />
                  pathComplet.push(path);
                }
                return (
                  <g key={key} transform={`scale(0.3) translate(${x},${y})`}>
                    {pathComplet}
                  </g>
                );
              }
            })}
          </g>
        </svg>
      </div>
    );
  }
}

export default Container;