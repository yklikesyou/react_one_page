import React, { Component } from "react";

class Control extends Component {
  render() {
    return (
      <ul>
        <li>
          <a
            href="/create"
            onClick={(e) => {
              e.preventDefault();
              this.props.onChangeMode("create");
            }}
          >
            create
          </a>
        </li>
        <li>
          <a
            href="/update"
            onClick={(e) => {
              e.preventDefault();
              this.props.onChangeMode("update");
            }}
          >
            update
          </a>
        </li>
        <li>
          <input
            onClick={(e) => {
              e.preventDefault();
              this.props.onChangeMode("delete");
              //onChangeMode라는 props를 호출
            }}
            type="button"
            value="delete"
          ></input>
        </li>
      </ul>
    );
  }
}

export default Control;
