function nameValidation(name) {
	if (name === null || !name) {
		console.log("[nameVaidation] name === null || !name");
		return false;
	}

	name = name.trim();

	if (name === "") {
		console.log("[nameVaidation] name === '' ");
		return false;
	}

  const RegexVali =  /^[a-zA-Z][a-zA-Z0-9-_ ]{0,35}$/;
	
	if (!RegexVali.test(name) == true ) {
		return false
	}

	console.log("[nameVaidation] nome válido!");

	return true;
}

module.exports = nameValidation;