'use strict';

//async -> incdica que é uma função assíncrona, ou seja, ela é executada em segundo plano, deixando as outras linhas do código serem executadas
const pesquisarCep = async (cep) => {
    //com o acento grave, ele aceita variáveis dentro da url, se não precisarmos colocar variáveis, as aspas já funcionam
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    //faz uma requisição para essa url
    //await faz a variável esperar ter algum valor para a executar
    const resposta = await fetch(url);

    const endereco = await resposta.json();
    return endereco;
};

const limparFormulario = () => {
    const endereco = pesquisarCep(cep);
    document.querySelector('#endereco').value = '';
    document.querySelector('#bairro').value = '';
    document.querySelector('#cidade').value = '';
    document.querySelector('#estado').value = '';
};

const cepValido = (cep) => /^[0-9]{8}$/.test(cep);

const preencherFormulario = async () => {
    const cep = document.querySelector('#cep').value.replace('-', '');
    if (cepValido(cep)) {
        const endereco = await pesquisarCep(cep);
        document.querySelector('#endereco').value = endereco.logradouro;
        document.querySelector('#bairro').value = endereco.bairro;
        document.querySelector('#cidade').value = endereco.localidade;
        document.querySelector('#estado').value = endereco.uf;
    } else {
        limparFormulario();
        document.querySelector('#endereco').value = 'CEP incorreto!';
    }
};

document
    .querySelector('#cep')
    .addEventListener('focusout', preencherFormulario);
