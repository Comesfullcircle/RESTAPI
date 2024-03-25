const { pool } = require("../../config/database");

//예시 학생 테이블 조회
exports.selectStudents =  async function (connection, studentName) {
  const selectAllStudentsQuery = `SELECT * FROM Students;`;
  const selectStudentByNameQuery = 'SELECT * FROM Students where studentName = ?;';
  const Params = [studentName];

  let Query;
  //밑에 if 문과 동일
  //let Query = studentName ? selectStudentByNameQuery : selectAllStudentsQuery

  if (!studentName) {
    Query = selectAllStudentsQuery;
  }else {
    Query = selectStudentByNameQuery;
  }

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.exampleDao = async function (connection, params) {
  const Query = ``;
  const Params = [];

  const rows = await connection.query(Query, Params);

  return rows;
};