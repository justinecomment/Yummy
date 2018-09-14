import React, { Component } from 'react';
import jsonFruits from '../../Assets/svgFruits.json';
import './SelectFruit.css';

class SelectFruit extends Component {
   state={
    liste: [],
    path: [],
    radiusCircle: 700,
    degres : -90,
    centerElement : 0,
    rotate: 90
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
    let newDegres = this.state.degres -= 45;
    let newRotate = this.state.rotate += 45;
    let newCurrentElement = this.state.centerElement += 1

    this.setState({
      degres: newDegres,
      centerElement : newCurrentElement,
      rotate: newRotate
    })
  }

  previous = () => {
    let newDegres = this.state.degres += 45;
    let newRotate = this.state.rotate -= 45;
    let newCurrentElement = this.state.centerElement -= 1

    this.setState({
      degres: newDegres,
      centerElement : newCurrentElement,
    })
   }

  drawCircle = (newListe) =>  {
    let reference;
    let circleRadius = this.state.radiusCircle;
    let circleSize = circleRadius * 2;
    let color;
    let finalFruit = {};
    let svgPath = [];
    let angle = 0;
    let initialX = 0;
    let initialY = 0;
    let x;
    let y;
    let finalListe = [];

    if(this.state.liste.length <= 0){
      reference = jsonFruits;
    } else{
      reference = newListe;
    }

    for (let i in reference) {
      if(reference[i].x){
        initialX = reference[i].x
      }
      if(reference[i].y){
        initialY = reference[i].y
      }
      color = reference[i].color;
      svgPath = reference[i].svgPath;
      angle = (i / ( reference.length / 2)) * Math.PI;
      x = (circleRadius * Math.cos(angle)) + (circleSize / 2);
      y = (circleRadius * Math.sin(angle)) + (circleSize / 2);
      finalFruit = {svgPath, color, initialX, initialY, x, y};
      finalListe.push(finalFruit);
      finalListe.concat(finalFruit)
      
    }

    this.setState({
      liste : finalListe
    })
  }

  render() {
    let animRotate = {
      transform: `rotate(${this.state.degres}deg)`,
      transformOrigin: "50% 50%",
      transition: '1s',
    }
    let rotateItem={
      transform: `rotate(${this.state.rotate}deg)`,
      transformOrigin: '50% 50%',
      transition: '1s',
    }
    let buttons = {
      zIndex: 2,
      cursor: 'pointer',
    }

    return (
      <svg className="SelectFruit" height="600" width="600" viewBox="0 -200 600 600"> 
        {/* <circle cx="300" cy="500" r="400" fill="#fff" />  */}
        <g className="firstCircle" style={animRotate}>
          {this.state.liste.map((item, key) => {  
            let color = "#D0D0D0";
            let pathComplet = [];
            
            if (key === this.state.centerElement) {
              color = item.color;
            }
            
            for (let index in item.svgPath) {
              let path = (
                <path fill={color} d={item.svgPath[index].d} key={index} />
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