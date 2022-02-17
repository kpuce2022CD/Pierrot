// 웹브라우저로 회원가입을 요청
// 요청할 때는 스프링서버한테 요청
// react 같은 경우 리액트 서버(nodejs)한테 요청,
// nodejs가 react를 품고 있음

let index = {
  init: function () {
    let _this = this;
    console.log(this); // this는 index를 가르킴

    // 이벤트를 바인딩
    $("#btn-save").on("click", function () {
      alert("btn-save 클릭됨");

      // 여기서 save는 this.save()로 생략되어 있는데
      // this가 button을 가르키고 있어서 save를 못찾음
      console.log(this);
      _this.save();
    });
  },
  // 이렇게 설계하면 장점: 버튼 리스너를 새로 만들고 밑에서 처리하면됨
  save: function () {
    let data = {
      email: $("#email").val(),
      password: $("password").val(),
      name: $("name").val(),
    };
    // fetch 쓰면 jquery안써도 됨
    $.ajax({
      type: "POST",
      url: "/auth/joinProc",
      // 자바스크립트 오브젝트를 json string으로 바꾼것
      data: JSON.stringify(data),
      // 스프링이 메세지 컨버터가 작동해서 requestBody를 붙여야함
      // 그러기 위해서는 스프링에게 컨텍스트 타입을 알려줘야 한다.
      // 그래야 오브젝트로 변환
      contentType: "application/json; charset=utf-8",
      // 응답받는 타입설정
      dataType: "text",
    })
      .done((resp) => {
        console.log(JSON.parse(resp));
      })
      .fail(function (error) {
        console.log(error);
      });
    // alert("btn-save 로직 실행");
  },
};

index.init();
