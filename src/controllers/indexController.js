const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");

const indexDao = require("../dao/indexDao");

//학생 업데이트
exports.updateStudent = async function(req, res) {
 const { studentName, major, birth, address } = req.body;
 const { studentIdx } = req.params;

 if (studentName && typeof studentName !== "string") {
  return res.send({
       isSuccess: false,
       code: 400, //요청 실패시 400번대 코드
       message: "값을 정확히 입력해주세요.",
     });
 }
 if (major && typeof major !== "string") {
   return res.send({
        isSuccess: false,
        code: 400, //요청 실패시 400번대 코드
        message: "값을 정확히 입력해주세요.",
      });
 }
 if (address && typeof address !== "string") {
    return res.send({
         isSuccess: false,
         code: 400, //요청 실패시 400번대 코드
         message: "값을 정확히 입력해주세요.",
       });
  }

 // birth : YYYY-MM-DD 형식 검사
 var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
 if (birth && !regex.test(birth)){
   return res.send({
       isSuccess: false,
       code: 400, //요청 실패시 400번대 코드
       message: "날짜 형식을 확인해주세요.",
   });
 }
  try {
     const connection = await pool.getConnection(async (conn) => conn);
     try {
       const isValidStudentIdx = await indexDao.isValidStudentIdx(
         connection,
         studentIdx
       );
       if (!isValidStudentIdx){
         return res.send({
              isSuccess: true,
              code: 200, // 요청 실패시 400번대 코드
              message: "유효한 학생 인덱스가 아닙니다.",
         });
       }

       console.log(1);

       const [rows] = await indexDao.updateStudents(
          connection,
          studentIdx,
          studentName,
          major,
          birth,
          address
       );

     } catch (err) {
       logger.error('updateStudents Query error\n: ${JSON.stringify(err)}`);
       return false;
     } finally {
       connection.release();
     }
   } catch (err) {
     logger.error('updateStudents DB Connection error\n: ${JSON.stringify(err)}`);
     return false;
   }
};

//학생 생성
exports.createStudent = async function(req, res) {
 const { studentName, major, birth, address } = req.body;

 //console.log(studentName, major, birth, address);
 //studentName, major, address: 문자열 검사
 if (
    typeof studentName !== "string" ||
    typeof major !== "string" ||
    typeof address !== "string"
 ) {
    return res.send({
      isSuccess: false,
      code: 400, //요청 실패시 400번대 코드
      message: "값을 정확히 입력해주세요.",
    });
 }
 // birth : YYYY-MM-DD 형식 검사
 var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
 //console.log(regex.test("2020-09-25"));
 if (!regex.test(birth)){
   return res.send({
       isSuccess: false,
       code: 400, //요청 실패시 400번대 코드
       message: "날짜 형식을 확인해주세요.",
   });
 }
  try {
     const connection = await pool.getConnection(async (conn) => conn);
     try {
       const [rows] = await indexDao.insertStudents(
          connection,
          studentIdx,
          major,
          birth,
          address
       );

       return res.send({
         isSuccess: true,
         code: 200, // 요청 실패시 400번대 코드
         message: "학생 생성 성공",
       });
     } catch (err) {
       logger.error('createStudents Query error\n: ${JSON.stringify(err)}`);
       return false;
     } finally {
       connection.release();
     }
   } catch (err) {
     logger.error('createStudents DB Connection error\n: ${JSON.stringify(err)}`);
     return false;
   }
 }

};

//예시 학생 테이블 조회
exports.readStudents = async function(req, res) {
 const studentName = req.query; //포스트맨으로 get 방식으로 studentName
 //const { studentIdx } = req.params; // routes 에서 변경된 부분 수정

 try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.selectStudents(connection, studentIdx);

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`readStudents Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`readStudents DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
}

// 예시 코드
exports.example = async function (req, res) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.exampleDao(connection);

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`example Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};
