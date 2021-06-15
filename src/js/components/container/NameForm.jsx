import React, { Component } from "react";
import ReactDOM from "react-dom";

class NameForm extends React.Component 
{
  constructor(props) {
    super(props)
    this.state = { username: '', password:'' }
    //this.handleChange = this.handleChange.bind(this)
    //this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange1 = this.handleChange1.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)    
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange1(event) {
    this.setState({ username:event.target.value })
  }

  handleChange2(event) {
    this.setState({ password:event.target.value })
  }  

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);   
    //         http://localhost/ServlettXX1/input1.jsp
    let url = 'http://localhost:8080/ServletXX1/Login?username='+this.state.username+'&password='+this.state.password;
    alert('URL:'+url);
    fetch(url).then(response => response.text()).then(data => 
      {
      alert(data);
      window.location.href = data;
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text" 
          value={this.state.username}
          onChange={this.handleChange1}
        />
        <input
          type="password" 
          value={this.state.password}
          onChange={this.handleChange2}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default NameForm;

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<NameForm />, wrapper) : false;