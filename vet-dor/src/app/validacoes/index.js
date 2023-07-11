const cpfValidation = require('./cpfValidation');
const emailValidation = require('./emailValidation');
const nameValidation = require('./nameValidation');
const passwordValidation = require('./passwordValidation');
const phoneValidation = require('./phoneValidation');

// exportando todas as funções de validações em um único objeto, para que não precisemos importar todas as pastas de validações
const validations = {
	cpfValidation,
	emailValidation,
	nameValidation, 
	passwordValidation,
	phoneValidation
}

module.exports = validations;