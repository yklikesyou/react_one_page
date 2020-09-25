import React, { Component } from "react";

class CreateContent extends Component {
  render() {
    return (
      <article>
        <h2>Create</h2>
        <form
          action="/create_process"
          method="post"
          onSubmit={(e) => {
            // create_process라는 페이지로 사용자가 입력한 정보를 전송. url이 노출안되는게 post
            e.preventDefault();
            this.props.onSubmit(e.target.title.value, e.target.desc.value);
            // 원래 type=submit이면 action page로 이동하는데,
            // 페이지전환없이 모든걸 할 수있는 어플리케이션을 만들고있으므로
            // 이동못하게함
            // e.target.title.value -> scope들어가서 e-> target에서 form 찾으면 -> title
          }}
        >
          <p>
            <input type="text" name="title" placeholder="title"></input>
          </p>
          <p>
            <textarea name="desc" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default CreateContent;
