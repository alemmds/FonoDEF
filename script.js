// Array para armazenar as consultas
let consultas = [];

// Função para salvar uma nova consulta
document.getElementById('salvarConsulta').addEventListener('click', () => {
    const nomePaciente = document.getElementById('nomePaciente').value;
    const responsavel = document.getElementById('responsavel').value;
    const idade = document.getElementById('idade').value;
    const consultorio = document.getElementById('consultorio').value;
    const especialidade = document.getElementById('especialidade').value;
    const dataConsulta = document.getElementById('dataConsulta').value;
    const horario = document.getElementById('horario').value;

    if (nomePaciente && responsavel && dataConsulta && horario) {
        const novaConsulta = {
            nomePaciente,
            responsavel,
            idade,
            consultorio,
            especialidade,
            dataConsulta,
            horario
        };

        consultas.push(novaConsulta);
        alert('Consulta salva com sucesso!');
        atualizarConsultasMes();
        atualizarResultadoFiltro();
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});

// Atualiza a lista de consultas do mês
function atualizarConsultasMes() {
    const consultasMes = document.getElementById('consultasMes');
    consultasMes.innerHTML = '';

    const mesAtual = new Date().toLocaleString('default', { month: 'long' });
    const anoAtual = new Date().getFullYear();

    consultas.forEach(consulta => {
        const dataConsulta = new Date(consulta.dataConsulta);
        const mesConsulta = dataConsulta.toLocaleString('default', { month: 'long' });
        const anoConsulta = dataConsulta.getFullYear();

        if (mesConsulta === mesAtual && anoConsulta === anoAtual) {
            const li = document.createElement('li');
            li.textContent = `${consulta.nomePaciente} - ${consulta.responsavel} - ${consulta.dataConsulta} ${consulta.horario}`;
            consultasMes.appendChild(li);
        }
    });
}

// Atualiza a lista de resultados do filtro
function atualizarResultadoFiltro() {
    const resultadoFiltro = document.getElementById('resultadoFiltro');
    resultadoFiltro.innerHTML = '';
    const especialidadeFiltro = document.getElementById('especialidadeFiltro').value;
    const dataFiltro = document.getElementById('dataFiltro').value;
    const horarioFiltro = document.getElementById('horarioFiltro').value;

    consultas.forEach(consulta => {
        if ((especialidadeFiltro === '' || consulta.especialidade.includes(especialidadeFiltro)) &&
            (dataFiltro === '' || consulta.dataConsulta === dataFiltro) &&
            (horarioFiltro === '' || consulta.horario === horarioFiltro)) {
            const li = document.createElement('li');
            li.textContent = `${consulta.nomePaciente} - ${consulta.responsavel} - ${consulta.dataConsulta} ${consulta.horario}`;
            resultadoFiltro.appendChild(li);
        }
    });
}

// Adiciona evento de filtro
document.getElementById('confirmarFiltro').addEventListener('click', atualizarResultadoFiltro);