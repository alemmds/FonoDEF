// Script para atualizar a data do sistema
document.getElementById('dataConsulta').valueAsDate = new Date();

// Simulação do banco de dados no localStorage
let consultas = JSON.parse(localStorage.getItem('consultas')) || [];

// Função para salvar uma consulta
document.getElementById('salvarConsulta').addEventListener('click', function () {
    const consulta = {
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

// Função para exibir as consultas
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
                    <button class="excluir">Excluir</button>
                    <button class="alterar">Alterar</button>
                </div>
            `;
        }
    });
}

displayConsultas();
