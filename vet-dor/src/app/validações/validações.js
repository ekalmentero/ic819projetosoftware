export const nameValidator = (nome) =>{
	let isValid = false;

  const RegexVali =  /^[a-zA-Z][a-zA-Z0-9-_ ]{0,35}$/;
	
	if (RegexVali.test(nome) == true ) {
		isValid = true;
	}

	return isValid;
}

export const emailValidator = (email) =>{
  const RegexVali =  /^\S+@\S+\.\S+$/;

  if (RegexVali.test(email) == true ) {
		isValid = true;
	}

	return isValid;

}

export const numberValidator = (number) =>{

  const RegexVali =  /^[0-9]{0,11}$/;

  if (RegexVali.test(number) == true ) {
		isValid = true;
	}

	return isValid;

}
export const cpfValidator = (cpf) =>{

  const RegexVali =  /^[0-9]{0,11}$/;

  if (RegexVali.test(cpf) == true ) {
		isValid = true;
	}

	return isValid;

}
export const pwValidator = (pw) =>{

  const RegexVali =  /^[a-zA-Z][a-zA-Z0-9-_]{0,16}$/;

  if (RegexVali.test(pw) == true ) {
		isValid = true;
	}

	return isValid;

}
