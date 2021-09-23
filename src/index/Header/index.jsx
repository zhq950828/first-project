import React from "react";
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
      const self = this;
      // console.log('children componentDidMount');
  }



  render() {
    console.log('children render'); 
    return (
      <div className="header">
        <h1>
          hello, <span>world</span>
        </h1>
      </div>
    );
  }
}
