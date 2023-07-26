const admin = require("firebase-admin");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const ServiceAccount = require("./projetovet-dor-firebase-adminsdk-jddnl-8f04ade30e.json");

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
  // databaseURL: "https://projetovet-dor-default-rtdb.firebaseio.com"
});


const database = getFirestore();

module.exports = {
	database
}