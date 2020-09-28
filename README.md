react로 one page app 만들기
------------------
* 링크를 클릭하면 다른 url을 타고 이동하는 개념이 아니라, event를 발생시켜서 `state`와 `props`를 변경함으로써 페이지 전체가 re-rendering 되고, 페이지가 state와 props에 맞게 다시 출력되는 것 => 싱글페이지 웹앱이라고함

>기본문법
>>1. `constructor()`는 제일 먼저 실행되며 초기화를 담당한다. `render함수`보다 먼저 실행되면서 해당 component를 초기화 시켜줌.
>>2. `state` `props`의 값이 바뀌면 이를 가지고있는 component의 `render함수`가 다시호출된다. 즉, state/props의 값이 바뀌면, 화면이 다시 그려짐
>>3. `push()`: 원본형태유지 X  vs `concat()` : 원본형태유지 O
>>> `push()` 사용하면서 복사본을 쓰려면, 이전에 `Array.from()`으로 복사해주면됨.

props와 state개념
--------------
 1. component를 사용하는 외부의 `props`
 : props를 통해 component를 이리저리 나타내 볼 수 있음. 즉, props를 통해서 component를 제어
 
 2. 그 props에 따라서 component를 실제로 구현하는 `state`
 : state는 component 내부적으로 사용되는 것들 -> 사용자는 알 필요 X
