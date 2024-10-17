document.getElementById('confirmarFiltro').addEventListener('click', function () {
    const especialidade = document.getElementById('especialidade').value;
    const dataConsulta = document.getElementById('dataConsulta').value;
    const horarioConsulta = document.getElementById('horarioConsulta').value;

    // Aqui você deve implementar a lógica para verificar a disponibilidade
    // Simulação de verificação
    const disponibilidade = Math.random() < 0.5; // 50% de chance de estar ocupado

    const disponibilidadeDiv = document.getElementById('disponibilidade');
    if (disponibilidade) {
        disponibilidadeDiv.innerText = 'Horário ocupado.';
    } else {
        disponibilidadeDiv.innerText = 'Horário disponível.';
    }
});

// Lógica para salvar consultas e listar as consultas de hoje
document.getElementById('salvarConsulta').addEventListener('click', function () {
    const nomePaciente = document.getElementById('nomePaciente').value;
    const responsavel = document.getElementById('responsavel').value;
    const idade = document.getElementById('idade').value;
    const telefone = document.getElementById('telefone').value;
    const especialidade = document.getElementById('especialidadeCadastro').value;
    const consultorio = document.getElementById('consultorio').value;
    const dataConsulta = document.getElementById('dataConsultaCadastro').value;
    const horarioConsulta = document.getElementById('horarioConsultaCadastro').value;
    const recomendacoes = document.getElementById('recomendacoes').value;

    const consultasHoje = document.getElementById('consultasHoje');
    const consultaDiv = document.createElement('div');
    consultaDiv.innerHTML = `
        <strong>${nomePaciente}</strong><br>
        Responsável: ${responsavel}<br>
        Idade: ${idade}<br>
        Telefone: ${telefone}<br>
        Especialidade: ${especialidade}<br>
        Consultório: ${consultorio}<br>
        Data da Consulta: ${dataConsulta}<br>
        Horário: ${horarioConsulta}<br>
        Recomendações: ${recomendacoes}<br>
        <button>Excluir</button>
        <button>Alterar</button>
    `;
    consultasHoje.appendChild(consultaDiv);

    // Limpar os campos após o salvamento
    document.getElementById('nomePaciente').value = '';
    document.getElementById('responsavel').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('especialidadeCadastro').value = '';
    document.getElementById('consultorio').value = 'Consultório 1';
    document.getElementById('dataConsultaCadastro').value = '';
    document.getElementById('horarioConsultaCadastro').value = '';
    document.getElementById('recomendacoes').value = '';
});
