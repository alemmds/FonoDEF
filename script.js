document.getElementById('consultaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nomePaciente = document.getElementById('nomePaciente').value;
    const responsavel = document.getElementById('responsavel').value;
    const idade = document.getElementById('idade').value;
    const telefone = document.getElementById('telefone').value;
    const especialidade = document.getElementById('especialidade').value;
    const consultorio = document.getElementById('consultorio').value;
    const dataConsulta = document.getElementById('dataConsulta').value;
    const horarioConsulta = document.getElementById('horarioConsulta').value;

    const consulta = {
        nomePaciente,
        responsavel,
        idade,
        telefone,
        especialidade,
        consultorio,
        dataConsulta,
        horarioConsulta
    };

    salvarConsulta(consulta);
    exibirConsultasDia();
});

function salvarConsulta(consulta) {
    let consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    consultas.push(consulta);
    localStorage.setItem('consultas', JSON.stringify(consultas));
}

function exibirConsultasDia() {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    const consultasDia = consultas.filter(consulta => consulta.dataConsulta === new Date().toISOString().split('T')[0]);
    
    const consultasDiaDiv = document.getElementById('consultasDia');
    consultasDiaDiv.innerHTML = consultasDia.length ? '<h2>Consultas de Hoje</h2>' : '';

    consultasDia.forEach(consulta => {
        consultasDiaDiv.innerHTML += `
            <p><strong>${consulta.nomePaciente}</strong> - ${consulta.especialidade} às ${consulta.horarioConsulta}</p>
        `;
    });
}

document.getElementById('btnHoje').addEventListener('click', exibirConsultasDia);
document.getElementById('btnConsultasMes').addEventListener('click', exibirConsultasMes);

function exibirConsultasMes() {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    const consultasMes = consultas.filter(consulta => new Date(consulta.dataConsulta).getMonth() === new Date().getMonth());
    
    const consultasMesDiv = document.getElementById('consultasMes');
    consultasMesDiv.innerHTML = consultasMes.length ? '<h2>Consultas do Mês</h2>' : '';

    consultasMes.forEach(consulta => {
        consultasMesDiv.innerHTML += `
            <p><strong>${consulta.nomePaciente}</strong> - ${consulta.especialidade} no dia ${consulta.dataConsulta}</p>
        `;
    });
}