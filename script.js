let consultas = JSON.parse(localStorage.getItem('consultas')) || [];

function salvarConsulta() {
    const nomePaciente = document.getElementById("nomePaciente").value;
    const responsavel = document.getElementById("responsavel").value;
    const idade = document.getElementById("idade").value;
    const telefone = document.getElementById("telefone").value;
    const especialista = document.getElementById("especialista").value;
    const consultorio = document.getElementById("consultorio").value;
    const dataConsulta = document.getElementById("dataConsulta").value;
    const horarioConsulta = document.getElementById("horarioConsulta").value;
    const recomendacoes = document.getElementById("recomendacoes").value;

    const consulta = {
        nomePaciente,
        responsavel,
        idade,
        telefone,
        especialista,
        consultorio,
        dataConsulta,
        horarioConsulta,
        recomendacoes
    };

    consultas.push(consulta);
    localStorage.setItem('consultas', JSON.stringify(consultas));

    atualizarConsultas();
}

function atualizarConsultas() {
    const consultasHoje = document.getElementById("consultasHoje");
    const consultasPorMes = document.getElementById("consultasPorMes");

    consultasHoje.innerHTML = '';
    consultasPorMes.innerHTML = '';

    const hoje = new Date().toISOString().split('T')[0];
    let consultasHojeArray = consultas.filter(consulta => consulta.dataConsulta === hoje);

    consultasHojeArray.forEach(consulta => {
        const consultaDiv = document.createElement("div");
        consultaDiv.className = "consulta";
        consultaDiv.innerHTML = `
            <strong>${consulta.nomePaciente}</strong><br>
            Responsável: ${consulta.responsavel}<br>
            Especialista: ${consulta.especialista}<br>
            Horário: ${consulta.horarioConsulta}<br>
        `;
        consultasHoje.appendChild(consultaDiv);
    });

    let meses = {};
    consultas.forEach(consulta => {
        const mesAno = consulta.dataConsulta.substring(0, 7);
        if (!meses[mesAno]) meses[mesAno] = [];
        meses[mesAno].push(consulta);
    });

    for (let [mesAno, consultasDoMes] of Object.entries(meses)) {
        const mesDiv = document.createElement("div");
        mesDiv.innerHTML = `<h3>${mesAno}</h3>`;
        consultasDoMes.forEach(consulta => {
            const consultaDiv = document.createElement("div");
            consultaDiv.className = "consulta";
            consultaDiv.innerHTML = `
                <strong>${consulta.nomePaciente}</strong><br>
                Especialista: ${consulta.especialista}<br>
                Horário: ${consulta.horarioConsulta}<br>
            `;
            mesDiv.appendChild(consultaDiv);
        });
        consultasPorMes.appendChild(mesDiv);
    }
}

function filtrarConsultas() {
    const especialidade = document.getElementById("filtroEspecialidade").value.toLowerCase();
    const data = document.getElementById("filtroData").value;

    const consultasFiltradas = consultas.filter(consulta => {
        return (!especialidade || consulta.especialista.toLowerCase().includes(especialidade)) &&
               (!data || consulta.dataConsulta === data);
    });

    const filtroResultados = document.getElementById("filtroResultados");
    filtroResultados.innerHTML = '';

    consultasFiltradas.forEach(consulta => {
        const consultaDiv = document.createElement("div");
        consultaDiv.className = "consulta";
        consultaDiv.innerHTML = `
            <strong>${consulta.nomePaciente}</strong><br>
            Responsável: ${consulta.responsavel}<br>
            Especialista: ${consulta.especialista}<br>
            Data: ${consulta.dataConsulta}<br>
            Horário: ${consulta.horarioConsulta}<br>
        `;
        filtroResultados.appendChild(consultaDiv);
    });
}

atualizarConsultas();