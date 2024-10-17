document.getElementById('consultaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const responsavel = document.getElementById('responsavel').value;
    const idade = document.getElementById('idade').value;
    const telefone = document.getElementById('telefone').value;
    const especialidade = document.getElementById('especialidade').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;

    // Verifica se já existe consulta no mesmo horário para o paciente
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    const consultaExistente = consultas.find(consulta => consulta.nome === nome && consulta.data === data && consulta.horario === horario);
    
    if (consultaExistente) {
        alert('Este paciente já tem uma consulta marcada neste horário!');
        return;
    }

    const novaConsulta = { nome, responsavel, idade, telefone, especialidade, data, horario };
    consultas.push(novaConsulta);
    localStorage.setItem('consultas', JSON.stringify(consultas));

    alert('Consulta salva com sucesso!');
    this.reset();
    mostrarConsultasMes();
});

// Exibir consultas diárias
document.getElementById('consultasDiarias').addEventListener('click', function() {
    const hoje = new Date().toISOString().split('T')[0]; // Obtém a data de hoje
    mostrarConsultas('diarias', hoje);
});

// Exibir consultas do mês
document.getElementById('consultasMes').addEventListener('click', function() {
    mostrarConsultasMes();
});

function mostrarConsultas(tipo, filtroData = null) {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    let resultadoHTML = '';

    if (consultas.length === 0) {
        resultadoHTML = '<p>Nenhuma consulta encontrada.</p>';
    } else {
        consultas.forEach(consulta => {
            if (tipo === 'diarias' && consulta.data === filtroData) {
                resultadoHTML += gerarHtmlConsulta(consulta);
            } else if (tipo === 'mes') {
                resultadoHTML += gerarHtmlConsulta(consulta);
            }
        });
    }

    document.getElementById('listaConsultas').innerHTML = resultadoHTML;
}

function gerarHtmlConsulta(consulta) {
    return `
        <div class="consulta-item">
            <p><strong>Nome:</strong> ${consulta.nome}</p>
            <p><strong>Responsável:</strong> ${consulta.responsavel}</p>
            <p><strong>Idade:</strong> ${consulta.idade}</p>
            <p><strong>Telefone:</strong> ${consulta.telefone}</p>
            <p><strong>Especialidade:</strong> ${consulta.especialidade}</p>
            <p><strong>Data:</strong> ${consulta.data}</p>
            <p><strong>Horário:</strong> ${consulta.horario}</p>
            <button class="excluir" onclick="excluirConsulta('${consulta.nome}', '${consulta.data}', '${consulta.horario}')">Excluir</button>
        </div>
    `;
}

function mostrarConsultasMes() {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    const consultasPorDia = {};
    
    // Organiza consultas por dia
    consultas.forEach(consulta => {
        if (!consultasPorDia[consulta.data]) {
            consultasPorDia[consulta.data] = [];
        }
        consultasPorDia[consulta.data].push(consulta);
    });

    let resultadoHTML = '';
    
    Object.keys(consultasPorDia).forEach(dia => {
        resultadoHTML += `<h3 onclick="toggleConsultas('${dia}')">${dia}</h3>`;
        resultadoHTML += `<div id="${dia}" class="minimizar-maximizar">`;
        consultasPorDia[dia].forEach(consulta => {
            resultadoHTML += gerarHtmlConsulta(consulta);
        });
        resultadoHTML += `</div>`;
    });

    document.getElementById('listaConsultas').innerHTML = resultadoHTML;
}

function toggleConsultas(dia) {
    const div = document.getElementById(dia);
    if (div.classList.contains('visible')) {
        div.classList.remove('visible');
    } else {
        div.classList.add('visible');
    }
}

function excluirConsulta(nome, data, horario) {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    const novasConsultas = consultas.filter(consulta => !(consulta.nome === nome && consulta.data === data && consulta.horario === horario));
    localStorage.setItem('consultas', JSON.stringify(novasConsultas));
    mostrarConsultasMes();
}