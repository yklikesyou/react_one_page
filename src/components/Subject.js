import React, { Component } from "react";

class Subject extends Component {
  //subject 라는 component를 만들겠다
  //component는 정리정돈의 도구이다
  //component이름에만 집중
  render() {
    return (
      //component는 하나의 최상위 태그로 감싸야해
      //여기서는 header
      <header>
        <h1>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault(); // event가 발생했을때, a 태그의 기본적인 동작방법을 금지. 즉, 페이지 더이상 reload X
              this.props.onChangePage(); //props로 전달된 함수호출
              // 이때 onChangePage 안의 함수내용은 props마다 다르게 설정할수있는 거임
            }}
          >
            {this.props.title}
          </a>
        </h1>
        {this.props.sub}
      </header>
    );
  }
}

export default Subject;

// props를 통해 component를 이리저리 나타내 볼 수 있음 -> 사용자에게 중요한 도구
// 즉, props를 통해서 component를 제어
// state는 component 내부적으로 사용되는 것들 -> 사용자는 알 필요 X

// component를 사용하는 외부의 props
// 그 props에 따라서 component를 실제로 구현하는 state
