const nameValidator = (nome) =>{
	let isValid = false;

  const RegexVali =  /^[a-zA-Z][a-zA-Z0-9-_ ]{0,35}$/;
	
	if (RegexVali.test(nome) == true ) {
		isValid = true;
	}

	return isValid;
}

const emailValidator = (email) =>{
	let isValid = false;

  const RegexVali =  /^\S+@\S+\.\S+$/;

  if (RegexVali.test(email) == true ) {
		isValid = true;
	}

	return isValid;
}

const celNumberValidator = (number) =>{
	let isValid = false;

  const RegexVali =  /^[0-9]{0,11}$/;

  if (RegexVali.test(number) == true ) {
		isValid = true;
	}

	return isValid;
}

const cpfValidator = (cpf) =>{
	let isValid = false;

  const RegexVali =  /^[0-9]{0,11}$/;

  if (RegexVali.test(cpf) == true ) {
		isValid = true;
	}

	return isValid;
}

const pwValidator = (pw) =>{
	let isValid = false;

  const RegexVali =  /^[a-zA-Z][a-zA-Z0-9-_]{0,16}$/;

  if (RegexVali.test(pw) == true ) {
		isValid = true;
	}

	return isValid;
}
// exportando todas as funções de validações em um único objeto.
const validations = {
	nameValidator,
	emailValidator,
	celNumberValidator,
	cpfValidator,
	pwValidator,
}

module.exports = validations;