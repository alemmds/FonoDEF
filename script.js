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
        id: Date.now(),
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
    const consultasPorMes = document.getElementById("consultasPorMes");
    consultasPorMes.innerHTML = '';

    let meses = {};
    consultas.forEach(consulta => {
        const mesAno = consulta.dataConsulta.substring(0, 7);
        if (!meses[mesAno]) meses[mesAno] = {};
        const dia = consulta.dataConsulta.substring(8, 10);
        if (!meses[mesAno][dia]) meses[mesAno][dia] = [];
        meses[mesAno][dia].push(consulta);
    });

    for (let [mesAno, diasDoMes] of Object.entries(meses)) {
        const mesDiv = document.createElement("div");
        mesDiv.innerHTML = `<h3>${mesAno}</h3>`;
        for (let [dia, consultasDoDia] of Object.entries(diasDoMes)) {
            const buttonDia = document.createElement("button");
            buttonDia.className = "button-dia";
            buttonDia.innerText = `Dia ${dia}`;
            buttonDia.onclick = () => exibirConsultasDoDia(consultasDoDia);
            mesDiv.appendChild(buttonDia);
        }
        consultasPorMes.appendChild(mesDiv);
    }
}

function exibirConsultasDoDia(consultasDoDia) {
    const resultadoConsulta = document.getElementById("resultadoConsulta");
    resultadoConsulta.innerHTML = '';

    consultasDoDia.forEach(consulta => {
        const consultaDiv = document.createElement("div");
        consultaDiv.className = "consulta";
        consultaDiv.innerHTML = `
            <strong>${consulta.nomePaciente}</strong><br>
            Responsável: ${consulta.responsavel}<br>
            Especialista: ${consulta.especialista}<br>
            Consultório: ${consulta.consultorio}<br>
            Data: ${consulta.dataConsulta}<br>
            Horário: ${consulta.horarioConsulta}<br>
            Recomendações: ${consulta.recomendacoes}<br>
            <button class="edit-btn" onclick="editarConsulta(${consulta.id})">Editar</button>
            <button class="delete-btn" onclick="excluirConsulta(${consulta.id})">Excluir</button>
        `;
        resultadoConsulta.appendChild(consultaDiv);
    });
}

function editarConsulta(id) {
    const consulta = consultas.find(c => c.id === id);
    if (consulta) {
        document.getElementById("nomePaciente").value = consulta.nomePaciente;
        document.getElementById("responsavel").value = consulta.responsavel;
        document.getElementById("idade").value = consulta.idade;
        document.getElementById("telefone").value = consulta.telefone;
        document.getElementById("especialista").value = consulta.especialista;
        document.getElementById("consultorio").value = consulta.consultorio;
        document.getElementById("dataConsulta").value = consulta.dataConsulta;
        document.getElementById("horarioConsulta").value = consulta.horarioConsulta;
        document.getElementById("recomendacoes").value = consulta.recomendacoes;

        excluirConsulta(id);
    }
}

function excluirConsulta(id) {
    consultas = consultas.filter(c => c.id !== id);
    localStorage.setItem('consultas', JSON.stringify(consultas));
    atualizarConsultas();
}

atualizarConsultas();