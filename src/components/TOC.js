import React, { Component } from "react";
//react library에서 component라는 class를 로딩한 것

class TOC extends Component {
  shouldComponentUpdate(newProps, newState) {
    console.log("====> TOC shouldComponentUpdate");
    //새로운게 newProps.data
    //원래꺼가 this.props.data
    //render이전에 shouldComponentUpdate 값이 false면 render함수 는 호출되지 않는다.
    //즉, TOC로 들어오는 data값이 바뀌었을때에만 render 할수있음.
    if (this.props.data === newProps.data) {
      return false;
    }
    return true;
  }
  render() {
    console.log("====> TOC render");
    var lists = [];
    var data = this.props.data;
    var i = 0;

    /* 여러개의 목록을 자동으로 생성할때는 key값 필요. 각 목록을 react가 구분하기위해서 요청하는 것*/

    while (i < data.length) {
      lists.push(
        <li key={data[i].id}>
          <a
            href={"/content/" + data[i].id}
            data-id={data[i].id}
            //data- 로 시작하는 건 검사누르고 볼때 ->dataset에서 찾을수있음
            onClick={(e) => {
              //e는 event객체를 받는것
              e.preventDefault();
              this.props.onChangePage(e.target.dataset.id);
              //onChangePage라는 props를 TOC안에서 받아야함
            }}
          >
            {data[i].title}
          </a>
        </li>
      );
      /* /content/ 이 부분은 이후 각각의 title과 desc를 담은 문서를 content폴더에 생성하면 그 파일로 연결되게 하는 것*/
      i += 1;
    }
    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}

export default TOC;
