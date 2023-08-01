$(document).ready(function() {
    function insere_virgula_automatica(value){
        return value.replace(/(\d)(\d{2})$/, '$1,$2') // Coloca a vírgula antes dos últimos 2 dígitos
    }

    $('input[name="valor"]').on('input', function() {
        var value = $(this).val();
        var virgula = insere_virgula_automatica(value);
        $(this).val(virgula);
    });

    $('input[name="valor"]').on('input', function() {
        var value = $(this).val();
        var formattedValue = value.replace(/[^0-9,]/g, ''); // Remover qualquer caractere que não seja número ou vírgula

        var commaIndex = formattedValue.indexOf(',');
        if (commaIndex !== -1) {
            var integerPart = formattedValue.slice(0, commaIndex);
            var decimalPart = formattedValue.slice(commaIndex + 1).replace(/,/g, ''); // Remover outras vírgulas
            decimalPart = decimalPart.substring(0, 2); // Permitir apenas dois dígito após a vírgula
            formattedValue = integerPart + ',' + decimalPart;
        }

        $(this).val(formattedValue);
    });
});

$(document).ready(function() {
    // Validar o valor inserido para aceitar apenas números inteiros
    $('input[name="quantidade"]').on('keypress', function(event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    });
});