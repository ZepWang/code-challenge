import React from "react";
import axios from "axios";
import "./FormPage.css";

export default class EachPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }
  render(){
    return (
      <div class="eachPlan" id="11">
        <p>bestSeller: {this.props.bestSellers}</p>
        <p>desceiption: {this.props.description}</p>
        <p>id: {this.props.id}</p>
        <p>name: {this.props.name}</p>
        <p>price: {this.props.price}</p>
        <p>section: {this.props.section}</p>
        <p>type: {this.props.type}</p>
      </div>
    );}
}