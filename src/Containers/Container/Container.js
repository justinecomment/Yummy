import React, { Component } from 'react';
import './Container.css';
import Pomme from '../../Assets/images/pomme.png';
import Poire from '../../Assets/images/poire.png';
import Fraise from '../../Assets/images/fraise.png';
import Banane from '../../Assets/images/banane.png';
import Kiwi from '../../Assets/images/kiwi.png';
import Cerise from '../../Assets/images/cerise.png';
import Ananas from '../../Assets/images/ananas.png';
import Orange from '../../Assets/images/orange.png';
import Pasteque from '../../Assets/images/pasteque.png';
import Raisin from '../../Assets/images/raisin.png';

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {
      liste: [
        Pomme,Poire,Fraise,Banane,Kiwi,Cerise, Ananas, Orange, Pasteque, Raisin 
      ],
      position : [],
      radiusCircle : 330
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
    let circleRadius = this.state.radiusCircle;
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
      position: newPosition
    })
  }

  render() { 
    
    let images = this.state.liste.map((image, key) => {
      return <img key={key} src={image} alt="image" />
    })


    return (
      <div className="Container">
         <div className="button">
          <button onClick={this.previous}>previous</button>
          <button onClick={this.next}>next</button>
        </div> 

        <svg height="600" width="600">
          <circle cx="300" cy="500" r="400" fill="#fff"/>
          <g className="firstCircle">
            {this.state.position.map((item, key) => {
              return <image xlinkHref={item.element} key={key} x={item.x} y={item.y} width="100" height="100" />
              })}
          </g>
        </svg>
      </div>
    );
  }
}

export default Container;