const db = require('../modelos/ConnectBD.js');
const AniPend = db.AniPend;

async function getData() {
const Animal = await AniPend.findAll();
console.log(JSON.stringify(Animal));
  

}

getData();
