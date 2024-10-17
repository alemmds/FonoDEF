// Função para salvar consulta
function salvarConsulta() {
    const nomePaciente = document.getElementById('nome-paciente').value;
    const responsavel = document.getElementById('responsavel').value;
    const idade = document.getElementById('idade').value;
    const telefone = document.getElementById('telefone').value;
    const especialidade = document.getElementById('especialidade-cadastro').value;
    const consultorio = document.getElementById('consultorio').value;
    const dataConsulta = document.getElementById('data-consulta').value;
    const horario = document.getElementById('horario').value;
    const recomendacoes = document.getElementById('recomendacoes').value;

    if (nomePaciente && responsavel && idade && telefone && especialidade && consultorio && dataConsulta && horario) {
        const consulta = {
            nomePaciente,
            responsavel,
            idade,
            telefone,
            especialidade,
            consultorio,
            dataConsulta,
            horario,
            recomendacoes
        };

        // Armazenando a consulta no localStorage (pode ser adaptado para um banco de dados)
        let consultas = JSON.parse(localStorage.getItem('consultas')) || [];
        consultas.push(consulta);
        localStorage.setItem('consultas', JSON.stringify(consultas));

        alert('Consulta salva com sucesso!');
        limparFormulario();
        mostrarConsultasPorMes();
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}

// Função para limpar o formulário após salvar a consulta
function limparFormulario() {
    document.getElementById('cadastroForm').reset();
}

// Função para filtrar consultas (básico)
function filtrarConsultas() {
    const especialidade = document.getElementById('especialidade').value;
    const data = document.getElementById('data').value;

    if (especialidade && data) {
        let consultas = JSON.parse(localStorage.getItem('consultas')) || [];
        let consultasFiltradas = consultas.filter(c => c.especialidade === especialidade && c.dataConsulta === data);

        if (consultasFiltradas.length > 0) {
            exibirConsultasFiltradas(consultasFiltradas);
        } else {
            alert('Nenhuma consulta encontrada para os critérios informados.');
        }
    } else {
        alert('Por favor, preencha os filtros corretamente.');
    }
}

// Função para exibir consultas filtradas
function exibirConsultasFiltradas(consultas) {
    const consultaContainer = document.getElementById('consultas-diarias');
    consultaContainer.innerHTML = ''; // Limpa o container anterior

    consultas.forEach(consulta => {
        let consultaDiv = document.createElement('div');
        consultaDiv.innerHTML = `
            <p><strong>Paciente:</strong> ${consulta.nomePaciente}</p>
            <p><strong>Responsável:</strong> ${consulta.responsavel}</p>
            <p><strong>Data:</strong> ${consulta.dataConsulta}</p>
            <p><strong>Horário:</strong> ${consulta.horario}</p>
            <p><strong>Especialidade:</strong> ${consulta.especialidade}</p>
            <p><strong>Consultório:</strong> ${consulta.consultorio}</p>
            <button onclick="editarConsulta('${consulta.nomePaciente}')">Editar</button>
            <button onclick="excluirConsulta('${consulta.nomePaciente}')">Excluir</button>
        `;
        consultaContainer.appendChild(consultaDiv);
    });
}

// Função para mostrar as consultas do mês
function mostrarConsultasPorMes() {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    const consultasMesDiv = document.getElementById('consultas-mes-content');
    consultasMesDiv.innerHTML = ''; // Limpar conteúdo anterior

    const meses = {};

    consultas.forEach(consulta => {
        const mesAno = consulta.dataConsulta.slice(0, 7); // Pega o mês e ano da consulta
        if (!meses[mesAno]) {
            meses[mesAno] = [];
        }
        meses[mesAno].push(consulta);
    });

    for (const mes in meses) {
        const mesDiv = document.createElement('div');
        mesDiv.innerHTML = `<h3>${mes}</h3>`;
        meses[mes].forEach(consulta => {
            const diaConsulta = consulta.dataConsulta.slice(8); // Pega o dia da consulta
            const botaoDia = document.createElement('button');
            botaoDia.textContent = diaConsulta;
            botaoDia.onclick = function () {
                mostrarConsultasDoDia(consulta.dataConsulta);
            };
            mesDiv.appendChild(botaoDia);
        });
        consultasMesDiv.appendChild(mesDiv);
    }
}

// Função para mostrar consultas específicas de um dia
function mostrarConsultasDoDia(data) {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    const consultasDoDia = consultas.filter(c => c.dataConsulta === data);
    exibirConsultasFiltradas(consultasDoDia);
}

// Função para editar consulta
function editarConsulta(nomePaciente) {
    let consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    let consulta = consultas.find(c => c.nomePaciente === nomePaciente);
    if (consulta) {
        document.getElementById('nome-paciente').value = consulta.nomePaciente;
        document.getElementById('responsavel').value = consulta.responsavel;
        document.getElementById('idade').value = consulta.idade;
        document.getElementById('telefone').value = consulta.telefone;
        document.getElementById('especialidade-cadastro').value = consulta.especialidade;
        document.getElementById('consultorio').value = consulta.consultorio;
        document.getElementById('data-consulta').value = consulta.dataConsulta;
        document.getElementById('horario').value = consulta.horario;
        document.getElementById('recomendacoes').value = consulta.recomendacoes;

        // Remove a consulta antiga
        excluirConsulta(nomePaciente);
    }
}

// Função para excluir consulta
function excluirConsulta(nomePaciente) {
    let consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    consultas = consultas.filter(c => c.nomePaciente !== nomePaciente);
    localStorage.setItem('consultas', JSON.stringify(consultas));
    mostrarConsultasPorMes();
    alert('Consulta excluída.');
}

// Carregar consultas ao iniciar a página
document.addEventListener('DOMContentLoaded', function () {
    mostrarConsultasPorMes();
});