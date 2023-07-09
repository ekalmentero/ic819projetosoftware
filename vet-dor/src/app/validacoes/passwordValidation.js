const pwValidator = (pw) => {

	let isValid = false;

  const RegexVali =  /^[a-zA-Z][a-zA-Z0-9-_]{0,16}$/;

  if (RegexVali.test(pw) == true ) {
		isValid = true;
	}

	return isValid;
}

module.exports = pwValidator;