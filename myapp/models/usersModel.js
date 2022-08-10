const Sequelize = require ('sequelize'); 
const CryptoJS = require("crypto-js");


const db = require ('../db/db');
const secretKey = 'ytanpdTpakd';

class User{
	
	secretKey = 'ytanpdTpakd';

	constructor(email, password) {
		this.email = email;
		this.password = password;
	}

	static async add(userData) {
		
		let encryptedPass = CryptoJS.AES.encrypt(userData.password, secretKey).toString();

		return await usersSeqModel.create({
			name: userData.name,
			email: userData.email,
			password: encryptedPass,
		});
	}

	static async getById(id){
		const user = await usersSeqModel.findByPk(id);
		return user;         
		
	}

	static async getByEmail(email){
		const user = await usersSeqModel.findOne({
			where: {
				email: email
			},		
		});
		if (user === null) {
			return('Usuário não encontrado');
		} else {
			return user;    
		}
		
	}

	static async getAll(){
		const users = await usersSeqModel.findAll();
		return users;
	}

	static async validate(email, pass){
		const user = await this.getByEmail(email);
		try {
			var bytes  = CryptoJS.AES.decrypt(user.password, secretKey);
			var originalPass = bytes.toString(CryptoJS.enc.Utf8);

			if (originalPass == pass){
				return user;
		  	}else{
				return 'Usuário e/ou senha incorretos';
			}
		}catch(err) {
				return ('Erro: '+err);
		}
		
	}
	
}

const usersSeqModel = db.define('user', {
	id: {
		type: Sequelize.INTEGER.UNSIGNED,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
});

module.exports = {
	usersSeqModel, 
	User
}

