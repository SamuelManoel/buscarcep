// Variavel que irá recceber o valor do CEP digitado
let cepDigitado;

/**
 * Função para buscar os dados do CEP inserido
 */
function buscaDadosDoCep() {
    //Nova variável "cep" somente com dígitos.
    var cep = cepDigitado.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            $("#rua").val("Carregando...");
            $("#bairro").val("Carregando...");
            $("#cidade").val("Carregando...");
            //     $("#uf").val("...");
            //    $("#ibge").val("...");

            //Consulta o webservice viacep.com.br/
            $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                if (!("erro" in dados)) {
                    //Atualiza os campos com os valores da consulta.
                    $("#rua").val(dados.logradouro);
                    $("#bairro").val(dados.bairro);
                    $("#cidade").val(dados.localidade);
                    //$("#uf").val(dados.uf);
                    //$("#ibge").val(dados.ibge);
                } //end if.
                else {
                    //CEP pesquisado não foi encontrado.
                    limpa_formulário_cep();
                    alert("CEP não encontrado.");
                }
            });
        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
}

/**
 * Limpa valores do formulário de cep.
 */
function limpa_formulário_cep() {
    $("#rua").val("Faça uma pesquisa...");
    $("#bairro").val("Faça uma pesquisa...");
    $("#cidade").val("Faça uma pesquisa...");
    $("#uf").val("");
    $("#ibge").val("");
}

/**
 * Usar o document.ready para adicionar apenas esse observaveis nos evetos dos campos, como o .keyup e .blur
 * Qualquer outra declaração de função faça fora do escopo do document.ready.
 */
$(document).ready(function () {
    $("input#buscar").keyup(function (ev) {
        // Atribui ao CEP o valor digitado no campo.
        cepDigitado = ev.target.value;
        // Se a tecla apertada for 13 é o enter, vai buscar o endereço do CEP
        if (ev.keyCode === 13) {
            buscaDadosDoCep();
        } else {
            // Se não, checa o valor para alterar o olho
            if ($(this).val() == '') {
                $("#olho-aberto").hide();
                $("#olho-fechado").show();
            } else {
                $("#olho-aberto").show();
                $("#olho-fechado").hide();
            }
        }
    });

    /**
     * Quando o campo cep perde o foco já executa a função de buscar os dados do CEP.
     * Creio que chamar uma função dessa forma direto no callback seja permitido em todos os browsers, se não descomentar código abaixo
     */
    $("#buscar").blur(buscaDadosDoCep);

    /**
     * APENAS SE O CÓDIGO ACIMA NÃO FUNCIONAR
     * $("#buscar").blur(function () { buscaDadosDoCep();});
     */
});