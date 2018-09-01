import React, { Component } from 'react';
import './Container.css';

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {
      liste: [
        "1","2","3","4","5","6","7", "8", "9", "10"
      ],
      position : [],
    }
  }

  componentDidMount(){
    this.drawCircle();
  }

  update= (newListe) => {
    this.state.liste = newListe
    this.drawCircle();
  }

  next = () => {
    let newListe = [];
    for(let i = 0; i < this.state.liste.length; i++){
      let newIndex = i + 1;
      if (newIndex > this.state.liste.length - 1) {
        newIndex = 0
      }
      newListe.push(this.state.liste[newIndex]);
    }
    this.setState({
      liste : newListe
    }) 
    this.update(newListe);

  }

  previous = () => {
    let newListe = [];
    for(let i = 0; i < this.state.liste.length; i++){
      let newIndex = i - 1;
      if (newIndex < 0) {
        newIndex = this.state.liste.length -1
      }
      newListe.push(this.state.liste[newIndex]);
    }
    this.update(newListe);
  }

  drawCircle = () => {
    let nodeNumbers = this.state.liste.length;
    let element = this.state.liste;
    let circleRadius = 300;
    let circleWidth = circleRadius * 2 ; 
    let circleheight = circleRadius * 2 ; 
    let angle;
    let x;
    let y;
    let newPosition = [];

   
    for (let i=0 ; i < nodeNumbers ; i++){
      angle = (i / (nodeNumbers/2)) * Math.PI;
      x = (circleRadius * Math.cos(angle)) + (circleWidth / 2);
      y = (circleRadius * Math.sin(angle)) + (circleheight / 2);
      element = this.state.liste[i];
      
      newPosition.push({element, x, y });
    }  

    this.setState({
      position:newPosition
    })

  }

  render() {  
    return (
      <div className="Container">
         <div className="button">
          <button onClick={this.previous}>previous</button>
          <button onClick={this.next}>next</button>
        </div> 


        <svg height="600" width="620">
          <circle cx="300" cy="300px" r="300" fill="#f7f7f7"/>
         {this.state.position.map((item, key) => {
          return <text key={key} x={item.x} y={item.y}>{item.element}</text>
          })}
        </svg>
      </div>
    );
  }
}

export default Container;