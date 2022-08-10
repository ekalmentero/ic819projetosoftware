const Models = require('../models/usersModel');

async function getUsertById(id){
    const student = await Models.User.getById(id);
	return student;         	
}

async function getUserByEmail(email){
    const result = await Models.User.getByEmail(email);
	return result;         	
}

async function getAllUsers(){
	const allUsers = await Models.User.getAll();
	return allUsers;
}

async function addUser(userData) {
	return await Models.User.add(userData);
}

async function validateUser(email, pass) {
	return await Models.User.validate(email, pass);
}

module.exports = {
	getAllUsers, 
	getUserByEmail,
	addUser,
	validateUser,
	getUsertById,
}
