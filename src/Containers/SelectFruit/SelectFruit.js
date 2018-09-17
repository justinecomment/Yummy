import React, { Component } from 'react';
// import jsonFruits from '../../Assets/svgFruits.json';
import './SelectFruit.css';

class SelectFruit extends Component {
   state={
    liste: [],
    path: [],
    centerElement : 0,
    radiusCircle: 900,
    rotateItem: 90,
    rotateCircle : -90
  }

  componentDidMount() {
    this.drawCircle();
  }

  componentDidUpdate(){
    if (this.state.centerElement < 0){
      this.setState({
        centerElement: this.state.liste.length -1
      })
    } else if(this.state.centerElement > this.state.liste.length - 1){
      this.setState({
        centerElement : 0
      })  
    } 
  }

  next = () => {
    let newRotateCircle = this.state.rotateCircle -= 360 / this.state.liste.length;
    let newRotate = this.state.rotateItem += 360 / this.state.liste.length;
    let newCenterElement = this.state.centerElement += 1

    this.setState({
      rotateCircle: newRotateCircle,
      centerElement : newCenterElement,
      rotateItem: newRotate
    })
  }

  previous = () => {
    let newRotateCircle = this.state.rotateCircle += 360 / this.state.liste.length;
    let newRotate = this.state.rotateItem -= 360 / this.state.liste.length;
    let newCurrentElement = this.state.centerElement -= 1

    this.setState({
      rotateCircle: newRotateCircle,
      centerElement : newCurrentElement,
    })
   }

  drawCircle = (newListe) =>  {
    let reference;
    let circleRadius = this.state.radiusCircle;
    let circleSize = circleRadius * 2;
    let color;
    let stroke;
    let finalFruit = {};
    let svgPath = [];
    let angle = 0;
    let x;
    let y;
    let finalListe = [];

    if(this.state.liste.length <= 0){
      reference = this.props.item;
    } else{
      reference = newListe;
    }

    for (let i in reference) {
      color = reference[i].color;

      if(reference[i].stroke){
        stroke = reference[i].stroke;
      }
      
      svgPath = reference[i].svgPath;
      angle = (i / ( reference.length / 2)) * Math.PI;
      x = (circleRadius * Math.cos(angle)) + (circleSize / 2);
      y = (circleRadius * Math.sin(angle)) + (circleSize / 2);
      finalFruit = {svgPath, color,stroke, x, y, angle};
      finalListe.push(finalFruit);
      finalListe.concat(finalFruit)
    }

    this.setState({
      liste : finalListe
    })
  }

  render() {
    let animRotate = {
      transform: `rotate(${this.state.rotateCircle}deg)`,
      transformOrigin: "60% 60%",
      transition: '1s'
    }
    let rotateItem={
      transform: `rotate(${this.state.rotateItem}deg)`,
      transformOrigin: '50% 50%',
      transition: '1s',
    }
    let buttons = {
      zIndex: 2,
      cursor: 'pointer',
    }

    return (
      <svg className="SelectFruit" height="600" width="600" viewBox="0 0 600 600"> 
        <g className="firstCircle" style={animRotate}>
          {this.state.liste.map((item, key) => {  
            let color = "#D0D0D0";
            let pathComplet = [];
            let stroke= item.stroke;

            if (key === this.state.centerElement) {
              color = item.color;
            }
            
            for (let index in item.svgPath) {
              let path = (
                <path fill={color} stroke={stroke} stroke-width="6" d={item.svgPath[index].d} key={index} />
              );
              pathComplet.push(path);
            }

            return (
              <g key={key} transform={`scale(0.3) translate(${item.x},${item.y})`}>
                <g style={rotateItem}>
                  {pathComplet}
                </g>
              </g>
            );
          })} 
        </g>

        <g className="button" style={buttons}>
          <rect onClick={this.next} className="next" x="0%" y="0" width="50%" height="47%" fill="transparent"></rect>
          <rect onClick={this.previous} className="previous" x="50%" y="0" width="50%" height="47%" fill="transparent"></rect>
        </g>

      </svg> 
    );
  }
}

export default SelectFruit;