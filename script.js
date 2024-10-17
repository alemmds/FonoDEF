const consultaForm = document.getElementById('consultaForm');
const consultasDoMes = document.getElementById('consultasPorMes');
const consultasDiariasContainer = document.getElementById('consultasDiariasContainer');
const filtroButton = document.getElementById('confirmarFiltro');
const resultadosDoFiltro = document.getElementById('resultadosDoFiltro');

let consultas = [];

// Função para salvar consulta
consultaForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const especialidade = document.getElementById('especialidade').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;
    const consultorio = document.getElementById('consultorio').value;
    const idade = document.getElementById('idade').value;

    const novaConsulta = {
        nome, especialidade, data, horario, consultorio, idade, status: 'Disponível'
    };

    consultas.push(novaConsulta);
    updateConsultas();
    consultaForm.reset();
});

// Função para exibir consultas cadastradas
function updateConsultas() {
    consultasDoMes.innerHTML = '';
    consultasDiariasContainer.innerHTML = '';

    consultas.forEach(consulta => {
        const dia = new Date(consulta.data).getDate();
        const mes = new Date(consulta.data).getMonth() + 1;
        const ano = new Date(consulta.data).getFullYear();

        let consultaDiv = document.createElement('div');
        consultaDiv.innerHTML = `
            <strong>Data:</strong> ${dia}/${mes}/${ano} - <strong>Horário:</strong> ${consulta.horario} <br>
            <strong>Paciente:</strong> ${consulta.nome}, <strong>Idade:</strong> ${consulta.idade}, 
            <strong>Consultório:</strong> ${consulta.consultorio}<br>
            <button class="edit-btn" onclick="editConsulta('${consulta.nome}')">Alterar</button>
            <button class="delete-btn" onclick="deleteConsulta('${consulta.nome}')">Excluir</button>
        `;
        consultasDoMes.appendChild(consultaDiv);
    });
}

// Função para filtrar consultas por especialidade, data e horário
filtroButton.addEventListener('click', function () {
    const especialidade = document.getElementById('filtroEspecialidade').value;
    const data = document.getElementById('filtroData').value;
    const horario = document.getElementById('filtroHorario').value;

    const resultados = consultas.filter(consulta => {
        return (!especialidade || consulta.especialidade === especialidade) &&
               (!data || consulta.data === data) &&
               (!horario || consulta.horario === horario);
    });

    displayFilteredResults(resultados);
});

// Exibir resultados filtrados
function displayFilteredResults(resultados) {
    resultadosDoFiltro.innerHTML = '';
    if (resultados.length > 0) {
        resultados.forEach(consulta => {
            resultadosDoFiltro.innerHTML += `
                <div>
                    Paciente: ${consulta.nome} - ${consulta.data} ${consulta.horario} - Status: ${consulta.status}
                </div>`;
        });
    } else {
        resultadosDoFiltro.innerHTML = "<div>Nenhum resultado encontrado.</div>";
    }
}

// Função para excluir uma consulta
function deleteConsulta(nome) {
    consultas = consultas.filter(consulta => consulta.nome !== nome);
    updateConsultas();
}

// Função para editar uma consulta (abrir formulário com dados da consulta)
function editConsulta(nome) {
    const consulta = consultas.find(consulta => consulta.nome === nome);
    if (consulta) {
        document.getElementById('nome').value = consulta.nome;
        document.getElementById('especialidade').value = consulta.especialidade;
        document.getElementById('data').value = consulta.data;
        document.getElementById('horario').value = consulta.horario;
        document.getElementById('consultorio').value = consulta.consultorio;
        document.getElementById('idade').value = consulta.idade;
    }
}