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

    // Aqui você pode salvar os dados localmente ou em um banco de dados
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
    consultasDiaDiv.innerHTML = '';

    consultasDia.forEach(consulta => {
        consultasDiaDiv.innerHTML += `
            <p>${consulta.nomePaciente} - ${consulta.especialidade} às ${consulta.horarioConsulta}</p>
        `;
    });
}

document.getElementById('btnHoje').addEventListener('click', exibirConsultasDia);
document.getElementById('btnConsultasMes').addEventListener('click', exibirConsultasMes);

function exibirConsultasMes() {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    const consultasMes = consultas.filter(consulta => new Date(consulta.dataConsulta).getMonth() === new Date().getMonth());
    
    const consultasMesDiv = document.getElementById('consultasMes');
    consultasMesDiv.innerHTML = '';

    consultasMes.forEach(consulta => {
        consultasMesDiv.innerHTML += `
            <p>${consulta.nomePaciente} - ${consulta.especialidade} em ${consulta.dataConsulta}</p>
        `;
    });
}