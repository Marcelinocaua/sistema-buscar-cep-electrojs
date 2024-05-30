
//Pegando os elemento do HTML pelo ID
var formulario = document.getElementById('formulario');
var CEP = document.getElementById('CEP')
var tbody = document.getElementById("tbody")

var listadeceps = [];

//função responsavel por buscar o cep
function buscarcep(event) {

    //previne o comportamento padão do formulario
    event.preventDefault();

    //pegando o valor do INPUT do cep
    var valordocep = CEP.value;

    //FAZENDO UMA REQUISIÇÃO PARA API VIA CEP
    fetch(`https://viacep.com.br/ws/${valordocep}/json/`)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            //add o cep na lista de ceps
            listadeceps.push(data)

            console.log(listadeceps);

            var novalinha = tbody.insertRow();
            var celulacep = novalinha.insertCell(0);
            var celulalogradouro = novalinha.insertCell(1);
            var celulabairro = novalinha.insertCell(2);
            var celulalocalidade = novalinha.insertCell(3);
            var celulauf = novalinha.insertCell(4);

            listadeceps.forEach(item => {

                celulacep.innerText = item.cep;
                celulalogradouro.innerText = item.logradouro ? item.logradouro : '-----'
                celulabairro.innerText = item.bairro ? item.bairro: '-----'
                celulalocalidade.innerText = item.localidade;
                celulauf.innerText = item.uf;
            })


            //pegando o elemento do HTML pelo ID
            // var resultado = document.getElementById("resultado")

            //adicionando o conteudo no HTML
            // resultado.innerText = `CEP: ${data.cep}- ${data.logradouro}, ${data.bairro}, ${data.localidade}- ${data.uf}`;
        });

    console.log(valordocep);
}


function mascaracep(event) {
    event.currentTarget.maxLength = 9
    let value = event.currentTarget.value
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{5})(\d)/, '$1-$2')
    event.currentTarget.value = value
    return event
}
CEP.addEventListener("keyup", mascaracep);

//adicionando um evento de SUBMIT (envio) no formulario
formulario.addEventListener('submit', buscarcep)
