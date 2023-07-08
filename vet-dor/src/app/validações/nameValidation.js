export default function nameValidation(name) {
	if (name === null || !name) {
		console.log("[nameVaidation] name === null || !name");
		return false;
	}

	name = name.trim();

	if (name === "") {
		console.log("[nameVaidation] name === '' ");
		return false;
	}

	// TODO: procurar regras pra nome

	console.log("[nameVaidation] nome válido!");

	return true;
}
