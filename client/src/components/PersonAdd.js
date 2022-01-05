import React from "react";
import axios from "axios";
import "./FormPage.css";
import EachPlan from "./EachPlan";
import g1 from "../../src/img/Insubuy.jpg";

export default class PersonAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      policyMax: "",
      citizenShip: "",
      age: "",
      mailingState: "",
      showPlan: true,
      PlanList: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGet = this.handleGet.bind(this);
    this.resetValue = this.resetValue.bind(this);
  }
  resetValue = (event) => {
    event.target.reset();
  };
  handleGet = (event) => {
    event.preventDefault();
    this.showPlans();
    axios.get(`http://localhost:8080/quotes/`).then((res) => {
      if (res.status === 200) {
        this.setState({
          PlanList: res.data.quotes.map((list) => (
            <EachPlan
              bestSellers={list.bestSellers}
              description={list.description}
              id={list.id}
              name={list.name}
              price={list.price}
              section={list.section}
              type={list.type}
            />
          )),
        });
      }
      console.log(res);
      console.log(res.data);
    });
  };
  handleSortByPrice = (event) => {
    event.preventDefault();
    this.showPlans();
    axios.get(`http://localhost:8080/quotes/`).then((res) => {
      if (res.status === 200) {
        this.setState({
          PlanList: res.data.quotes
            .sort((a, b) => a.price - b.price)
            .map((list) => (
              <EachPlan
                bestSellers={list.bestSellers}
                description={list.description}
                id={list.id}
                name={list.name}
                price={list.price}
                section={list.section}
                type={list.type}
              />
            )),
        });
      }
      console.log(res);
      console.log(res.data);
    });
  };
  handleSortByName = (event) => {
    event.preventDefault();
    this.showPlans();
    axios.get(`http://localhost:8080/quotes/`).then((res) => {
      if (res.status === 200) {
        this.setState({
          PlanList: res.data.quotes
            .sort((a, b) => a.name - b.name)
            .map((list) => (
              <EachPlan
                bestSellers={list.bestSellers}
                description={list.description}
                id={list.id}
                name={list.name}
                price={list.price}
                section={list.section}
                type={list.type}
              />
            )),
        });
      }
      console.log(res);
      console.log(res.data);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const infos = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      policyMax: this.state.policyMax,
      citizenShip: this.state.citizenShip,
      age: this.state.age,
      mailingState: this.state.mailingState,
    };
    if (
      this.state.startDate === "" ||
      this.state.endDate === "" ||
      this.state.policyMax === "" ||
      this.state.citizenShip === "" ||
      this.state.age === "" ||
      this.state.mailingState === ""
    ) {
      alert("please fill in all information");
      return;
    }
    if(this.state.endDate<this.state.startDate){
      alert("The end date should be after the start date.");
      return;
    }
      if (!this.isValid(this.state.citizenShip)) {
        alert("citizenship cannot have special character!");
        return;
      }
      if (!this.isValid(this.state.mailingState)) {
        alert("mailingState cannnot have special character!");
        return;
      }
    if (this.state.age > 100) {
      alert("age cannot over 100");
      return;
    }

    axios.post(`http://localhost:8080/quotes/`, { infos }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
    this.showPlans();
    this.handleGet(event);
  };

  handleStartDateChange = (event) => {
    this.setState({ startDate: event.target.value });
  };
  handleEndDateChange = (event) => {
    this.setState({ endDate: event.target.value });
  };
  handlePolicyMaxChange = (event) => {
    this.setState({ policyMax: event.target.value });
  };
  handleAgeChange = (event) => {
    this.setState({ age: event.target.value });
  };
  handleMailingChange = (event) => {
    this.setState({ mailingState: event.target.value });
  };
  handleCitizenShipChange = (event) => {
    this.setState({ citizenShip: event.target.value });
  };
  isValid = (str) => {
    return !/[~`1234567890!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
  };
  showPlans = () => {
    this.setState({
      showPlan: false,
    });
  };
  back = () => {
    this.setState({
      showPlan: true,
    });
  };
  handleFormReset = () => {
    this.setState(() => this.initialState);
  };
  changeToGrid = () => {
    // document.getElementsByClassName("eachPlan").style.width = "50%";
    var y = document.getElementsByClassName("eachPlan");
    var i;
    for (i = 0; i < y.length; i++) {
      y[i].style.width = "48%";
      y[i].style.display = "inline-block";
    }
  };
  changeToList = () => {
    // document.getElementsByClassName("eachPlan").style.width = "50%";
    var y = document.getElementsByClassName("eachPlan");
    var i;
    for (i = 0; i < y.length; i++) {
      y[i].style.width = "95%";
      y[i].style.display = "inline-block";
    }
  };

  render() {
    return (
      <div >
        {this.state.showPlan ? (
          <div className="container">
            <div className="header">
              <img className="img"src={g1}></img>
              <p className="header-text">Travel Insurance</p>
            </div>

            <form className="formBody" onSubmit={this.handleSubmit}>
              <div className="travel">
                <div className="text">Travel Dates</div>
                <input
                  type="date"
                  name="startDate"
                  onChange={this.handleStartDateChange}
                />
                <input
                  type="date"
                  name="endDate"
                  onChange={this.handleEndDateChange}
                />
              </div>

              <div className="policy">
                <div className="text">Policy Maximum</div>
                <select onChange={this.handlePolicyMaxChange}>
                  <option value="">Choose your policy maximum</option>
                  <option value="50">50,000</option>
                  <option value="100">100,000</option>
                  <option value="250">250,000 </option>
                  <option value="500">500,000</option>
                </select>
              </div>

              <div className="citizen">
                <div className="text">CitizenShip</div>
                <input
                  type="text"
                  name="citizenShip"
                  placeholder="Chose your country of Citizenship"
                  onChange={this.handleCitizenShipChange}
                />
              </div>

              <div className="age">
                <div className="text">Age</div>
                <input
                  type="text"
                  name="age"
                  placeholder="Chose your age"
                  onChange={this.handleAgeChange}
                />
              </div>
              <div className="mail">
                <div className="text">Mailing State</div>
                <input
                  type="text"
                  name="mailingState"
                  placeholder="Chose State"
                  onChange={this.handleMailingChange}
                />
              </div>
              <div className="Buttons">
                <button
                  className="getButton"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Get Quotes
                </button>
                <button type="reset" value="Reset">
                  reset
                </button>
                {/* <button className="getButton2" onReset={this.handleFormReset}>
                  {" "}
                  reset
                </button> */}
              </div>
            </form>
          </div>
        ) : (
          <div className="container">
          <div className="Plan-comp" id="Plan-compID">
            <div className="btn-contain">
              <button className="GridButton" onClick={this.back}>
                back
              </button>
              <button className="GridButton" onClick={this.changeToGrid}>
                Grid
              </button>
              <button className="GridButton" onClick={this.changeToList}>
                List
              </button>
              <button className="GridButton" onClick={this.handleSortByPrice}>
                Sort By Price
              </button>
              <button className="GridButton" onClick={this.handleSortByName}>
                Sort By Name
              </button>
            </div>
            {this.state.PlanList ? this.state.PlanList : null}
          </div>
          </div>
        )}
      </div>
    );
  }
}
