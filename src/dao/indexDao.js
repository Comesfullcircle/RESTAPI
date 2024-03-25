const { pool } = require("../../config/database");

exports.insertStudents = async function (connection, studentName, major, birth, address) {
  const Query = `insert into Students(studentName, major, birth, address) values(?,?,?,?)`;
  const Params = [studentName, major, birth, address];

  const rows = await connection.query(Query, Params);

  return rows;
};


//예시 학생 테이블 조회
exports.selectStudents =  async function (connection, studentIdx) {
  const selectAllStudentsQuery = 'SELECT * FROM Students where studentIdx = ?;';
  const Params = [studentIdx];

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
  const Query = `SELECT * FROM Students;`;
  const Params = [];

  const rows = await connection.query(Query, Params);

  return rows;
};
