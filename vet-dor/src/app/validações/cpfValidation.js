// Verificar se o cpf é válido
// validar o cpf consiste em verificar se o último e o penúltimo dígitos batem com a operação:
// multiplicar os 9 primeiros dígitos por uma sequência decrescente de 10 a 2 e somar os resultados (digito_1 * 10 + digito_2* 9 + ... + digito_9 * 2)
// depois, pegar o resultado, multiplicar por 10 e dividir por 11
// o resto dessa primeira parte deve ser igual ao penúltimo dígito.

// para validar o último dígito, é preciso multiplicar os 9 primeiros dígitos e o penúltimo dígito por uma sequência decrescente de 11 a 2 (digito_1 * 11 + digito_2* 10 + ... + digito_10 * 2)
// depois, pegar o resultado, multiplicar por 10 e dividir por 11
// o resto dessa segunda parte parte deve ser igual ao último dígito.

export default function isCpfValid(cpf) {
	console.log(`[cpfValidation] cpf = ${cpf}`);

	// retirar caracteres inválidos
	cpf = cpf.toString().replace(/[^\d]+/g, "");

	console.log(`[cpfValidation] (depois) cpf = ${cpf}`);

	// verificar o tamanho e o tipo do valor
	// eslint-disable-next-line no-restricted-globals
	if (isNaN(cpf) || cpf.length !== 11) {
		console.log("[cpfValidation] cpf.isNaN() || cpf.length !== 11");
		return false;
	}

	// descartar uma possibilidade inválida
	if (cpf === "00000000000") {
		console.log("[cpfValidation] cpf === 00000000000");
		return false;
	}

	// validação do penúltimo dígito
	let secondToLastDigit = 0;
	let lastDigit = 0;

	let i = 10;
	let j = 0;
	for (; i > 1; i--, j++) {
		secondToLastDigit += parseInt(cpf[j]) * i;
	}

	secondToLastDigit *= 10;
	secondToLastDigit %= 11;

	if (secondToLastDigit === 10) secondToLastDigit = 0;

	if (secondToLastDigit.toString() !== cpf[9]) {
		console.log("[cpfValidation] secondToLastDigit.toString() !== cpf[9]");
		return false;
	}

	// validação do último dígito
	i = 11;
	j = 0;

	for (; i > 1; i--, j++) {
		lastDigit += (parseInt(cpf[j]) * i);
	}

	lastDigit *= 10;
	lastDigit %= 11;

	if (lastDigit === 10) lastDigit = 0;

	if (lastDigit.toString() !== cpf[10]) {
		console.log("[cpfValidation] lastDigit.toString() !== cpf[10]");
		return false;
	}

	console.log("[cpfValidation] cpf válido!");

	return true;
}
