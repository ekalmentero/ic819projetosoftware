(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

function verificarSenhas() {
    var senhaNova = document.getElementById("password").value;
    var confirmeSenhaNova = document.getElementById("confirm_password").value;

    var senhaMessage = document.getElementById("senhaMessage");
    var confirmeSenhaMessage = document.getElementById("confirmeSenhaMessage");

    if (senhaNova !== confirmeSenhaNova) {
        senhaMessage.innerText = "As senhas não coincidem. Por favor, verifique novamente.";
        confirmeSenhaMessage.innerText = "As senhas não coincidem. Por favor, verifique novamente.";
    } else {
        senhaMessage.innerText = "";
        confirmeSenhaMessage.innerText = "";
    }
}

const descricaoTextareas = document.querySelectorAll('.descricao');
descricaoTextareas.forEach(function(descricaoTextarea) {
    const descricaoFeedback = descricaoTextarea.parentElement.querySelector('.invalid-feedback');

    descricaoTextarea.addEventListener('input', function() {
        const descricao = descricaoTextarea.value;

        if(descricao.length === 0){
            descricaoTextarea.setCustomValidity('O campo descrição é obrigatório.');
        } else if (descricao.length < 10) {
            descricaoTextarea.setCustomValidity('O campo descrição deve ter no mínimo 10 caracteres.');
        } else if (descricao.length > 255) {
            descricaoTextarea.setCustomValidity('O campo descrição deve ter no máximo 255 caracteres.');
        } else {
            descricaoTextarea.setCustomValidity('');
        }
        descricaoFeedback.textContent = descricaoTextarea.validationMessage;
    });
});


const quantidadeInputs = document.querySelectorAll('.quantidade');
quantidadeInputs.forEach(function(quantidadeInput) {
    quantidadeInput.addEventListener('input', function() {
        quantidadeInput.value = quantidadeInput.value.replace(/\D/g, '');
    });
});
function validarDataNascimento() {
    var inputNascimento = document.getElementById('datanascimento');

    inputNascimento.addEventListener('change', function() {
        var dataNascimento = new Date(inputNascimento.value);
        var dataAtual = new Date();
        var idade = dataAtual.getFullYear() - dataNascimento.getFullYear();

        // Verificar se a idade está entre 13 e 130 anos
        if (idade >= 13 && idade <= 130) {
            // A data de nascimento é válida
            inputNascimento.setCustomValidity('');
        } else {
            // A data de nascimento não é válida
            inputNascimento.setCustomValidity('A data de nascimento deve corresponder a uma idade entre 13 e 130 anos.');
        }
    });
}





//Repare que os modais têm os seguintes seletores:
//
// Modal de adicionar funcionário: #addEmployeeModal
// Modal de editar funcionário: #editEmployeeModal
function setupValidation(modalSelector) {
    //Busca todos os formulários aos quais queremos aplicar estilos personalizados de validação de Bootstrap
    const forms = document.querySelectorAll(
        `${modalSelector} .needs-validation`
    );

    // Faz um loop sobre eles e evita submissão
    Array.from(forms).forEach((form) => {
        form.addEventListener("submit", (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add("was-validated");
        }, false);
    });

    // Opção 1 - "ontem" pois "hoje" dava problema. Aí segue a regra de negócio agora:
    const validarDatasIniciaiseFinais = () => {
        const dataInicialInput = document.querySelector(
            `${modalSelector} [name="data_inicial"]`
        );
        const dataFinalInput = document.querySelector(
            `${modalSelector} [name="data_final"]`
        );

        const dataInicial = dataInicialInput.value;
        const dataFinal = dataFinalInput.value;

        const invalidFeedbackInicial = document.querySelectorAll(
            `${modalSelector} .invalid-feedback`
        )[1];
        const invalidFeedbackFinal = document.querySelectorAll(
            `${modalSelector} .invalid-feedback`
        )[2];

        const hoje = new Date();
        const ontem = new Date(hoje);
        ontem.setDate(ontem.getDate() - 1);

        const dataInicialValida = new Date(dataInicial) <= hoje;
        const dataFinalValida = !dataFinal || new Date(dataFinal) > ontem || new Date(dataFinal).toDateString() === ontem.toDateString();

        if (
            dataInicial &&
            dataInicialValida &&
            dataFinalValida
        ) {
            invalidFeedbackInicial.style.display = "none";
            invalidFeedbackFinal.style.display = "none";
            dataInicialInput.setCustomValidity("");
            dataFinalInput.setCustomValidity("");
            return true;
        } else {
            if (!dataInicial || !dataInicialValida) {
                invalidFeedbackInicial.textContent =
                    "A data INICIAL deve ser válida e anterior ou igual à data atual.";
                invalidFeedbackInicial.style.display = "block";
                invalidFeedbackFinal.style.display = "none";
                dataFinalInput.setCustomValidity("");
                dataInicialInput.setCustomValidity(
                    "A data INICIAL deve ser válida e anterior ou igual à data atual."
                );
            } else {
                invalidFeedbackInicial.style.display = "none";
                invalidFeedbackFinal.textContent =
                    "A data FINAL deve ser igual ou posterior à data atual.";
                invalidFeedbackFinal.style.display = "block";
                dataInicialInput.setCustomValidity("");
                dataFinalInput.setCustomValidity("Campo obrigatório");
            }
            return false;
        }
    };


    // Event listener para o botão de envio
    const botaoEnviar = document.querySelector(
        `${modalSelector} .botaoEnviar`
    );
    botaoEnviar.addEventListener("click", (event) => {
        if (!validarDatasIniciaiseFinais()) {
            event.preventDefault();
        }
    });

    // Event listener para o input de data inicial
    const dataInicialInput = document.querySelector(
        `${modalSelector} [name="data_inicial"]`
    );
    dataInicialInput.addEventListener("input", validarDatasIniciaiseFinais);

    // Event listener para o input de data final
    const dataFinalInput = document.querySelector(
        `${modalSelector} [name="data_final"]`
    );
    dataFinalInput.addEventListener("input", validarDatasIniciaiseFinais);
}

// Chamadas para configurar a validação em cada modal específico



const tituloTextareas = document.querySelectorAll('.titulo');
tituloTextareas.forEach(function(tituloTextarea) {
    const tituloFeedback = tituloTextarea.parentElement.querySelector('.invalid-feedback');

    tituloTextarea.addEventListener('input', function() {
        const titulo = tituloTextarea.value;
        console.log(tituloTextarea.value);

        if(titulo.length === 0){
            tituloTextarea.setCustomValidity('O campo titulo é obrigatório.');
        } else if (titulo.length < 5) {
            tituloTextarea.setCustomValidity('O campo titulo deve ter no mínimo 5 caracteres.');
        } else if (titulo.length > 50) {
            tituloTextarea.setCustomValidity('O campo titulo deve ter no máximo 50 caracteres.');
        } else {
            tituloTextarea.setCustomValidity('');
        }
        tituloFeedback.textContent = tituloTextarea.validationMessage;
    });
});

const linkTextareas = document.querySelectorAll('.link');

linkTextareas.forEach(function(linkTextarea) {
    const linkFeedback = linkTextarea.parentElement.querySelector('.invalid-feedback');

    linkTextarea.addEventListener('input', function() {
        const link = linkTextarea.value;

        let re2 = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/
        //let re = new RegExp("^((http(s?):\/\/(www.)?[a-z]+.com\/)|(magnet:\?xt=urn:btih:))");


        if (!re2.test(link)) {
            linkTextarea.setCustomValidity('Insira uma URL válida!');
        }else {
            linkTextarea.setCustomValidity('');

        }

        /*if(titulo.length === 0){
            tituloTextareas.setCustomValidity('O campo titulo é obrigatório.');
        } else if (titulo.length < 5) {
            tituloTextareas.setCustomValidity('O campo titulo deve ter no mínimo 5 caracteres.');
        } else if (titulo.length > 50) {
            tituloTextareas.setCustomValidity('O campo titulo deve ter no máximo 50 caracteres.');
        } else {
            tituloTextareas.setCustomValidity('');
        } */
        linkFeedback.textContent = linkTextarea.validationMessage;
    });
})

const dataInput =  document.querySelectorAll('.data');

dataInput.forEach(function(dataInput) {
    const dataFeedback = dataInput.parentElement.querySelector('.invalid-feedback');

    dataInput.addEventListener('input', function() {
        const data = new Date(dataInput.value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        console.log(data);
        let datateste= new Date(dataInput.value); // javascript não compara data tipo pt-BR

        let dataAtual = new Date();


        let dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])/;

        if(datateste <= dataAtual) {
            // Matching the date through regular expression
            if (data.match(dateformat) && data <= dataAtual) {
                let operator = data.split('/');

                // Extract the string into month, date and year
                let datepart = [];
                if (operator.length > 1) {
                    datepart = data.split('/');
                }
                let day = parseInt(datepart[0]);
                let month = parseInt(datepart[1]);
                let year = parseInt(datepart[2]);

                // Create a list of days of a month
                let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if (month == 1 || month > 2) {
                    if (day > ListofDays[month - 1]) {
                        //to check if the date is out of range
                        dataInput.setCustomValidity('Insira uma data válida!');
                    }
                } else if (month == 2) {
                    let leapYear = false;
                    if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
                    if ((leapYear == false) && (day >= 29)) {
                        dataInput.setCustomValidity('Insira uma data válida!');
                    } else if ((leapYear == true) && (day > 29)) {
                        dataInput.setCustomValidity('Insira uma data válida!');
                    }
                }
            } else {
                dataInput.setCustomValidity('Insira uma data válida!');
            }
            dataInput.setCustomValidity('');
        } else{
            dataInput.setCustomValidity('Insira uma data válida!');
        }

        dataFeedback.textContent = dataInput.validationMessage;
    });
})

const lattesTextareas = document.querySelectorAll('#lattes');

lattesTextareas.forEach(function(latteTextarea) {
    const latteFeedback = latteTextarea.parentElement.querySelector('.invalid-feedback');

    latteTextarea.addEventListener('input', function() {
        const latte = latteTextarea.value;

        let re2 = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        console.log(latteTextarea.value);

        if (!re2.test(latte)) {
            latteTextarea.setCustomValidity('Digite uma URL válida ex:(http://www.exemplo.com).');
        }else {
            latteTextarea.setCustomValidity('');

        }

        latteFeedback.textContent = latteTextarea.validationMessage;
    });
})


setupValidation("#addEmployeeModal");
setupValidation("#editEmployeeModal");
