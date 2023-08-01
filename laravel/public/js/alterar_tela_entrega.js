var tipoSelect = document.getElementById("entrega");
var retirar_estabelecimento_div = document.getElementById("retirar_estabelecimento");
var entregar_endereco_div = document.getElementById("entregar_endereco");

tipoSelect.addEventListener("change", function() {
    if (tipoSelect.value === "Retirar no estabelecimento") {
        retirar_estabelecimento_div.style.display = "block";
        entregar_endereco_div.style.display = "none";
    } else if (tipoSelect.value === "Entregar em endereço selecionado") {
        retirar_estabelecimento_div.style.display = "none";
        entregar_endereco_div.style.display = "block";
    } else {
        retirar_estabelecimento_div.style.display = "none";
        entregar_endereco_div.style.display = "none";
    }
});