import React, { Component } from 'react';
// import './Container.css';

class OldContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liste: [
        "1","2","3","4","5","6","7", "8", "9", "10"
      ],
      position : [],
      index: 0,
      previousIndex: null,
      nextIndex: null
    }
  }

  componentDidMount(){
    this.updateNextIndexes(0);
    this.updatePreviousIndexes(0);
    this.firstCircle();
  }

  componentDidUpdate(){
    this.firstCircle();
  }

  updateNextIndexes = (middleValue) => {
    if (middleValue === this.state.liste.length - 2){
      this.setState({
        previousIndex: middleValue,
        index: middleValue +1,
        nextIndex: 0
      })
    } else if(middleValue === this.state.liste.length -1){
      this.setState({
        previousIndex : middleValue, 
        index: 0,
        nextIndex : 1
      })
    }else if ( middleValue >= 0) {
      this.setState({
        previousIndex : middleValue,
        index: middleValue + 1,
        nextIndex : middleValue + 2
      })
    } 
  }

  updatePreviousIndexes = (middleValue) => {
    if(middleValue === 1){
      this.setState({
        previousIndex: this.state.liste.length -1,
        index: middleValue -1,
        nextIndex: middleValue 
      })
    }  else if ( middleValue === 0) {
      this.setState({
        previousIndex: this.state.liste.length - 2,
        index: this.state.liste.length -1,
        nextIndex: middleValue 
      })
    } else if (middleValue >= 0) {
      this.setState({
        previousIndex: middleValue - 2,
        index : middleValue - 1,
        nextIndex: middleValue 
      })
    }
  }

  next = () => {
    this.updateNextIndexes(this.state.index);
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
    this.setState({
      liste : newListe
    }) 
    console.log(this.state.liste);
    

    // for (let index in this.state.position){
    //   this.setState({
    //     position: this.state.position[index].element -= 1
    //   })
    //   // console.log(this.state.liste);
    //   // console.log(this.state.position);
      
    // }
    // this.updatePreviousIndexes(this.state.index)

  }

  firstCircle = () => {
    console.log("Liste à utiliser : " + this.state.liste)
    let nodeNumbers = this.state.liste.length;
    let element = this.state.liste;
    let circleRadius = 300;
    let circleWidth = circleRadius * 2 ; 
    let circleheight = circleRadius * 2 ; 
    let angle;
    let x;
    let y;

    for (let i=0 ; i < nodeNumbers ; i++){
      angle = (i / (nodeNumbers/2)) * Math.PI;
      x = (circleRadius * Math.cos(angle)) + (circleWidth / 2);
      y = (circleRadius * Math.sin(angle)) + (circleheight / 2);
      element = this.state.liste[i];
      this.setState({
        position:
      })
      this.state.position.push({element, x, y });
    }   
  }

  render() {    
    return (
      <div className="Container">
        {/* <div>{this.state.liste[this.state.previousIndex]}</div>
        <div>{this.state.liste[this.state.index]}</div>
        <div>{this.state.liste[this.state.nextIndex]}</div> */}
         <div className="button">
          <button onClick={this.previous}>previous</button>
          <button onClick={this.next}>next</button>
        </div> 

        <svg height="600" width="600">
          <circle cx="300" cy="300px" r="300" fill="#f7f7f7"/>
            {this.state.position.map( (element, key) => {
              return <text key={key} x={element.x} y={element.y}>{element.element}</text>
            })}
        </svg>
      </div>
    );
  }
}

export default OldContainer;
