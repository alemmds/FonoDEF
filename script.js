document.getElementById('consultaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const consulta = {
        nomePaciente: document.getElementById('nomePaciente').value,
        responsavel: document.getElementById('responsavel').value,
        idade: document.getElementById('idade').value,
        telefone: document.getElementById('telefone').value,
        especialidade: document.getElementById('especialidade').value,
        consultorio: document.getElementById('consultorio').value,
        dataConsulta: document.getElementById('dataConsulta').value,
        horarioConsulta: document.getElementById('horarioConsulta').value
    };

    salvarConsulta(consulta);
    exibirConsultasResumo();
});

function salvarConsulta(consulta) {
    let consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    consultas.push(consulta);
    localStorage.setItem('consultas', JSON.stringify(consultas));
    alert('Consulta salva com sucesso!');
}

function exibirConsultasResumo() {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    const resumoDiv = document.getElementById('consultasResumo');
    resumoDiv.innerHTML = '';

    consultas.forEach((consulta, index) => {
        resumoDiv.innerHTML += `
            <div class="consulta">
                <p><strong>${consulta.nomePaciente}</strong> - ${consulta.especialidade} em ${consulta.dataConsulta} às ${consulta.horarioConsulta}</p>
                <button onclick="editarConsulta(${index})">Editar</button>
                <button onclick="excluirConsulta(${index})">Excluir</button>
            </div>
        `;
    });
}

function editarConsulta(index) {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    const consulta = consultas[index];

    document.getElementById('nomePaciente').value = consulta.nomePaciente;
    document.getElementById('responsavel').value = consulta.responsavel;
    document.getElementById('idade').value = consulta.idade;
    document.getElementById('telefone').value = consulta.telefone;
    document.getElementById('especialidade').value = consulta.especialidade;
    document.getElementById('consultorio').value = consulta.consultorio;
    document.getElementById('dataConsulta').value = consulta.dataConsulta;
    document.getElementById('horarioConsulta').value = consulta.horarioConsulta;

    excluirConsulta(index);  // Remove para que a edição seja gravada como nova
}

function excluirConsulta(index) {
    let consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    consultas.splice(index, 1);
    localStorage.setItem('consultas', JSON.stringify(consultas));
    exibirConsultasResumo();
}