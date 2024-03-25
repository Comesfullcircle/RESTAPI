module.exports = function (app) {
  const index = require("../controllers/indexController");
  const jwtMiddleware = require("../../config/jwtMiddleware");

  // 라우터 정의
  // app.HTTP메서드(uri, 컨트롤러 콜백함수)
 // app.get("/dummy", index.example);

  //예시 학생 테이블 조회
  app.get("/students/:studentIdx", index.readStudents); //-> indexController 가서 학생 테이블 조회 생성, /:studentIdx pathvariable 생성
};
