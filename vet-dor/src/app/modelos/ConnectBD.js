// const {Sequelize} = require('sequelize');

// // const sequelize = new Sequelize('mariadb::memory:');
// const sequelize = new Sequelize("vetDor", "host", "2103", {
//   host: "localhost",
//   dialect: "mariadb"
// });

// try {
//     await sequelize.authenticate();
//     console.log("coneção estabelecida");
// } catch (error) {
//   console.error("Não foi possível estabelecer conexão", error);
// }

var Client = require('mariasql');

var c = new Client({
  host: '127.0.0.1',
  user: 'foo',
  password: 'bar'
});

c.query('SHOW DATABASES', function(err, rows) {
  if (err)
    throw err;
  console.dir(rows);
});

c.end();