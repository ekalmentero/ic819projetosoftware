/* Função para validar o telefone */
export default function phoneValidation(phone) {
	console.log(`[phoneValidation] phone = ${phone}`);

	if (!phone || phone === "") {
		console.log("[phoneValidation] !phone || phone === '' ");
		return false;
	}

	//tirar outros caracteres
	phone = phone.toString().replace(/\D/g,"");

	if (phone.length < 10 ||
		phone == "00000000000" ||
		phone == "11111111111" ||
		phone == "22222222222" ||
		phone == "33333333333" ||
		phone == "44444444444" ||
		phone == "55555555555" ||
		phone == "66666666666" ||
		phone == "77777777777" ||
		phone == "88888888888" ||
		phone == "99999999999"
	) {
		console.log("[phoneValidation] sequência inválida");
		return false;
	}

	console.log("[phoneValidation] telefone válido!");
	return true;
}