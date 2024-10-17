// Atualiza a data do sistema ao carregar a página
document.getElementById('dataConsulta').valueAsDate = new Date();

// Simulação do banco de dados no localStorage
let consultas = JSON.parse(localStorage.getItem('consultas')) || [];

// Função para salvar uma consulta
document.getElementById('salvarConsulta').addEventListener('click', function () {
    const consulta = {
        id: Date.now(),  // Gera um ID único baseado no tempo
        nome: document.getElementById('nome').value,
        responsavel: document.getElementById('responsavel').value,
        idade: document.getElementById('idade').value,
        telefone: document.getElementById('telefone').value,
        especialidade: document.getElementById('especialidade').value,
        consultorio: document.getElementById('consultorio').value,
        data: document.getElementById('dataConsulta').value,
        horario: document.getElementById('horarioConsulta').value,
        recomendacoes: document.getElementById('recomendacoes').value
    };
    
    consultas.push(consulta);
    localStorage.setItem('consultas', JSON.stringify(consultas));
    alert('Consulta salva com sucesso!');
    displayConsultas();
    displayConsultasPorMes();
});

// Função para filtrar consultas
document.getElementById('filterButton').addEventListener('click', function () {
    const especialidade = document.getElementById('filterEspecialidade').value;
    const data = document.getElementById('filterDate').value;
    const horario = document.getElementById('filterTime').value;
    
    const filtered = consultas.filter(consulta => {
        return consulta.especialidade === especialidade && 
               consulta.data === data && 
               consulta.horario === horario;
    });

    const resultDiv = document.getElementById('filterResult');
    if (filtered.length > 0) {
        resultDiv.innerHTML = '<p>Horário ocupado.</p>';
    } else {
        resultDiv.innerHTML = '<p>Horário disponível.</p>';
    }
});

// Função para exibir as consultas de hoje
function displayConsultas() {
    const consultasHojeDiv = document.getElementById('consultasHoje');
    consultasHojeDiv.innerHTML = '';

    const hoje = new Date().toISOString().split('T')[0];
    consultas.forEach(consulta => {
        if (consulta.data === hoje) {
            consultasHojeDiv.innerHTML += `
                <div class="consulta">
                    <p><strong>${consulta.nome}</strong></p>
                    <p>Responsável: ${consulta.responsavel}</p>
                    <p>Idade: ${consulta.idade}</p>
                    <p>Telefone: ${consulta.telefone}</p>
                    <p>Especialidade: ${consulta.especialidade}</p>
                    <p>Consultório: ${consulta.consultorio}</p>
                    <p>Data da Consulta: ${consulta.data}</p>
                    <p>Horário: ${consulta.horario}</p>
                    <p>Recomendações: ${consulta.recomendacoes}</p>
                    <button class="excluir" onclick="excluirConsulta(${consulta.id})">Excluir</button>
                    <button class="alterar" onclick="alterarConsulta(${consulta.id})">Alterar</button>
                </div>
            `;
        }
    });
}

// Função para exibir as consultas agendadas por mês
function displayConsultasPorMes() {
    const consultasPorMesDiv = document.getElementById('consultasPorMes');
    consultasPorMesDiv.innerHTML = '';

    const consultasAgrupadas = consultas.reduce((acc, consulta) => {
        const mes = new Date(consulta.data).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        if (!acc[mes]) {
            acc[mes] = [];
        }
        acc[mes].push(consulta);
        return acc;
    }, {});

    for (const mes in consultasAgrupadas) {
        consultasPorMesDiv.innerHTML += `<h3>${mes}</h3>`;
        consultasAgrupadas[mes].forEach(consulta => {
            consultasPorMesDiv.innerHTML += `
                <div class="consulta-mes">
                    <p><strong>${consulta.nome}</strong> - ${consulta.data} às ${consulta.horario}</p>
                    <p>Especialidade: ${consulta.especialidade}</p>
                    <p>Consultório: ${consulta.consultorio}</p>
                    <button class="excluir" onclick="excluirConsulta(${consulta.id})">Excluir</button>
                    <button class="alterar" onclick="alterarConsulta(${consulta.id})">Alterar</button>
                </div>
            `;
        });
    }
}

// Função para excluir uma consulta
function excluirConsulta(id) {
    consultas = consultas.filter(consulta => consulta.id !== id);
    localStorage.setItem('consultas', JSON.stringify(consultas));
    displayConsultas();
    displayConsultasPorMes();
}

// Função para alterar uma consulta
function alterarConsulta(id) {
    const consulta = consultas.find(consulta => consulta.id === id);
    
    document.getElementById('nome').value = consulta.nome;
    document.getElementById('responsavel').value = consulta.responsavel;
    document.getElementById('idade').value = consulta.idade;
    document.getElementById('telefone').value = consulta.telefone;
    document.getElementById('especialidade').value = consulta.especialidade;
    document.getElementById('consultorio').value = consulta.consultorio;
    document.getElementById('dataConsulta').value = consulta.data;
    document.getElementById('horarioConsulta').value = consulta.horario;
    document.getElementById('recomendacoes').value = consulta.recomendacoes;

    excluirConsulta(id);  // Remove a consulta antiga para substituí-la pela nova ao salvar
}

// Exibe as consultas ao carregar a página
displayConsultas();
displayConsultasPorMes();
