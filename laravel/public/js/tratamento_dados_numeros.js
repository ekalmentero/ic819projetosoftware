function limitDigits(input, maxLength) {

    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength);
    }
}

function limitInput(input, maximo) {
    input.value = input.value.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
    let maxValue = maximo; // Defina o valor máximo permitido (6 dígitos)
    let numericValue = parseInt(input.value, 10); // Converte o valor para um número inteiro
    
    // Verifica se o valor excede o valor máximo
    if (numericValue > maxValue) {
        input.value = String(maxValue); // Define o valor como o valor máximo
    }
}  