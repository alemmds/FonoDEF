const saveButton = document.getElementById("saveButton");
const filterButton = document.getElementById("filterButton");
const consultasDoMes = document.getElementById("consultasDoMes");
const consultasDiarias = document.getElementById("consultasDiarias");

let consultas = [];

saveButton.addEventListener("click", function() {
    const nome = document.getElementById("nome").value;
    const responsavel = document.getElementById("responsavel").value;
    const idade = document.getElementById("idade").value;
    const telefone = document.getElementById("telefone").value;
    const especialidade = document.getElementById("especialidadeCadastro").value;
    const dataConsulta = document.getElementById("dataConsulta").value;
    const horarioConsulta = document.getElementById("horarioConsulta").value;

    if (nome && responsavel && idade && telefone && especialidade && dataConsulta && horarioConsulta) {
        const consulta = {
            nome,
            responsavel,
            idade,
            telefone,
            especialidade,
            data: dataConsulta,
            horario: horarioConsulta
        };

        consultas.push(consulta);
        updateConsultas();
        alert("Consulta salva com sucesso!");
        clearFields();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

filterButton.addEventListener("click", function() {
    const especialidadeFiltro = document.getElementById("especialidade").value;
    const dataFiltro = document.getElementById("data").value;
    const horarioFiltro = document.getElementById("horario").value;

    const resultados = consultas.filter(consulta => {
        return (!especialidadeFiltro || consulta.especialidade === especialidadeFiltro) &&
               (!dataFiltro || consulta.data === dataFiltro) &&
               (!horarioFiltro || consulta.horario === horarioFiltro);
    });

    displayFilteredResults(resultados);
});

function updateConsultas() {
    consultasDoMes.innerHTML = "";
    consultasDiarias.innerHTML = "";
    const hoje = new Date().toISOString().split("T")[0];
    
    consultas.forEach(consulta => {
        const dia = new Date(consulta.data).getDate();
        const mes = new Date(consulta.data).getMonth() + 1;
        const ano = new Date(consulta.data).getFullYear();

        // Adiciona a consulta ao mês
        let mesDiv = document.getElementById(`mes${mes}`);
        if (!mesDiv) {
            mesDiv = document.createElement("div");
            mesDiv.id = `mes${mes}`;
            mesDiv.innerHTML = `<h3>Mês: ${mes}/${ano}</h3>`;
            consultasDoMes.appendChild(mesDiv);
        }
        
        mesDiv.innerHTML += `<button onclick="showDay(${dia}, '${consulta.data}')">${dia}</button>`;

        // Adiciona a consulta ao dia
        if (consulta.data === hoje) {
            consultasDiarias.innerHTML += `<div>${consulta.nome} - ${consulta.horario} <button onclick="editConsulta('${consulta.nome}')">Editar</button><button onclick="deleteConsulta('${consulta.nome}')">Excluir</button></div>`;
        }
    });
}

function showDay(dia, data) {
    const diaConsultas = consultas.filter(consulta => consulta.data === data);
    const resultDiv = document.createElement("div");
    resultDiv.innerHTML = `<h4>Consultas do dia ${dia}:</h4>`;
    diaConsultas.forEach(consulta => {
        resultDiv.innerHTML += `<div>${consulta.nome} - ${consulta.horario} <button onclick="editConsulta('${consulta.nome}')">Editar</button><button onclick="deleteConsulta('${consulta.nome}')">Excluir</button></div>`;
    });
    consultasDoMes.appendChild(resultDiv);
}

function displayFilteredResults(resultados) {
    // Limpa resultados anteriores
    const resultadoDiv = document.createElement("div");
    resultadoDiv.innerHTML = "<h3>Resultados do Filtro:</h3>";
    
    if (resultados.length > 0) {
        resultados.forEach(consulta => {
            resultadoDiv.innerHTML += `<div>${consulta.nome} - ${consulta.data} ${consulta.horario}</div>`;
        });
    } else {
        resultadoDiv.innerHTML += "<div>Nenhum resultado encontrado.</div>";
    }
    consultasDoMes.appendChild(resultadoDiv);
}

function clearFields() {
    document.getElementById("nome").value = "";
    document.getElementById("responsavel").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("especialidadeCadastro").value = "";
    document.getElementById("dataConsulta").value = "";
    document.getElementById("horarioConsulta").value = "";
}

function editConsulta(nome) {
    // Função para editar a consulta
    const consulta = consultas.find(c => c.nome === nome);
    if (consulta) {
        // Exibir os dados da consulta nos campos
        document.getElementById("nome").value = consulta.nome;
        document.getElementById("responsavel").value = consulta.responsavel;
        document.getElementById("idade").value = consulta.idade;
        document.getElementById("telefone").value = consulta.telefone;
        document.getElementById("especialidadeCadastro").value = consulta.especialidade;
        document.getElementById("dataConsulta").value = consulta.data;
        document.getElementById("horarioConsulta

").value = consulta.horario;
        
        // Remover a consulta atual do array
        deleteConsulta(nome);
    }
}

function deleteConsulta(nome) {
    consultas = consultas.filter(c => c.nome !== nome);
    updateConsultas();
}