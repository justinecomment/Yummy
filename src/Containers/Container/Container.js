import React, { Component } from 'react';
import './Container.css';
import jsonFruits from '../../Assets/svgFruits.json';

class Container extends Component {
   state={
    liste: [],
    path: [],
    radiusCircle: 800,
    degres : -90,
    centerElement : 0
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
    // let newListe = [];

    let newDegres = this.state.degres -= 45
    this.setState({
      degres: newDegres,
      centerElement :this.state.centerElement += 1
    })

    // for (let i = 0; i < this.state.liste.length; i++) {
    //   let newIndex = i + 1;
    //   if (newIndex > this.state.liste.length - 1) {
    //     newIndex = 0
    //   }
    //   newListe.push(this.state.liste[newIndex]);
    // }
    // this.update(newListe);
  }

  previous = () => {
    // let newListe = [];

    let newDegres = this.state.degres += 45
    this.setState({
      degres: newDegres,
      centerElement : this.state.centerElement -= 1
    })
    
    // for(let i = 0; i < this.state.liste.length; i++){
    //   let newIndex = i - 1;
    //   if (newIndex < 0) {
    //     newIndex = this.state.liste.length -1
    //   }
    //   newListe.push(this.state.liste[newIndex]);
    // }

    // this.update(newListe);
  }

  // update = (newListe) => {
  //   this.setState({
  //     liste : newListe,
  //     anim : true
  //   })
    
  //   this.drawCircle(newListe);
  // }

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
      transformOrigin: '50% 50%',
      transition: '1s'
    }

    return (
      <div className="Container">
        <div className="button">
          <button onClick={this.next}>
            <i className="fas fa-caret-left"></i>
          </button>
          <button onClick={this.previous}>
            <i className="fas fa-caret-right"></i>
          </button>
        </div>

        <svg height="600" width="600">
          <circle cx="300" cy="500" r="400" fill="#fff" />
          <g className="firstCircle" style={animRotate}>
            {this.state.liste.map((item, key) => {  
              let color = "#D0D0D0";
              let pathComplet = [];
              
              if (key === this.state.centerElement) {
                color = item.color;
              }
              
              for(let index in item.svgPath){
                let path = (
                  <path fill={color} d={item.svgPath[index].d} key={index} />
                );
                pathComplet.push(path);
              }

              return (
                <g key={key} transform={`scale(0.3) translate(${item.x},${item.y})`} >
                  <g id="monGroup" className="monstyle">
                  {pathComplet}
                  </g>
                </g>
              );
            })} 
          </g>
        </svg>
      </div>
    );
  }
}

export default Container;