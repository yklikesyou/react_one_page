import React, { Component } from "react";

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc,
    };
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    console.log(this.props.data);
    return (
      <article>
        <h2>Update</h2>
        <form
          action="/create_process"
          method="post"
          onSubmit={(e) => {
            // create_process라는 페이지로 사용자가 입력한 정보를 전송. url이 노출안되는게 post
            e.preventDefault();
            this.props.onSubmit(
              this.state.id,
              this.state.title,
              this.state.desc
            );
            // 원래 type=submit이면 action page로 이동하는데,
            // 페이지전환없이 모든걸 할 수있는 어플리케이션을 만들고있으므로
            // 이동못하게함
            // e.target.title.value -> scope들어가서 e-> target에서 form 찾으면 -> title
          }}
        >
          <input type="hidden" name="id" value={this.state.id}></input>

          <p>
            <input
              type="text"
              name="title"
              placeholder="title"
              //value={this.props.data.title} -> props의 data는 read only니까 value값으로 지정X
              //그래서 가변적인 data인 state화를 시켜주고, onChange event해야함
              //즉, props로 들어온 값을 state로 만들고, 이 state의 값을 각각의 form과 동기화시켜서 state값을 계속해서 변화시킴
              value={this.state.title}
              onChange={this.inputFormHandler}
              //여기서 target은 이 input
            ></input>
          </p>
          <p>
            <textarea
              onChange={this.inputFormHandler}
              name="desc"
              placeholder="description"
              value={this.state.desc}
            ></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default UpdateContent;
