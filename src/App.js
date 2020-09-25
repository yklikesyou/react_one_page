import React, { Component } from "react";
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import Control from "./components/Control";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import "./App.css";

// App.js를 사용하고 있는 파일은 index.js (App이라는 component를 실행하는 코드가 있음)
//버튼 누르면 state바뀌고 이에 render바뀌고 동적으로
class App extends Component {
  constructor(props) {
    //component가 실행될 때, render함수보다 먼저 실행되면서 그 component를 초기화 시켜줌
    // 즉, constructor함수는 제일먼저 시작해서 초기화를 담당
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "welcome", //welcome or read page인지 구분하기 위함
      selected_content_id: 2,
      subject: { title: "WEB", sub: "World Wide Web !!" },
      welcome: { title: "Welcome", desc: "Hello, React!!" },
      contents: [
        //데이터가 여러개니까 배열을 만듦
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
      ],
    };
  }
  // state/props의 값이 바뀌면 이를 가지고있는 component의 render함수가 다시호출된다.
  // 즉, state/props의 값이 바뀌면, 화면이 다시 그려짐

  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i += 1; //이거 i+= i 라고 잘못써서 오류났었음
    }
  }
  getContent() {
    var _title,
      _desc,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read") {
      var _content = this.getReadContent();
      _article = (
        <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
      );
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={(_title, _desc) => {
            //add content to this.state.contents
            this.max_content_id += 1;
            //this.state.contents.push({id: this.max_content_id,title: _title,desc: _desc});
            //이거는 push로 하기때문에 원본에 추가가됨. 즉, 원본 원래 형태를 유지할 수가 없음.
            // push쓰면서 원본 복사본을 쓰려면, 아래 두줄로 나타내면됨
            // var _contents = Array.from(this.state.contents);
            // _contents.push({id: this.max_content_id,title: _title,desc: _desc})

            //반면,아래처럼 concat을 이용해서 추가하는건 원본을 그대로 둠. return 값에는 추가되어있으므로 이 return값을 변수로 받아서 사용하면됨
            var _contents = this.state.contents.concat({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            this.setState({
              contents: _contents,
              mode: "read",
              selected_content_id: this.max_content_id,
            });
          }}
        ></CreateContent>
      );
    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={(_id, _title, _desc) => {
            var _contents = Array.from(this.state.contents);
            //원래 contents를 복제해서 새로운 배열로. 원본을 바꾸지 않는 immutable
            var i = 0;
            while (i < _contents.length) {
              // 우리가 수정하려는것과 같은 원소 찾기
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i += 1;
            } //들어온 얘들로 값을 바꾸기
            this.setState({ contents: _contents, mode: "read" });
          }}
        ></UpdateContent>
      );
    }
    return _article;
  }
  render() {
    return (
      <div className="App">
        <Subject
          //subject라는 component에 onChangePage라는 이벤트를 만들어서 사용자에게 제공
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          // 상위 component의 state값을 하위 component의 props 값으로 전달
          // 여기서 component의 props값이 title, sub 이거. (=attribute 같은 개념)
          onChangePage={() => {
            this.setState({ mode: "welcome" });
            // props로 이렇게 component에 이거저거 만들어보는것.
            // *****여기서 onChangePage라는 이벤트에 함수를 설치한 것. -> 이 이벤트를 호출하는건 해당 component.js에서
            // state 값을 바꿀때, 그냥 this.state.mode ='welcome'하는게 아니라, setState사용해야함.
          }}
        ></Subject>
        <TOC
          onChangePage={(id) => {
            this.setState({ mode: "read", selected_content_id: Number(id) }); //id숫자로 강제바꿈
          }}
          data={this.state.contents}
        ></TOC>
        <Control
          onChangeMode={(_mode) => {
            if (_mode === "delete") {
              if (window.confirm("really?")) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                  }
                  i += 1;
                }
                this.setState({
                  mode: "welcome",
                  contents: _contents,
                });
                alert("deleted!");
              }
            } else {
              this.setState({
                mode: _mode,
              });
            }
          }}
        ></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
//외부에서 사용할 수 있도록 export

//react에서는 링크를 클릭하면 다른 url을 타고 이동하는 개념이 아니라,
//event를 발생시켜서 state와 props를 변경함으로써
//페이지 전체가 re-rendering 되면서 페이지가 state와 props에 맞게 다시 출력되는 것
// 그래서 싱글페이지 웹앱이라고함
