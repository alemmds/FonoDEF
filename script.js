let consultas = [];
const salvarConsultaBtn = document.getElementById('salvar-consulta');
const mesAno = document.getElementById('mes-ano');
const diasContainer = document.getElementById('dias-container');
const resultadoFiltro = document.getElementById('resultado-filtro');
const resultadoDiarias = document.getElementById('resultado-diarias');

salvarConsultaBtn.addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const idade = document.getElementById('idade').value;
    const especialidade = document.getElementById('especialidade').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    const novaConsulta = {
        nome,
        telefone,
        idade,
        especialidade,
        data,
        hora
    };

    consultas.push(novaConsulta);
    atualizarDias();
    atualizarConsultasDiarias();
    limparFormulario();
});

function atualizarDias() {
    const consultasPorMes = consultas.reduce((acc, consulta) => {
        const dia = new Date(consulta.data).getDate();
        if (!acc[dia]) acc[dia] = [];
        acc[dia].push(consulta);
        return acc;
    }, {});

    diasContainer.innerHTML = '';
    mesAno.textContent = `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`;

    for (const dia in consultasPorMes) {
        const button = document.createElement('button');
        button.textContent = dia;
        button.addEventListener('click', () => mostrarConsultasDoDia(consultasPorMes[dia]));
        diasContainer.appendChild(button);
    }
}

function mostrarConsultasDoDia(consultasDoDia) {
    resultadoDiarias.innerHTML = '';
    consultasDoDia.forEach(consulta => {
        const div = document.createElement('div');
        div.textContent = `Paciente: ${consulta.nome}, Consultório: ${consulta.telefone}, Idade: ${consulta.idade}, Especialidade: ${consulta.especialidade}, Data: ${consulta.data}, Hora: ${consulta.hora}`;
        resultadoDiarias.appendChild(div);
    });
}

function atualizarConsultasDiarias() {
    const hoje = new Date().toISOString().split('T')[0];
    const consultasDoDia = consultas.filter(consulta => consulta.data === hoje);
    resultadoDiarias.innerHTML = '';
    consultasDoDia.forEach(consulta => {
        const div = document.createElement('div');
        div.textContent = `Paciente: ${consulta.nome}, Consultório: ${consulta.telefone}, Idade: ${consulta.idade}, Especialidade: ${consulta.especialidade}, Data: ${consulta.data}, Hora: ${consulta.hora}`;
        resultadoDiarias.appendChild(div);
    });
}

function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('especialidade').value = '';
    document.getElementById('data').value = '';
    document.getElementById('hora').value = '';
}